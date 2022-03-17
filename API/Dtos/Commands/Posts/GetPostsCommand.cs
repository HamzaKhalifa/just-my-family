namespace API.Dtos.Commands.Posts
{
    public class GetPostsCommand
    {
        public int Page { get; set; }
        public int Amount { get; set; }
        public string UserId { get; set; }
    }
}