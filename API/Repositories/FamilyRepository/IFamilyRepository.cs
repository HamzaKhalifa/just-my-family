using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;

namespace API.Repositories.FamilyRepository
{
    public interface IFamilyRepository
    {
        Task<Family> GetUsersSharedSmallFamily(List<string> usersIds);
        Task<Family> CreateSmallFamily();
        Task<UserFamily> AddUserToSmallFamily(string userId, int familyId);
    }
}