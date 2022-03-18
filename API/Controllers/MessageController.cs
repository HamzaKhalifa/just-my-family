using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos.Commands.MessageCommands;
using API.Dtos.ReadDtos;
using API.HttpHelpers;
using API.Services.MessageService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessageController : ControllerBase
    {
        private readonly IMessageService _messageService;
        public MessageController(IMessageService messageService)
        {
            _messageService = messageService;
        }
        [Authorize]
        [HttpPost("send")]
        public async Task<ActionResult<HttpResponse<MessageReadDto>>> SendMessage(SendMessageCommand command) {
            HttpResponse<MessageReadDto> response = await _messageService.SendMessage(command);

            switch (response.ResponseType) {
                case ServiceResponse.Ok: return Ok(response);
                default: return NotFound(response);
            }
        }

        [Authorize]
        [HttpPost("addRoomMessagesSeenBy")]
        public async Task<ActionResult<HttpResponse<int>>> AddRoomMessagesSeenBy(AddRoomMessagesSeenCommand command) {
            HttpResponse<int> response = await _messageService.AddRoomMessagesSeenBy(command);
            
            switch (response.ResponseType) {
                case ServiceResponse.Ok: return Ok(response);
                default: return NotFound(response);
            }
        }
        [Authorize]
        [HttpPost("loadMoreMessages")]
        public async Task<ActionResult<HttpResponse<List<MessageReadDto>>>> LoadMoreMessages(LoadMoreMessagesCommand command) {
            HttpResponse<List<MessageReadDto>> response = await _messageService.LoadMoreMessages(command);
            
            switch (response.ResponseType) {
                case ServiceResponse.Ok: return Ok(response);
                default: return NotFound(response);
            }
        }
    }
}