using API.Dtos.ReadDtos;
using API.Models;
using AutoMapper;

namespace API.Profiles
{
    public class CommentProfile : Profile
    {
        public CommentProfile()
        {
            CreateMap<Comment, CommentReadDto>();
        }
    }
}