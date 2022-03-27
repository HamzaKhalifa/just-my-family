using System.Threading.Tasks;
using API.Dtos.Commands.AuthCommands;
using API.Dtos.ReadDtos;
using API.HttpHelpers;
using API.Models;

namespace API.Services.AuthService
{
    public interface IAuthService
    {
        string GenerateToken(User user);
        Task<HttpResponse<LoginReadDto>> Login(LoginCommand command);
        Task<HttpResponse<User>> Register(RegisterCommand command);
        Task<HttpResponse<bool>> SendResetPasswordEmail(string email);
        Task<HttpResponse<bool>> ResetPassword(ResetPasswordCommand command);
        Task<HttpResponse<bool>> ChangePassword(ChangePasswordCommand command);
    }
}