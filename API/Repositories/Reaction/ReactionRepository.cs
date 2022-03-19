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
        public async Task<Reaction> ReactToPost(int postId, string requesterId, ReactionEnum type) {
            Reaction reaction = await _dataContext.Reactions.FirstOrDefaultAsync(r => r.PostId == postId && r.UserId == requesterId);

            if (reaction != null) {
                reaction.Type = type;
                _dataContext.Reactions.Update(reaction);
            } else {
                reaction = new Reaction {
                    PostId = postId, 
                    UserId = requesterId,
                    Type = type
                };
                _dataContext.Reactions.Add(reaction);
            }

            await _dataContext.SaveChangesAsync();

            return reaction;
        }
        public async Task<int> DeleteReactionToPost(int postId, string requesterId) {
            Reaction reaction = await _dataContext.Reactions.FirstOrDefaultAsync(r => r.PostId == postId && r.UserId == requesterId);
            _dataContext.Remove(reaction);

            await _dataContext.SaveChangesAsync();

            return reaction.Id;
        }
    }
}