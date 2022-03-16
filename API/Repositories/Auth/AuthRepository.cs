using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Identity;

namespace API.Repositories.Auth
{
    public class AuthRepository : IAuthRepository
    {
        private readonly UserManager<User> _userManager;
        public AuthRepository(UserManager<User> userManager)
        {
            _userManager = userManager;
        }
        public async Task<bool> CheckPassword(User user, string password)
        {
            return await _userManager.CheckPasswordAsync(user, password);
        }
        public async Task<IdentityResult> CreateUser(User user, string password)
        {
            var result = await _userManager.CreateAsync(user, password);
            return result;
        }
        public async Task<User> FindUserByEmail(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }

        public async Task<User> FindUserById(string Id) {
            return await _userManager.FindByIdAsync(Id);
        }

        public async Task<string> GeneratePasswordResetToken(User user) {
            return await _userManager.GeneratePasswordResetTokenAsync(user);
        }

        public async Task<IdentityResult> ResetPassword(User user, string token, string newPassword) {
            return await _userManager.ResetPasswordAsync(user, token, newPassword);
        }
        
        public async Task<IdentityResult> ChangePassword(User user, string currentPassword, string newPassword) {
            return await _userManager.ChangePasswordAsync(user, currentPassword, newPassword);
        }
        public async Task<User> GetUserByEmail(string email) {
            return await _userManager.FindByEmailAsync(email);
        }
    }
}
