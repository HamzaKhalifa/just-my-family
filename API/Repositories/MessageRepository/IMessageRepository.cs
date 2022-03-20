using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;

namespace API.Repositories.MessageRepository
{
    public interface IMessageRepository
    {
        int GetChatRoomTotalUnseenMessages(int relationshipId, string requesterId);
        int GetChatRoomTotalMessages(int relationshipId);
        Task<Message> SendMessage(Message message); 
        Task<int> AddRoomMessagesSeenBy(int roomId, string userId);
        Task<List<Message>> LoadMoreMessages(int roomId, int amountAlreadyLoaded, int amountToLoad);
    }
}