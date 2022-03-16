using System.Collections.Generic;

namespace API.Dtos.Commands.UserCommands
{
    public class OpenDirectChatRoomCommand
    {
        public List<string> UsersIds { get; set; }
    }
}