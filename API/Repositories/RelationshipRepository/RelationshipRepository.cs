using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dtos.Commands.RelationshipCommands;
using API.Models;
using Microsoft.EntityFrameworkCore;
using Z.EntityFramework.Plus;

namespace API.Repositories.RelationshipRepository
{
    public class RelationshipRepository : IRelationshipRepository
    {
        DataContext _dataContext;
        public RelationshipRepository(DataContext dataContext) {
            _dataContext = dataContext;
        }
        public async Task<Relationship> GetRelationship(int id) {
            return await _dataContext.Relationships.FindAsync(id);
        }
        public async Task<Relationship> GetUsersRelationship(string user1Id, string user2Id) {
            var usersIds = new List<string> { user1Id, user2Id };
            Relationship existingRelationship = await _dataContext.Relationships.FirstOrDefaultAsync(r => usersIds.Contains(r.User1Id) && usersIds.Contains(r.User2Id));
            return existingRelationship;
        }
        public async Task<List<Relationship>> GetRelationships(string userId) {
            return await _dataContext.Relationships
                .Where(r => ((r.User1Id == userId || r.User2Id == userId)))
                .OrderBy(r => r.Approved)
                .Include(r => r.User1)
                .Include(r => r.User2)
                .ToListAsync();
        }
        public async Task<List<Relationship>> GetApprovedRelationships(string userId) {
            List<Relationship> relationships = await _dataContext.Relationships.Where(r => ((r.User1Id == userId || r.User2Id == userId) && r.Approved))
                .Include(r => r.User1).Include(r => r.User2)
                .Include(r => r.Messages.OrderByDescending(m => m.Id).Take(10))
                .ToListAsync();
            relationships.ForEach(r => {
                r.Messages = r.Messages.OrderBy(m => m.Id).ToList();
            });

            return relationships;
        }
        public async Task<int> GetUnseenInvitationsCount(string userId) {
            return await _dataContext.Relationships
                .Where(r => (
                    (r.User1Id == userId || r.User2Id == userId) && 
                    (r.SenderUserId != userId)) && 
                    !r.Seen
                ).CountAsync();
        }
        public async Task<Relationship> CreateRelationship(CreateRelationshipCommand relationshipCommand)
        {
            Relationship relationship = new Relationship { 
                User1Id = relationshipCommand.User1Id, 
                User2Id = relationshipCommand.User2Id, 
                Type = relationshipCommand.RelationshipType,
                SenderUserId = relationshipCommand.RelationshipInvitationSentByUserId,
                Approved = false,
                Messages = new List<Message>()
            };

            await _dataContext.Relationships.AddAsync(relationship);
            await _dataContext.SaveChangesAsync();

            return relationship;
        }
        public async Task<Relationship> UpdateRelationship(Relationship relationship) {
            _dataContext.Relationships.Update(relationship);

            await _dataContext.SaveChangesAsync();

            return relationship;
        }
        public async Task<int> DeleteRelationship(int id) {
            try {
                _dataContext.Relationships.Where(r => r.Id == id).Delete();

                var response = await _dataContext.SaveChangesAsync();
                
                return response;
            } catch(Exception e) { 
                Console.WriteLine(e);
                throw;
            }
        }
        public async Task<int> SetRelationshipInvitationSeen(List<int> relationshipsIds, string userId) {
            relationshipsIds.ForEach(async relationshipId => {
                List<Relationship> relationships = await _dataContext.Relationships.Where(r => r.Id == relationshipId).ToListAsync();
                relationships.ForEach(relationship => {
                    if (!relationship.Seen)
                        relationship.Seen = true;
                });
            });

            return await _dataContext.SaveChangesAsync();
        }
    }
}