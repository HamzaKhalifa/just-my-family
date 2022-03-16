using API.Dtos.Commands.RelationshipCommands;
using API.Dtos.ReadDtos;
using API.Models;
using AutoMapper;

namespace API.Profiles
{
    public class RelationshipProfile : Profile
    {
        public RelationshipProfile()
        {
            CreateMap<Relationship, CreateRelationshipCommand>();
            CreateMap<Relationship, RelationshipReadDto>();
        }
    }
}