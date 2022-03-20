using System.Collections.Generic;
using System.Threading.Tasks;
using API.Enumerations;
using API.Models;

namespace API.Repositories.Post
{
    public interface IReactionRepository
    {
        Task<Reaction> ReactToPost(int postId, string requesterId, ReactionEnum type, string SubmittedAt);
        Task<int> DeleteReactionToPost(int postId, string requesterId);
        Task<int> GetTotalUnseenReactions(string userId);
        Task<List<Reaction>> GetPostsReactions(string userId, int amountAlreadyLoaded, int amount);
        Task<int> SetReactionsToSeen(List<int> reactionsIds);
    }
}