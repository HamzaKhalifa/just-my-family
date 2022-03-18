using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos.Commands.PostCommands;
using API.Dtos.ReadDtos;
using API.HttpHelpers;
using API.Models;
using API.Repositories.Post;
using API.Services.UserService;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Services.PostService
{
    public class PostService : IPostService
    {
        private readonly IPostRepository _postRepository;
        private readonly ICommentRepository _commentRepository;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        public PostService(IPostRepository postRepository, ICommentRepository commentRepository, IUserService userService, IMapper mapper)
        {
            _postRepository = postRepository;
            _commentRepository = commentRepository;
            _mapper = mapper;
            _userService = userService;
        }
        public async Task<HttpResponse<List<PostReadDto>>> GetFeedPosts(int page, int amount)
        {
            string requesterId = _userService.GetRequester();
            try {
                List<Post> posts = await _postRepository.GetFeedPosts(requesterId, page, amount);

                var postsReadDto = posts.Select(post => {
                    PostReadDto postReadDto = _mapper.Map<PostReadDto>(post);
                    postReadDto.NumberOfComments = _commentRepository.GetPostTotalComments(post.Id);

                    return postReadDto;
                }).ToList();
                
                return new HttpResponse<List<PostReadDto>> {
                    Data = postsReadDto,
                    Success = true,
                    ResponseType = ServiceResponse.Ok,
                    Messages = new string[] { "Posts" }
                };
            } catch(Exception e) {
                return new HttpResponse<List<PostReadDto>> {
                    Data = null,
                    Success = true,
                    ResponseType = ServiceResponse.NotFound,
                    Messages = new string[] { e.Message }
                };
            }
        }
        public async Task<HttpResponse<List<PostReadDto>>> GetUserPosts(GetPostsCommand command)
        {
            // TODO: Limit the posts to what the requester can see.
            string requesterId = _userService.GetRequester();
            try {
                List<Post> posts = await _postRepository.GetUserPosts(command);
                
                return new HttpResponse<List<PostReadDto>> {
                    Data = posts.Select(post => _mapper.Map<PostReadDto>(post)).ToList(),
                    Success = true,
                    ResponseType = ServiceResponse.Ok,
                    Messages = new string[] { "Posts" }
                };
            } catch(Exception e) {
                return new HttpResponse<List<PostReadDto>> {
                    Data = null,
                    Success = true,
                    ResponseType = ServiceResponse.NotFound,
                    Messages = new string[] { e.Message }
                };
            }
        }
        public async Task<HttpResponse<PostReadDto>> CreatePost(CreatePostCommand command)
        {
            string requesterId = _userService.GetRequester();
            try {
                Post post = new Post {
                    Content = command.Content,
                    SubmittedAt = command.SubmittedAt,
                    UserId = requesterId
                };

                await _postRepository.CreatePost(post, command.Pictures);
                
                return new HttpResponse<PostReadDto> {
                    Data = _mapper.Map<PostReadDto>(post),
                    Success = true,
                    ResponseType = ServiceResponse.Created,
                    Messages = new string[] { "Post created" }
                };
            } catch(Exception e) {
                return new HttpResponse<PostReadDto> {
                    Data = null,
                    Success = true,
                    ResponseType = ServiceResponse.Conflict,
                    Messages = new string[] { e.Message }
                };
            }
        } 
    }
}