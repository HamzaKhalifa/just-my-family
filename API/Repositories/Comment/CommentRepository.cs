using System;
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
        private readonly DataContext _dataContext;
        private readonly IPictureRepository _pictureRepository;
        public CommentRepository(DataContext context, IPictureRepository pictureRepository)
        {
            _dataContext = context;
            _pictureRepository = pictureRepository;
        }
        public async Task<List<API.Models.Comment>> GetPostComments(int postId, string requesterId, int page, int amount) {
            return await _dataContext.Comments.Where(comment => comment.PostId == postId).Skip((page - 1) * amount).Take(amount).ToListAsync();
        }
        public async Task<Comment> CreateComment(Comment comment)
        {
            _dataContext.Comments.Add(comment);
            await _dataContext.SaveChangesAsync();
            return _dataContext.Comments.Include(comment => comment.User).FirstOrDefault(c => c.Id == comment.Id);
        }
        public int GetPostTotalComments(int postId) {
            return _dataContext.Comments.Where(c => c.PostId == postId).Count();
        }
        public async Task<List<Comment>> LoadMoreComments(int postId, int amountAlreadyLoaded, int amountToLoad) {
            int totalComments = GetPostTotalComments(postId);

            amountToLoad = Math.Min(amountToLoad, totalComments - amountAlreadyLoaded);
            return await _dataContext.Comments.Where(c => c.PostId == postId)
                .OrderBy(c => c.Id).Skip(amountAlreadyLoaded)
                .Include(c => c.User)
                .Take(amountToLoad).ToListAsync();
        }
    }
}