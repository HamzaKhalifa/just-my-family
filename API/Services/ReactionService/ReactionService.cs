using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos.Commands.ReactionCommands;
using API.Dtos.ReadDtos;
using API.HttpHelpers;
using API.Hubs;
using API.Models;
using API.Repositories.Post;
using API.Repositories.RelationshipRepository;
using API.Services.PostService;
using API.Services.RelationshipService;
using API.Services.UserService;
using AutoMapper;
using Microsoft.AspNetCore.SignalR;

namespace API.Services.ReactionService
{
    public class ReactionService : IReactionService
    {
        private readonly IReactionRepository _reactionRepository;
        private readonly IRelationshipService _relationshipService;
        private readonly IPostService _postService;
        private readonly IPostRepository _postRepository;
        private readonly IRelationshipRepository _relationshipRepository;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly IHubContext<APIHub> _hubContext; 
        public ReactionService(IReactionRepository reactionRepository, 
            IRelationshipService relationshipService, 
            IPostService postService,
            IUserService userService,
            IMapper mapper, 
            IHubContext<APIHub> hub,
            IPostRepository postRepository,
            IRelationshipRepository relationshipRepository
        ){
            _reactionRepository = reactionRepository;
            _postService = postService;
            _userService = userService;
            _mapper = mapper;
            _hubContext = hub;
            _relationshipService = relationshipService;
            _postRepository = postRepository;
            _relationshipRepository = relationshipRepository;
        }
        public async Task<HttpResponse<ReactionReadDto>> ReactToPost(ReactCommand command)
        {
            Reaction reaction = await _reactionRepository.ReactToPost(command.PostId, command.UserId, command.Type, command.SubmittedAt);
            ReactionReadDto reactionReadDto = _mapper.Map<ReactionReadDto>(reaction);

            // Sending a react notification to everyone who can see the post (except the current user)
            string posterId = await _postRepository.GetPostPosterId(command.PostId);
            // Only send the notification if the user is reacting to a different post from his own
            if (posterId != _userService.GetRequester()) {
                List<string> connectionIds = await _postService.GetConnectionIdsOfUsersThatCanSeeThePost(command.PostId);
                await _hubContext.Clients.Clients(connectionIds).SendAsync("ReceiveReactionToPostInFeed", new { PosterId = posterId, PostId = command.PostId, Reaction = reactionReadDto });
            }
            return new HttpResponse<ReactionReadDto> {
                Data = reactionReadDto,
                Success = true,
                Messages = new string[] { "Reacted to post " + command.PostId },
                ResponseType = ServiceResponse.Created
            };
        }
        public async Task<HttpResponse<int>> DeleteReactionToPost(ReactCommand command)
        {
            int reactionId = await _reactionRepository.DeleteReactionToPost(command.PostId, command.UserId);

            // Sending a react delete notification to everyone who can see the post: 
            List<string> connectionIds = await _postService.GetConnectionIdsOfUsersThatCanSeeThePost(command.PostId);
            await _hubContext.Clients.Clients(connectionIds).SendAsync("ReceiveDeleteReactionToPostInFeed", new { PostId = command.PostId, reactionId = reactionId });

            return new HttpResponse<int> {
                Data = reactionId,
                Success = true,
                Messages = new string[] { "Reaction deleted" },
                ResponseType = ServiceResponse.Created
            };
        }
        public async Task<HttpResponse<int>> GetTotalUnseenReactions()
        {
            string userId = _userService.GetRequester();
            int total = await _reactionRepository.GetTotalUnseenReactions(userId);

            return new HttpResponse<int> {
                Data = total,
                Success = true,
                Messages = new string[] { "Reaction deleted" },
                ResponseType = ServiceResponse.Created
            };
        }
        public async Task<HttpResponse<List<ReactionReadDto>>> GetPostsReactions(int amountAlreadyLoaded, int amount)
        {
            string userId = _userService.GetRequester();
            List<Reaction> reactions = await _reactionRepository.GetPostsReactions(userId, amountAlreadyLoaded, amount);

            return new HttpResponse<List<ReactionReadDto>> {
                Data = reactions.Select(r => _mapper.Map<ReactionReadDto>(r)).ToList(),
                Success = true,
                Messages = new string[] { "Unseed reactions" },
                ResponseType = ServiceResponse.Created
            };
        }
        public async Task<HttpResponse<int>> SetReactionsToSeen(List<int> reactionsIds) {
            try {
                int result = await _reactionRepository.SetReactionsToSeen(reactionsIds);
                int totalUnseenReactions = await _reactionRepository.GetTotalUnseenReactions(_userService.GetRequester());
                return new HttpResponse<int> {
                    Data = totalUnseenReactions,
                    Success = true,
                    Messages = new String[] { "Reactions set to seen" },
                    ResponseType = ServiceResponse.Ok
                };
            } catch (Exception e) {
                Console.WriteLine(e.ToString());
                throw;
            }
        }
    }
}