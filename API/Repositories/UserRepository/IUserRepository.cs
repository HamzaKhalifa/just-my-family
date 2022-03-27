using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;

namespace API.Repositories.UserRepository
{
    public interface IUserRepository
    {
        Task<User> GetUser(string id);
        Task<List<User>> SearchUsers(string searchText, string requesterId);
        Task<User> UpdateUser(User user);
    }
}