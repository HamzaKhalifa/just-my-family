using API.Dtos.ReadDtos;
using API.Models;
using AutoMapper;

namespace API.Profiles
{
    public class MessageProfile : Profile
    {
        public MessageProfile() {
            CreateMap<Message, MessageReadDto>();
        }
    }
}