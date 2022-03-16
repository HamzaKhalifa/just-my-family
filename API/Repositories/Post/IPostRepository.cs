using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;

namespace API.Repositories.Post
{
    public interface IPostRepository
    {
        Task<API.Models.Post> CreatePost(API.Models.Post post, List<string> pictures);
    }
}