using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos.Commands.UserCommands;
using API.Dtos.ReadDtos;
using API.HttpHelpers;
using API.Models;

namespace API.Services.UserService
{
    public interface IUserService
    {
        string GetRequester();
        Task<HttpResponse<List<Dtos.ReadDtos.UserReadDto>>> SearchUsers(string searchText);
        Task<HttpResponse<Dtos.ReadDtos.UserReadDto>> ChangeProfilePicture(ChangeProfilePictureCommand command);
        Task<HttpResponse<string>> GetUserProfilePicture(string userId);
    }
}