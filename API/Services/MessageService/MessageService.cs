using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos.Commands.MessageCommands;
using API.Dtos.ReadDtos;
using API.HttpHelpers;
using API.Hubs;
using API.Models;
using API.Repositories.MessageRepository;
using API.Services.UserService;
using AutoMapper;
using Microsoft.AspNetCore.SignalR;

namespace API.Services.MessageService
{
    public class MessageService : IMessageService
    {
        private readonly IMessageRepository _messageRepository;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly IHubContext<APIHub> _hubContext; 
        public MessageService(IMessageRepository messageRepository, IUserService userService, IMapper mapper, IHubContext<APIHub> hubContext)
        {
            _messageRepository = messageRepository;
            _userService = userService;
            _mapper = mapper;
            _hubContext = hubContext;
        }
        public async Task<int> GetChatRoomNumberOfUnseenMessages(int roomId) {
            string requesterId = _userService.GetRequester();
            return await _messageRepository.GetChatRoomNumberOfUnseenMessages(roomId, requesterId);
        }
        public async Task<int> GetChatRoomTotalMessages(int roomId) {
            string requesterId = _userService.GetRequester();
            return await _messageRepository.GetChatRoomTotalMessages(roomId);
        }
        public async Task<HttpResponse<MessageReadDto>> SendMessage(SendMessageCommand sendMessageCommand)
        {
            Message message = new Message();
            message.Text = sendMessageCommand.Text;
            message.SenderId = _userService.GetRequester();
            message.RoomId = sendMessageCommand.RoomId;
            message.SentAt = sendMessageCommand.SentAt;

            await _messageRepository.SendMessage(message);

            // Notify other users
            List<string> usersConnectionIds = APIHub.GetConnectionIdsFromUserIds(sendMessageCommand.usersIds);
            await _hubContext.Clients.Clients(usersConnectionIds)
                .SendAsync("ReceiveChatMessage", _mapper.Map<MessageReadDto>(message));

            return new HttpResponse<MessageReadDto> {
                Data = _mapper.Map<Message, MessageReadDto>(message),
                Success = true,
                Messages = new string[] { "Messages sent" },
                ResponseType = ServiceResponse.Ok,
            };
        }
        public async Task<HttpResponse<int>> AddRoomMessagesSeenBy(AddRoomMessagesSeenCommand command) {
            string userId = _userService.GetRequester();
            int success = await _messageRepository.AddRoomMessagesSeenBy(command.RoomId, userId);

            return new HttpResponse<int> {
                Data = success,
                Success = true,
                Messages = new string[] { "Messages now seen by user " + userId },
                ResponseType = ServiceResponse.Ok
            };
        }
        public async Task<HttpResponse<List<MessageReadDto>>> LoadMoreMessages(LoadMoreMessagesCommand command) {
            string userId = _userService.GetRequester();
            List<Message> messages = await _messageRepository.LoadMoreMessages(command.RoomId, command.AmountAlreadyLoaded, command.AmountToLoad);

            return new HttpResponse<List<MessageReadDto>> {
                Data = messages.Select(m => _mapper.Map<MessageReadDto>(m)).ToList(),
                Success = true,
                Messages = new string[] { "More messages are loaded" },
                ResponseType = ServiceResponse.Ok
            };
        }
    }
}