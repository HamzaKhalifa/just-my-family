using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos.Commands.RelationshipCommands;
using API.Models;

namespace API.Repositories.RelationshipRepository
{
    public interface IRelationshipRepository
    {
        Task<Relationship> GetRelationship(int id);
        Task<Relationship> GetUsersRelationship(string user1Id, string user2Id);
        Task<List<Relationship>> GetRelationships(string userId);
        Task<List<Relationship>> GetApprovedRelationships(string userId);
        Task<int> GetUnseenInvitationsCount(string userId);
        Task<Relationship> CreateRelationship(CreateRelationshipCommand relationshipCommand);
        Task<Relationship> UpdateRelationship(Relationship relationship);
        Task<int> DeleteRelationship(int id);
        Task<int> SetRelationshipInvitationSeen(List<int> relationshipsIds, string userId);
    }
}