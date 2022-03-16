using API.Enumerations;

namespace API.Dtos.Commands.RelationshipCommands
{
    public class CreateRelationshipCommand
    {
        public RelationshipTypeEnum RelationshipType { get; set; }
        public string User1Id { get; set; }
        public string User2Id { get; set; }
        public int? FamilyId { get; set; }
        public string RelationshipInvitationSentByUserId { get; set; }
    }
}