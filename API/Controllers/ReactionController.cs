using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos.Commands.ReactionCommands;
using API.Dtos.ReadDtos;
using API.HttpHelpers;
using API.Services.ReactionService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ReactionController : ControllerBase
    {
        private readonly IReactionService _reactionService;
        public ReactionController(IReactionService reactionService)
        {
            _reactionService = reactionService;
        }
        [HttpPost("reactToPost")]
        public async Task<ActionResult<HttpResponse<ReactionReadDto>>> ReactToPost(ReactCommand command) {
            HttpResponse<ReactionReadDto> response = await _reactionService.ReactToPost(command);

            switch(response.ResponseType) {
                case ServiceResponse.Created: return StatusCode(201, response);
                default: return NotFound(response);
            }
        }
        [HttpDelete("deleteReactionToPost")]
        public async Task<ActionResult<HttpResponse<int>>> DeleteReactionToPost(ReactCommand command) {
            
            HttpResponse<int> response = await _reactionService.DeleteReactionToPost(command);

            switch(response.ResponseType) {
                case ServiceResponse.Created: return StatusCode(201, response);
                default: return NotFound(response);
            }
        }
        [HttpGet("getTotalUnseenReactions")]
        public async Task<ActionResult<HttpResponse<int>>> GetTotalUnseenReactions() {
            HttpResponse<int> response = await _reactionService.GetTotalUnseenReactions();

            switch(response.ResponseType) {
                case ServiceResponse.Created: return StatusCode(201, response);
                default: return NotFound(response);
            }
        }
        [HttpGet("getPostsReactions/{amountAlreadyLoaded}/{amount}")]
        public async Task<ActionResult<HttpResponse<List<ReactionReadDto>>>> GetPostReactions(int amountAlreadyLoaded, int amount) {
            HttpResponse<List<ReactionReadDto>> response = await _reactionService.GetPostsReactions(amountAlreadyLoaded, amount);

            switch(response.ResponseType) {
                case ServiceResponse.Created: return StatusCode(201, response);
                default: return NotFound(response);
            }
        }
        [HttpPost("setReactionsToSeen")]
        public async Task<ActionResult<HttpResponse<int>>> SetReactionsToSeen(SetReactionsToSeenCommand command) {
            HttpResponse<int> response = await _reactionService.SetReactionsToSeen(command.ReactionsIds);

            switch(response.ResponseType) {
                case ServiceResponse.Ok: return Ok(response);
                default: return Conflict(response);
            }
        }
    }
}