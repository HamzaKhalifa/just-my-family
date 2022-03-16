using System;
using System.Threading.Tasks;
using API.Dtos.Commands.Posts;
using API.HttpHelpers;
using API.Models;
using API.Repositories.Post;
using AutoMapper;

namespace API.Services.PostService
{
    public class PostService : IPostService
    {
        private readonly IPostRepository _postRepository;
        private readonly IMapper _mapper;
        public PostService(IPostRepository postRepository, IMapper mapper)
        {
            _postRepository = postRepository;
            _mapper = mapper;
        }
        public async Task<HttpResponse<Post>> CreatePost(CreatePostCommand command)
        {
            try {
                Post post = new Post {
                    Content = command.Content,
                    SubmittedAt = command.SubmittedAt,
                };

                await _postRepository.CreatePost(post, command.Pictures);
                
                return new HttpResponse<Post> {
                    Data = post,
                    Success = true,
                    ResponseType = ServiceResponse.Created,
                    Messages = new string[] { "Post created" }
                };
            } catch(Exception e) {
                return new HttpResponse<Post> {
                    Data = null,
                    Success = true,
                    ResponseType = ServiceResponse.Conflict,
                    Messages = new string[] { e.Message }
                };
            }
        }
    }
}