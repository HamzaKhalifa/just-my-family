using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.MessageRepository
{
    public class MessageRepository : IMessageRepository
    {
        private readonly DataContext _dataContext;
        public MessageRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<int> GetChatRoomNumberOfUnseenMessages(int roomId, string requesterId) {
            return await _dataContext.Messages.Include(m => m.SeenByUsersMessages)
                .CountAsync(m => m.RoomId == roomId && !m.SeenByUsersMessages.Any(seenByUserMessage => seenByUserMessage.UserId == requesterId) && m.SenderId != requesterId);
        }
        
        public async Task<int> GetChatRoomTotalMessages(int roomId) {
            return await _dataContext.Messages.CountAsync(m => m.RoomId == roomId);
        }
        public async Task<Message> SendMessage(Message message)
        {
            _dataContext.Messages.Add(message);
            await _dataContext.SaveChangesAsync();
            return message;
        }
        public async Task<int> AddRoomMessagesSeenBy(int roomId, string userId) {
            List<Message> messages = await _dataContext.Messages.Where(m => m.RoomId == roomId).Include(m => m.SeenByUsersMessages).ToListAsync();
            messages.ForEach(message => {
                if (!message.SeenByUsersMessages.Any(seenByUserMessage => seenByUserMessage.UserId == userId)) {
                    SeenByUserMessage seenByUserMessage = new SeenByUserMessage {
                        UserId = userId, 
                        MessageId = message.Id
                    };
                    _dataContext.SeenByUsersMessages.Add(seenByUserMessage);
                }
            });

            return await _dataContext.SaveChangesAsync();
        }
        
        public async Task<List<Message>> LoadMoreMessages(int roomId, int amountAlreadyLoaded, int amountToLoad) {
            int totalMessages = await GetChatRoomTotalMessages(roomId);

            amountToLoad = Math.Min(amountToLoad, totalMessages - amountAlreadyLoaded);
            return await _dataContext.Messages.Where(m => m.RoomId == roomId)
                .OrderByDescending(m => m.Id)
                .Take(amountAlreadyLoaded + amountToLoad).OrderBy(m => m.Id).Take(amountToLoad).ToListAsync();
        }
    }
}