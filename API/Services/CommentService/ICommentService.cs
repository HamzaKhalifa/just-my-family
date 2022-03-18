using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos.Commands.CommentCommands;
using API.Dtos.ReadDtos;
using API.HttpHelpers;

namespace API.Services.CommentService
{
    public interface ICommentService
    {
        Task<HttpResponse<List<CommentReadDto>>> GetPostComments(int postId, int page, int amount);
        Task<HttpResponse<CommentReadDto>> CreateComment(CreateCommentCommand command);
        Task<HttpResponse<List<CommentReadDto>>> LoadMoreComments(LoadMoreCommentsCommand command);
    }
}