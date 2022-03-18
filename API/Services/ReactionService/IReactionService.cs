using System.Threading.Tasks;
using API.Dtos.Commands.ReactionCommands;
using API.Dtos.ReadDtos;
using API.HttpHelpers;

namespace API.Services.ReactionService
{
    public interface IReactionService
    {
        Task<HttpResponse<ReactionReadDto>> ReactToPost(ReactCommand command);
    }
}