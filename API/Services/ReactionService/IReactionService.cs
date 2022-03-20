using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos.Commands.ReactionCommands;
using API.Dtos.ReadDtos;
using API.HttpHelpers;

namespace API.Services.ReactionService
{
    public interface IReactionService
    {
        Task<HttpResponse<ReactionReadDto>> ReactToPost(ReactCommand command);
        Task<HttpResponse<int>> DeleteReactionToPost(ReactCommand command);
        Task<HttpResponse<int>> GetTotalUnseenReactions();
        Task<HttpResponse<List<ReactionReadDto>>> GetPostsReactions(int amountAlreadyLoaded, int amount);
        Task<HttpResponse<int>> SetReactionsToSeen(List<int> reactionsIds);
    }
}