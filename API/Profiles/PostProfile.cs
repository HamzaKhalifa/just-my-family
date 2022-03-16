using API.Dtos.Commands.Posts;
using API.Dtos.ReadDtos;
using API.Models;
using AutoMapper;

namespace API.Profiles
{
    public class PostProfile : Profile
    {
        public PostProfile()
        {
            CreateMap<Post, PostReadDto>();
            CreateMap<CreatePostCommand, Post>();
        }
    }
}