using System.Collections.Generic;

namespace API.Dtos.Commands.RelationshipCommands
{
    public class SetRelationshipInvitationSeenCommand
    {
        public List<int> RelationshipsIds { get; set; }
    }
}