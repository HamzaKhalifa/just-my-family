using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos.Commands.MessageCommands;
using API.Dtos.ReadDtos;
using API.HttpHelpers;

namespace API.Services.MessageService
{
    public interface IMessageService
    {
        Task<int> GetChatRoomNumberOfUnseenMessages(int roomId);
        Task<int> GetChatRoomTotalMessages(int roomId);
        Task<HttpResponse<MessageReadDto>> SendMessage(SendMessageCommand messageCommand);
        Task<HttpResponse<int>> AddRoomMessagesSeenBy(AddRoomMessagesSeenCommand command);
        Task<HttpResponse<List<MessageReadDto>>> LoadMoreMessages(LoadMoreMessagesCommand command);
    }
}