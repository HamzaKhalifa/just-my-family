using System.Threading.Tasks;
using API.Dtos.Commands.UserCommands;
using API.Dtos.ReadDtos;
using API.HttpHelpers;
using API.Services.RoomService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomController : ControllerBase
    {
        private readonly IRoomService _roomService;
        public RoomController(IRoomService roomService)
        {
            _roomService = roomService;
        }
    }
}