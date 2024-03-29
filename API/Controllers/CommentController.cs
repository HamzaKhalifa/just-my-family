using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos.Commands.CommentCommands;
using API.Dtos.ReadDtos;
using API.HttpHelpers;
using API.Services.CommentService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;
        public CommentController(ICommentService postService)
        {
            _commentService = postService;
        }
        
        [HttpGet("getPostComments/{page}/{amount}")]
        public async Task<ActionResult<HttpResponse<List<CommentReadDto>>>> GetPostComments(int postId, int page, int amount) {
            HttpResponse<List<CommentReadDto>> response = await _commentService.GetPostComments(postId, page, amount);
            switch(response.ResponseType) {
                case ServiceResponse.Created: return StatusCode(201, response);
                default: return Conflict(response);
            }
        }
        [HttpPost("")]
        public async Task<ActionResult<HttpResponse<CommentReadDto>>> CreateComment(CreateCommentCommand comment) {
            HttpResponse<CommentReadDto> response = await _commentService.CreateComment(comment);
            switch(response.ResponseType) {
                case ServiceResponse.Created: return StatusCode(201, response);
                case ServiceResponse.Conflict: return Conflict(response);
                default: return NotFound(response);
            }
        }
        [Authorize]
        [HttpPost("loadMoreComments")]
        public async Task<ActionResult<HttpResponse<List<CommentReadDto>>>> LoadMoreComments(LoadMoreCommentsCommand command) {
            HttpResponse<List<CommentReadDto>> response = await _commentService.LoadMoreComments(command);
            
            switch (response.ResponseType) {
                case ServiceResponse.Ok: return Ok(response);
                default: return NotFound(response);
            }
        }
    }
}