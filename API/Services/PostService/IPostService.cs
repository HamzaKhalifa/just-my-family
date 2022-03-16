using System.Threading.Tasks;
using API.Dtos.Commands.Posts;
using API.HttpHelpers;
using API.Models;

namespace API.Services.PostService
{
    public interface IPostService
    {
        Task<HttpResponse<Post>> CreatePost(CreatePostCommand command);
    }
}