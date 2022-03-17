namespace API.Dtos.Commands.Posts
{
    public class CreateCommentCommand
    {
        public string Content { get; set; }
        public int PostId { get; set; }
        public string SubmittedAt { get; set; }
    }
}