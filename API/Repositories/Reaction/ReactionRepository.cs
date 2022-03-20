using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Enumerations;
using API.Models;
using API.Repositories.Pictures;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.Post
{
    public class ReactionRepository : IReactionRepository
    {
        private readonly DataContext _dataContext;
        public ReactionRepository(DataContext context, IPictureRepository pictureRepository)
        {
            _dataContext = context;
        }
        public async Task<Reaction> ReactToPost(int postId, string requesterId, ReactionEnum type, string submittedAt) {
            Reaction reaction = await _dataContext.Reactions.FirstOrDefaultAsync(r => r.PostId == postId && r.UserId == requesterId);
            
            if (reaction != null) {
                reaction.Type = type;
                reaction.SubmittedAt = submittedAt;
                reaction.Seen = false;
                _dataContext.Reactions.Update(reaction);
            } else {
                reaction = new Reaction {
                    PostId = postId,
                    UserId = requesterId,
                    Type = type,
                    SubmittedAt = submittedAt,
                    Seen = false
                };
                _dataContext.Reactions.Add(reaction);
            }

            await _dataContext.SaveChangesAsync();

            return _dataContext.Reactions.Include(r => r.User).FirstOrDefault(r => r.Id == reaction.Id);
        }
        public async Task<int> DeleteReactionToPost(int postId, string requesterId) {
            Reaction reaction = await _dataContext.Reactions.FirstOrDefaultAsync(r => r.PostId == postId && r.UserId == requesterId);
            _dataContext.Remove(reaction);

            await _dataContext.SaveChangesAsync();

            return reaction.Id;
        }
        public async Task<int> GetTotalUnseenReactions(string userId) {
            int total = await (from reaction in _dataContext.Reactions 
                join post in _dataContext.Posts on reaction.PostId equals post.Id
                where post.UserId == userId && !reaction.Seen && reaction.UserId != userId
            select reaction).CountAsync();

            return total;
        }
        public async Task<List<Reaction>> GetPostsReactions(string userId, int amountAlreadyLoaded, int amount) {
            List<Reaction> reactions = await (from reaction in _dataContext.Reactions 
                join post in _dataContext.Posts on reaction.PostId equals post.Id
                where post.UserId == userId && reaction.UserId != userId
            select reaction).Include(r => r.User).OrderByDescending(r => r.Id).Skip(amountAlreadyLoaded).Take(amount).ToListAsync();

            return reactions;
        }
        public async Task<int> SetReactionsToSeen(List<int> reactionsIds) {
            List<Reaction> reactions = await _dataContext.Reactions.Where(r => reactionsIds.Contains(r.Id)).ToListAsync();
            reactions = reactions.Select(r => {
                r.Seen = true;
                return r;
            }).ToList();

            return await _dataContext.SaveChangesAsync();
        }
    }
}