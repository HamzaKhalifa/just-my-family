using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using Enumerations;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.FamilyRepository
{
    public class FamilyRepository : IFamilyRepository
    {
        DataContext _dataContext;
        public FamilyRepository(DataContext dataContext) {
            _dataContext = dataContext;
        }

        public async Task<Family> GetUsersSharedSmallFamily(List<string> usersIds)
        {
            UserFamily usersFamily = await _dataContext.UsersFamilies
                .Include(userFamily => userFamily.Family)
                .FirstOrDefaultAsync(userFamily => 
                    usersIds.Contains(userFamily.UserId) && 
                    userFamily.Family.FamilyType == FamilyTypeEnum.Small
                );

            if (usersFamily != null) return usersFamily.Family;

            return null;
        }

        public async Task<Family> CreateSmallFamily()
        {
            Family family = new Family();
            await _dataContext.Families.AddAsync(family);

            return family;
        }

        public async Task<UserFamily> AddUserToSmallFamily(string userId, int familyId)
        {
            UserFamily existingUserSmallFamily = await _dataContext.UsersFamilies
                .Include(userFamily => userFamily.Family)
                .FirstOrDefaultAsync(userFamily => userFamily.UserId == userId && userFamily.FamilyId == familyId && userFamily.Family.FamilyType == FamilyTypeEnum.Small);
                
            if (existingUserSmallFamily != null) return existingUserSmallFamily;

            UserFamily userFamily = new UserFamily { UserId = userId, FamilyId = familyId };
            await _dataContext.UsersFamilies.AddAsync(userFamily);

            return userFamily;
        }
    }
}