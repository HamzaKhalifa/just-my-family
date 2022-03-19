using System.Collections.Generic;
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
        private readonly IMapper _mapper;
        private readonly IHubContext<APIHub> _hubContext; 
        public ReactionService(IReactionRepository reactionRepository, 
            IRelationshipService relationshipService, 
            IPostService postService,
            IMapper mapper, 
            IHubContext<APIHub> hub,
            IPostRepository postRepository,
            IRelationshipRepository relationshipRepository
        ){
            _reactionRepository = reactionRepository;
            _postService = postService;
            _mapper = mapper;
            _hubContext = hub;
            _relationshipService = relationshipService;
            _postRepository = postRepository;
            _relationshipRepository = relationshipRepository;
        }
        public async Task<HttpResponse<ReactionReadDto>> ReactToPost(ReactCommand command)
        {
            Reaction reaction = await _reactionRepository.ReactToPost(command.PostId, command.UserId, command.Type);
            ReactionReadDto reactionReadDto = _mapper.Map<ReactionReadDto>(reaction);

            // Sending a react notification to everyone who can see the post: 
            List<string> connectionIds = await _postService.GetConnectionIdsOfUsersThatCanSeeThePost(command.PostId);
            await _hubContext.Clients.Clients(connectionIds).SendAsync("ReceiveReactionToPostInFeed", new { PostId = command.PostId, Reaction = reactionReadDto });

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
    }
}