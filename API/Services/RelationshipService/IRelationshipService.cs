using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos.Commands.RelationshipCommands;
using API.Dtos.ReadDtos;
using API.HttpHelpers;
using API.Models;

namespace API.Services.RelationshipService
{
    public interface IRelationshipService
    {
        Task<HttpResponse<RelationshipReadDto>> GetRelationship(int id);
        Task<HttpResponse<List<RelationshipReadDto>>> GetRelationships();
        Task<HttpResponse<List<RelationshipReadDto>>> GetApprovedRelationships();
        Task<HttpResponse<int>> GetUnseenInvitationsCount();
        Task<HttpResponse<RelationshipReadDto>> CreateRelationship(CreateRelationshipCommand relationshipCommand);
        Task<HttpResponse<RelationshipReadDto>> ApproveRelationship(int id);
        Task<HttpResponse<RelationshipReadDto>> DeleteRelationship(int id);
        Task<int> GetRelationshipNumberOfUnseenMessages(Relationship relationship);
        Task<int> GetRelationshipTotalMessages(Relationship relationship);
        Task<HttpResponse<int>> SetRelationshipInvitationSeen(SetRelationshipInvitationSeenCommand command);
    }
}