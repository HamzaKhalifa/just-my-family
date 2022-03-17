using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dtos.Commands.Posts;
using API.Models;
using API.Repositories.Pictures;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.Post
{
    public class PostRepository : IPostRepository
    {
        private readonly DataContext _context;
        private readonly IPictureRepository _pictureRepository;
        private readonly IMapper _mapper;
        public PostRepository(DataContext context, IPictureRepository pictureRepository, IMapper mapper)
        {
            _context = context;
            _pictureRepository = pictureRepository;
            _mapper = mapper;
        }
        public async Task<List<API.Models.Post>> GetFeedPosts(string requesterId, int page, int amount) {
            List<API.Models.Post> posts = await (from post in _context.Posts 
                where 
                    post.UserId == requesterId 
                    || 
                    (from relationship in _context.Relationships
                    where relationship.User1Id == requesterId  
                    select relationship.User2Id).Concat(from relationship in _context.Relationships
                    where relationship.User2Id == requesterId
                    select relationship.User1Id).Contains(post.UserId)
                select post
            )
                .Include(p => p.Comments.OrderBy(c => c.Id).Take(10))
                .Include("Comments.User")
                .Include(p => p.User)
                .OrderByDescending(p => p.Id).Skip((page - 1) * amount).Take(amount)
                .ToListAsync();
            
            return posts;
        }
        public async Task<List<API.Models.Post>> GetUserPosts(GetPostsCommand command) {
           return await _context.Posts.OrderByDescending(p => p.Id)
            .Skip((command.Page - 1) * command.Amount)
            .Where(p => p.UserId == command.UserId)
            .Include(p => p.User)
            .Take(command.Amount).ToListAsync();
        }
        public async Task<Models.Post> CreatePost(Models.Post post, List<string> pictures)
        {
            _context.Posts.Add(post);
            pictures.ForEach(async picture => {
                await _pictureRepository.CreatePicture(new Picture { Path = picture, PostId = post.Id });
            });
            await _context.SaveChangesAsync();
            return _context.Posts.Include(post => post.User).FirstOrDefault(p => p.Id == post.Id);
        }
    }
}