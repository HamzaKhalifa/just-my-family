using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using API.Repositories.Pictures;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.Post
{
    public class CommentRepository : ICommentRepository
    {
        private readonly DataContext _context;
        private readonly IPictureRepository _pictureRepository;
        public CommentRepository(DataContext context, IPictureRepository pictureRepository)
        {
            _context = context;
            _pictureRepository = pictureRepository;
        }
        public async Task<List<API.Models.Comment>> GetPostComments(int postId, string requesterId, int page, int amount) {
            return await _context.Comments.Where(comment => comment.PostId == postId).Skip((page - 1) * amount).Take(amount).ToListAsync();
        }
        public async Task<Comment> CreateComment(Comment comment)
        {
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();
            return _context.Comments.Include(comment => comment.User).FirstOrDefault(c => c.Id == comment.Id);
        }
        public int GetPostNumberOfComments(int postId) {
            return _context.Comments.Where(c => c.PostId == postId).Count();
        }
    }
}