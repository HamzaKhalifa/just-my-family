using System.Threading.Tasks;
using API.Dtos.Commands.ReactionCommands;
using API.Dtos.ReadDtos;
using API.HttpHelpers;
using API.Models;
using API.Repositories.Post;
using AutoMapper;

namespace API.Services.ReactionService
{
    public class ReactionService : IReactionService
    {
        private readonly IReactionRepository _reactionRepository;
        private readonly IMapper _mapper;
        public ReactionService(IReactionRepository reactionRepository, IMapper mapper)
        {
            _reactionRepository = reactionRepository;
            _mapper = mapper;
        }
        public async Task<HttpResponse<ReactionReadDto>> ReactToPost(ReactCommand command)
        {
            Reaction reaction = await _reactionRepository.ReactToPost(command.PostId, command.UserId, command.Type);

            return new HttpResponse<ReactionReadDto> {
                Data = _mapper.Map<ReactionReadDto>(reaction),
                Success = true,
                Messages = new string[] { "Reacted to post " + command.PostId },
                ResponseType = ServiceResponse.Created
            };
        }
    }
}