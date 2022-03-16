using API.Dtos.ReadDtos;
using API.Models;
using AutoMapper;

namespace API.Profiles
{
    public class MultiParticipantsRoomProfile : Profile
    {
        public MultiParticipantsRoomProfile()
        {
            CreateMap<MultiParticipantsRoom, MultiParticipantsRoomReadDto>();
        }
    }
}