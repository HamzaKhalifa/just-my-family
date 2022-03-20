using API.Enumerations;

namespace API.Dtos.Commands.ReactionCommands
{
    public class ReactCommand
    {
        public int PostId { get; set; }
        public int CommentId { get; set; }
        public ReactionEnum Type { get; set; }
        public string UserId { get; set; }
        public string SubmittedAt { get; set; }
    }
}