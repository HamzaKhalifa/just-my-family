using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Identity;

namespace API.Repositories.Auth
{
    public interface IAuthRepository
    {
        Task<User> FindUserByEmail(string email);
        Task<User> FindUserById(string Id);
        Task<bool> CheckPassword(User user, string password);
        Task<IdentityResult> CreateUser(User user, string password);
        Task<string> GeneratePasswordResetToken(User user);
        Task<IdentityResult> ResetPassword(User user, string token, string newPassword);
        Task<IdentityResult> ChangePassword(User user, string currentPassword, string newPassword);
        Task<User> GetUserByEmail(string email);
    }
}