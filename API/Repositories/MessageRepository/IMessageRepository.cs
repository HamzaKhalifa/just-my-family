using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;

namespace API.Repositories.MessageRepository
{
    public interface IMessageRepository
    {
        Task<int> GetChatRoomNumberOfUnseenMessages(int relationshipId, string requesterId);
        Task<int> GetChatRoomTotalMessages(int relationshipId);
        Task<Message> SendMessage(Message message); 
        Task<int> AddRoomMessagesSeenBy(int roomId, string userId);
        Task<List<Message>> LoadMoreMessages(int roomId, int amountAlreadyLoaded, int amountToLoad);
    }
}