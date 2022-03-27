using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos.Commands.UserCommands;
using API.Dtos.ReadDtos;
using API.HttpHelpers;
using API.Services.UserService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        
        [Authorize]
        [HttpGet("search/{searchText}")]
        public async Task<ActionResult<HttpResponse<List<Dtos.ReadDtos.UserReadDto>>>> SearchUsers(string searchText) {
            HttpResponse<List<Dtos.ReadDtos.UserReadDto>> response = await _userService.SearchUsers(searchText);

            switch(response.ResponseType) {
                case ServiceResponse.NotFound: return NotFound(response);
                case ServiceResponse.Ok: return Ok(response);
                default: return NotFound(response);
            }
        }

        [Authorize]
        [HttpPost("changeProfilePicture")]
        public async Task<ActionResult<HttpResponse<Dtos.ReadDtos.UserReadDto>>> ChangeProfilePicture(ChangeProfilePictureCommand changeProfilePictureCommand) {
            HttpResponse<Dtos.ReadDtos.UserReadDto> response = await _userService.ChangeProfilePicture(changeProfilePictureCommand);

            switch(response.ResponseType) {
                case ServiceResponse.NotFound: return NotFound(response);
                case ServiceResponse.Ok: return Ok(response);
                default: return NotFound(response);
            }
        }

        [HttpGet("getUserProfilePicture/{userId}")]
        public async Task<ActionResult<HttpResponse<string>>> GetUserProfilePicture(string userId) {
            HttpResponse<string> response = await _userService.GetUserProfilePicture(userId);

            switch(response.ResponseType) {
                case ServiceResponse.NotFound: return NotFound(response);
                case ServiceResponse.Ok: return Ok(response);
                default: return NotFound(response);
            }
        }
        [HttpPut("update")]
        public async Task<ActionResult<HttpResponse<UserReadDto>>> UpdateUserProfile(UpdateUserProfileCommand command) {
            HttpResponse<UserReadDto> result = await _userService.UpdateUser(command);

            switch(result.ResponseType) {
                case ServiceResponse.Ok: return Ok(result);
                default: return NotFound(result);
            }
        }
    }
}