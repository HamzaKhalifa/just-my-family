namespace API.Dtos.Commands.MessageCommands
{
    public class LoadMoreMessagesCommand
    {
        public int RoomId { get; set; }
        public int AmountAlreadyLoaded { get; set; }
        public int AmountToLoad { get; set; }
    }
}