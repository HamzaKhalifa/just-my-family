using System.Collections.Generic;

namespace API.Dtos.Commands.MessageCommands
{
    public class SendMessageCommand
    {
        public string Text { get; set; }
        public int RoomId { get; set; }
        public string SentAt { get; set; }
        public List<string> usersIds { get; set; }
    }
}