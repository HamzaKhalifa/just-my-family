using System.Collections.Generic;

namespace API.Dtos.Commands.ReactionCommands
{
    public class SetReactionsToSeenCommand
    {
        public List<int> ReactionsIds { get; set; }
    }
}