using API.Dtos.ReadDtos;
using API.Models;
using AutoMapper;

namespace API.Profiles
{
    public class ReactionProfile : Profile
    {
        public ReactionProfile()
        {
            CreateMap<Reaction, ReactionReadDto>();
        }
    }
}