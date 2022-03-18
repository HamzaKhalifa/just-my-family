using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos.Commands.PostCommands;
using API.Dtos.ReadDtos;
using API.HttpHelpers;
using API.Models;
using API.Services.PostService;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;
        public PostController(IPostService postService)
        {
            _postService = postService;
        }
        
        [HttpGet("getFeedPosts/{page}/{amount}")]
        public async Task<ActionResult<HttpResponse<List<PostReadDto>>>> GetFeedPosts(int page, int amount) {
            HttpResponse<List<PostReadDto>> response = await _postService.GetFeedPosts(page, amount);
            switch(response.ResponseType) {
                case ServiceResponse.Ok: return StatusCode(201, response);
                default: return Conflict(response);
            }
        }
        
        [HttpGet("getUserPosts/{page}/{amount}/{userId}")]
        public async Task<ActionResult<HttpResponse<List<PostReadDto>>>> GetUserPosts(int page, int amount, string userId) {
            GetPostsCommand command = new GetPostsCommand {
                Page = page, Amount = amount, UserId = userId
            };
            HttpResponse<List<PostReadDto>> response = await _postService.GetUserPosts(command);
            switch(response.ResponseType) {
                case ServiceResponse.Ok: return StatusCode(201, response);
                default: return Conflict(response);
            }
        }
        [HttpPost("")]
        public async Task<ActionResult<HttpResponse<PostReadDto>>> CreatePost(CreatePostCommand post) {
            HttpResponse<PostReadDto> response = await _postService.CreatePost(post);
            switch(response.ResponseType) {
                case ServiceResponse.Created: return StatusCode(201, response);
                default: return NotFound(response);
            }
        }
    }
}