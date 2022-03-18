using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;

namespace API.Repositories.Post
{
    public interface ICommentRepository
    {
        Task<List<API.Models.Comment>> GetPostComments(int postId, string requesterId, int page, int amount);
        Task<API.Models.Comment> CreateComment(API.Models.Comment comment);
        int GetPostTotalComments(int postId);
        Task<List<Comment>> LoadMoreComments(int postId, int amountAlreadyLoaded, int amountToLoad);
    }
}