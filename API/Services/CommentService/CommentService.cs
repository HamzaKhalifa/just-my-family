using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos.Commands.CommentCommands;
using API.Dtos.ReadDtos;
using API.HttpHelpers;
using API.Models;
using API.Repositories.Post;
using API.Services.UserService;
using AutoMapper;

namespace API.Services.CommentService
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        public CommentService(ICommentRepository commentRepository, IUserService userService, IMapper mapper)
        {
            _commentRepository = commentRepository;
            _mapper = mapper;
            _userService = userService;
        }
        public async Task<HttpResponse<List<CommentReadDto>>> GetPostComments(int postId, int page, int amount)
        {
            string requesterId = _userService.GetRequester();
            try {
                List<Comment> comments = await _commentRepository.GetPostComments(postId, requesterId, page, amount);
                
                return new HttpResponse<List<CommentReadDto>> {
                    Data = comments.Select(comment => _mapper.Map<CommentReadDto>(comment)).ToList(),
                    Success = true,
                    ResponseType = ServiceResponse.Ok,
                    Messages = new string[] { "Comments" }
                };
            } catch(Exception e) {
                return new HttpResponse<List<CommentReadDto>> {
                    Data = null,
                    Success = true,
                    ResponseType = ServiceResponse.NotFound,
                    Messages = new string[] { e.Message }
                };
            }
        }
        public async Task<HttpResponse<CommentReadDto>> CreateComment(CreateCommentCommand command)
        {
            string requesterId = _userService.GetRequester();
            try {
                Comment comment = new Comment {
                    Content = command.Content,
                    SubmittedAt = command.SubmittedAt,
                    PostId = command.PostId,
                    UserId = requesterId
                };

                await _commentRepository.CreateComment(comment);
                
                return new HttpResponse<CommentReadDto> {
                    Data = _mapper.Map<CommentReadDto>(comment),
                    Success = true,
                    ResponseType = ServiceResponse.Created,
                    Messages = new string[] { "Comment created" }
                };
            } catch(Exception e) {
                return new HttpResponse<CommentReadDto> {
                    Data = null,
                    Success = true,
                    ResponseType = ServiceResponse.Conflict,
                    Messages = new string[] { e.Message }
                };
            }
        } 
        public async Task<HttpResponse<List<CommentReadDto>>> LoadMoreComments(LoadMoreCommentsCommand command) {
            string userId = _userService.GetRequester();
            List<Comment> comments = await _commentRepository.LoadMoreComments(command.PostId, command.AmountAlreadyLoaded, command.AmountToLoad);

            return new HttpResponse<List<CommentReadDto>> {
                Data = comments.Select(m => _mapper.Map<CommentReadDto>(m)).ToList(),
                Success = true,
                Messages = new string[] { "More comments loaded" },
                ResponseType = ServiceResponse.Ok
            };
        }
    }
}