using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos.Commands.PostCommands;
using API.Dtos.ReadDtos;
using API.HttpHelpers;
using API.Models;

namespace API.Services.PostService
{
    public interface IPostService
    {
        Task<HttpResponse<List<PostReadDto>>> GetFeedPosts(int page, int amount);
        Task<HttpResponse<List<PostReadDto>>> GetUserPosts(GetPostsCommand command);
        Task<HttpResponse<PostReadDto>> CreatePost(CreatePostCommand command);
        Task<List<string>> GetConnectionIdsOfUsersThatCanSeeThePost(int postId);
    }
}