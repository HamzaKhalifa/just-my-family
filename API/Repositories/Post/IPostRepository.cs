using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos.Commands.PostCommands;
using API.Models;

namespace API.Repositories.Post
{
    public interface IPostRepository
    {
        Task<List<API.Models.Post>> GetFeedPosts(string requesterId, int page, int amount);
        Task<List<API.Models.Post>> GetUserPosts(GetPostsCommand command);
        Task<API.Models.Post> CreatePost(API.Models.Post post, List<string> pictures);
        Task<string> GetPostPosterId(int postId);
    }
}