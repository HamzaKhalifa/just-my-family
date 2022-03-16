using System.Threading.Tasks;
using API.Dtos.Commands.Posts;
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
        [HttpPost("")]
        public async Task<ActionResult<HttpResponse<Post>>> CreatePost(CreatePostCommand post) {
            HttpResponse<Post> response = await _postService.CreatePost(post);
            switch(response.ResponseType) {
                case ServiceResponse.Created: return StatusCode(201, response);
                default: return Conflict(response);
            }
        }
    }
}