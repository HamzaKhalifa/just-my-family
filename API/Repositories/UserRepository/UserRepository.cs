using API.Models;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace API.Repositories.UserRepository
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<User> _userManager;
        public UserRepository(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<User> GetUser(string id)
        {
            return await _userManager.FindByIdAsync(id);
        }

        public async Task<List<User>> SearchUsers(string searchText, string requesterId) {
            string[] searchedWords = searchText.Split(" ");

            List<User> users = await _userManager.Users
                .Where(user => (user.FirstName + " " + user.LastName).ToLower().Contains(searchText.ToLower()) && user.Id != requesterId)
                .ToListAsync();
            
            return users;
        }

        public async Task<User> UpdateUser(User user)
        {
            await _userManager.UpdateAsync(user);

            return user;
        }
  }
}