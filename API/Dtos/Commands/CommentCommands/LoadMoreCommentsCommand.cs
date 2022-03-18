namespace API.Dtos.Commands.CommentCommands
{
    public class LoadMoreCommentsCommand
    {
        public int PostId { get; set; }
        public int AmountAlreadyLoaded { get; set; }
        public int AmountToLoad { get; set; }
    }
}