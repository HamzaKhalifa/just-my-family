using System.Threading.Tasks;
using API.Dtos.Commands.AuthCommands;
using API.Dtos.ReadDtos;
using API.HttpHelpers;
using API.Models;
using API.Services.AuthService;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }
        
        [HttpPost("login")]
        public async Task<ActionResult<HttpResponse<LoginReadDto>>> Login(LoginCommand command) {
            HttpResponse<LoginReadDto> response = await _authService.Login(command);

            switch(response.ResponseType) {
                case ServiceResponse.Unauthorized: return Unauthorized(response);
                case ServiceResponse.WrongPasword: return Unauthorized(response);
                case ServiceResponse.Success: return Ok(response);
                default: return NotFound(response);
            }
        }

        [HttpPost("register")]
        public async Task<ActionResult<HttpResponse<User>>> Register(RegisterCommand command) {
            HttpResponse<User> response = await _authService.Register(command);

            switch(response.ResponseType) {
                case ServiceResponse.ValidationProblem: return BadRequest(response);
                case ServiceResponse.Success: return Ok(response);
                default: return NotFound(response);
            }
        }

        [HttpGet("sendResetPasswordEmail/{email}")]
        public async Task<ActionResult<HttpResponse<bool>>> SendResetPasswordEmail(string email) {
            HttpResponse<bool> response = await _authService.SendResetPasswordEmail(email);

            switch (response.ResponseType) {
                case ServiceResponse.NotFound: return NotFound(response);
                case ServiceResponse.Ok: return Ok(response);
                default: return NotFound(response);
            }
        }

        [HttpPost("resetPassword")]
        public async Task<ActionResult<HttpResponse<bool>>> ResetPassword(ResetPasswordCommand command) {
            command.Token = command.Token.Replace(" ", "+");
            
            HttpResponse<bool> response = await _authService.ResetPassword(command);

            switch (response.ResponseType) {
                case ServiceResponse.NotFound: return NotFound(response);
                case ServiceResponse.Ok: return Ok(response);
                case ServiceResponse.Conflict: return Conflict(response);
                default: return NotFound(response);
            }
        }
        
        [HttpPost("changePassword")]
        public async Task<ActionResult<HttpResponse<bool>>> ChangePassword(ChangePasswordCommand changePasswordCommand) {
            HttpResponse<bool> response = await _authService.ChangePassword(changePasswordCommand);

            switch (response.ResponseType) {
                case ServiceResponse.NotFound: return NotFound(response);
                case ServiceResponse.Conflict: return Conflict(response);
                case ServiceResponse.Ok: return Ok(response);
                default: return NotFound(response);
            }
        }
    }
}