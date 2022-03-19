using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos.Commands.RelationshipCommands;
using API.HttpHelpers;
using API.Models;
using API.Repositories.FamilyRepository;
using API.Repositories.RelationshipRepository;
using API.Services.UserService;
using AutoMapper;
using System.Linq;
using API.Dtos.ReadDtos;
using System;
using Microsoft.AspNetCore.SignalR;
using API.Hubs;
using API.Repositories.RoomRepository;
using API.Services.MessageService;

namespace API.Services.RelationshipService
{
    public class RelationshipService : IRelationshipService
    {
        private readonly IRelationshipRepository _relationshipRepository;
        private readonly IFamilyRepository _familyRepository;
        private readonly IRoomRepository _roomRepository;
        private readonly IUserService _userService;
        private readonly IMessageService _messageService;
        private readonly IMapper _mapper;
        private readonly IHubContext<APIHub> _hubContext;
        public RelationshipService (IRelationshipRepository relationshipRepository, 
            IFamilyRepository familyRepository, 
            IRoomRepository roomRepository,
            IUserService userService, IMessageService messageService, IMapper mapper, IHubContext<APIHub> hubContext)
        {
            _relationshipRepository = relationshipRepository;
            _familyRepository = familyRepository;
            _roomRepository = roomRepository;
            _userService = userService;
            _messageService = messageService;
            _mapper = mapper;
            _hubContext = hubContext;
        }
        public async Task<HttpResponse<RelationshipReadDto>> GetRelationship(int id) {
            Relationship relationship = await _relationshipRepository.GetRelationship(id);
            
            return new HttpResponse<RelationshipReadDto> {
                Data = _mapper.Map<RelationshipReadDto>(relationship),
                Messages = new string[] {},
                ResponseType = relationship == null ? ServiceResponse.NotFound : ServiceResponse.Ok,
                Success = relationship != null
            };
        }
        public async Task<HttpResponse<List<RelationshipReadDto>>> GetRelationships() {
            try {
                string requesterId = _userService.GetRequester();
                List<Relationship> relationships = await _relationshipRepository.GetRelationships(requesterId);

                return new HttpResponse<List<RelationshipReadDto>> {
                    Data = relationships.Select(r => _mapper.Map<RelationshipReadDto>(r)).ToList(),
                    Messages = new string[] {},
                    ResponseType = ServiceResponse.Ok,
                    Success = true
                };
            } catch (Exception e) {
                Console.WriteLine(e);
                throw; 
            }
        }
        public async Task<HttpResponse<List<RelationshipReadDto>>> GetApprovedRelationships() {
            string requesterId = _userService.GetRequester();
            return await GetUserApprovedRelationships(requesterId);
        }
        public async Task<HttpResponse<List<RelationshipReadDto>>> GetUserApprovedRelationships(string userId) {
            try {
                List<Relationship> relationships = await _relationshipRepository.GetApprovedRelationships(userId);
                List<RelationshipReadDto> approvedRelationshipsReadDto = new List<RelationshipReadDto>();
                
                relationships.ForEach(async r => {
                    RelationshipReadDto newRelationshipReadDto = _mapper.Map<RelationshipReadDto>(r);
                    newRelationshipReadDto.NumberOfUnseenMessages = await GetRelationshipNumberOfUnseenMessages(r);
                    newRelationshipReadDto.TotalMessages = await GetRelationshipTotalMessages(r);

                    approvedRelationshipsReadDto.Add(newRelationshipReadDto);
                });

                return new HttpResponse<List<RelationshipReadDto>> {
                    Data = approvedRelationshipsReadDto,
                    Messages = new string[] {},
                    ResponseType = ServiceResponse.Ok,
                    Success = true
                };
            } catch (Exception e) {
                Console.WriteLine(e);
                throw; 
            }
        }
        public async Task<HttpResponse<int>> GetUnseenInvitationsCount() {
            try {
                string requesterId = _userService.GetRequester();
                int count = await _relationshipRepository.GetUnseenInvitationsCount(requesterId);

                return new HttpResponse<int> {
                    Data = count,
                    Messages = new string[] {},
                    ResponseType = ServiceResponse.Ok,
                    Success = true
                };
            } catch (Exception e) {
                Console.WriteLine(e);
                throw; 
            }
        }
        public async Task<HttpResponse<RelationshipReadDto>> CreateRelationship(CreateRelationshipCommand createRelationshipCommand)
        {
            // Check if the relationship already exists
            Relationship relationship = await _relationshipRepository.GetUsersRelationship(createRelationshipCommand.User1Id, createRelationshipCommand.User2Id);

            if (relationship != null) {
                return new HttpResponse<RelationshipReadDto> {
                    Data = _mapper.Map<RelationshipReadDto>(relationship),
                    Success = false,
                    ResponseType = ServiceResponse.Conflict,
                    Messages = relationship.Approved ? new string[] { "A Relationship already exists" } : new string[] { "Invitation already sent" },
                };
            }
            
            relationship = await _relationshipRepository.CreateRelationship(createRelationshipCommand);

            // We send a notification to the receiving user 
            await _hubContext.Clients.Clients(APIHub.GetConnectionIdsFromUserIds(new List<string> { createRelationshipCommand.User2Id, createRelationshipCommand.User1Id }))
                .SendAsync("ReceiveRelationshipNotification", _mapper.Map<RelationshipReadDto>(relationship));

            // Get the two users' small family. If the family doesn't exist, then we create one.
            Family family = await _familyRepository.GetUsersSharedSmallFamily(new List<string> { createRelationshipCommand.User1Id, createRelationshipCommand.User2Id });

            if (family == null) {
                family = await _familyRepository.CreateSmallFamily();
                
                await _familyRepository.AddUserToSmallFamily(createRelationshipCommand.User1Id, family.Id);
                await _familyRepository.AddUserToSmallFamily(createRelationshipCommand.User2Id, family.Id);
            }

            return new HttpResponse<RelationshipReadDto> {
                Data = _mapper.Map<RelationshipReadDto>(relationship),
                Success = relationship != null,
                ResponseType = relationship != null ? ServiceResponse.Created : ServiceResponse.Conflict,
                Messages = relationship == null ? new string[] {} : new string[] { "Relationship has been created" },
            };
        }

        public async Task<HttpResponse<RelationshipReadDto>> ApproveRelationship(int id) {
            Relationship r = await _relationshipRepository.GetRelationship(id);

            if (r == null) return new HttpResponse<RelationshipReadDto> {
                Data = null,
                Messages = new string[] { "Relationship not found" },
                ResponseType = ServiceResponse.NotFound,
                Success = false
            };

            r.Approved = true;
            r.Seen = true;

            await _relationshipRepository.UpdateRelationship(r);

            return new HttpResponse<RelationshipReadDto> {
                Data = _mapper.Map<RelationshipReadDto>(r),
                Messages = new string[] { "Relationships has been updated" },
                ResponseType = ServiceResponse.Ok,
                Success = true
            };
        }

        public async Task<HttpResponse<RelationshipReadDto>> DeleteRelationship(int id) {
            string requester = _userService.GetRequester();

            try {
                Relationship r = await _relationshipRepository.GetRelationship(id);
                if (r.User1Id != requester && r.User2Id != requester) {
                    return new HttpResponse<RelationshipReadDto> {
                        Data = null,
                        Messages = new string[] { "Unauthorized" },
                        ResponseType = ServiceResponse.Unauthorized,
                        Success = false
                    };
                }

                await _relationshipRepository.DeleteRelationship(id);

                return new HttpResponse<RelationshipReadDto> {
                    Data = _mapper.Map<RelationshipReadDto>(r),
                    Messages = new string[] { "Relationship delete" },
                    ResponseType = ServiceResponse.Ok,
                    Success = true
                };
            } catch(Exception e) {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<int> GetRelationshipNumberOfUnseenMessages(Relationship relationship)
        {
            if (relationship == null) return 0;

            string requester = _userService.GetRequester();
            
            return await _messageService.GetChatRoomNumberOfUnseenMessages(relationship.Id);
        }
        public async Task<int> GetRelationshipTotalMessages(Relationship relationship)
        {
            if (relationship == null) return 0;

            string requester = _userService.GetRequester();
            
            return await _messageService.GetChatRoomTotalMessages(relationship.Id);
        }
        
        public async Task<HttpResponse<int>> SetRelationshipInvitationSeen(SetRelationshipInvitationSeenCommand command) {
            string userId = _userService.GetRequester();
            int success = await _relationshipRepository.SetRelationshipInvitationSeen(command.RelationshipsIds, userId);

            return new HttpResponse<int> {
                Data = success,
                Success = true,
                Messages = new string[] { "Messages now seen by user " + userId },
                ResponseType = ServiceResponse.Ok
            };
        }
  }
}