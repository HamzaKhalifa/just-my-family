using System.Collections.Generic;
using System.Threading.Tasks;
using API.Enumerations;
using API.Models;

namespace API.Repositories.Post
{
    public interface IReactionRepository
    {
        Task<Reaction> ReactToPost(int postId, string requesterId, ReactionEnum type);
        Task<int> DeleteReactionToPost(int postId, string requesterId);
    }
}