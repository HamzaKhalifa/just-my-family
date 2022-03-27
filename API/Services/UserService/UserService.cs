using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Dtos.Commands.UserCommands;
using API.Dtos.ReadDtos;
using API.HttpHelpers;
using API.Models;
using API.Repositories.UserRepository;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace API.Services.UserService
{
    public class UserService : IUserService {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        [Obsolete]
         private readonly IHostingEnvironment _hostingEnvironment;

        [Obsolete]
        public UserService(IMapper mapper, IUserRepository userRepository, IHttpContextAccessor httpContextAccessor, IHostingEnvironment hostingEnvironment)
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
        }

        public string GetRequester() => _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier).Value;
        public async Task<HttpResponse<List<Dtos.ReadDtos.UserReadDto>>> SearchUsers(string searchText)
        {
            string requesterId = GetRequester();
            try {
        List<Models.User> users = await _userRepository.SearchUsers(searchText, requesterId);
                List<Dtos.ReadDtos.UserReadDto> usersReadDto = users.Select(user => _mapper.Map<Dtos.ReadDtos.UserReadDto>(user)).ToList();
                
                return new HttpResponse<List<Dtos.ReadDtos.UserReadDto>>
                {
                    Data = usersReadDto,
                    Messages = new string[] {},
                    ResponseType = ServiceResponse.Ok,
                    Success = true
                };
            } catch(Exception e) {
                return new HttpResponse<List<Dtos.ReadDtos.UserReadDto>>
                {
                    Data = null,
                    Messages = new string[] { e.Message },
                    ResponseType = ServiceResponse.NotFound,
                    Success = false
                };
            }
        }

        [Obsolete]
        public async Task<HttpResponse<Dtos.ReadDtos.UserReadDto>> ChangeProfilePicture(ChangeProfilePictureCommand command)
        {
            string requesterId = GetRequester();

            int index = command.Base64.IndexOf("base64,") + 7;
            int length = command.Base64.Length - (command.Base64.IndexOf("base64,") + 7);
            try {
                string myBase64 = command.Base64.Substring(index, length);
                
                var fileString = Convert.FromBase64String(myBase64);

                string profilePictureName = Utils.RandomString(10) + ".png";
                                                                
                var filePath = _hostingEnvironment.ContentRootPath + "/wwwroot/Uploads/ProfilePictures/" + profilePictureName;
                
                System.IO.File.WriteAllBytes(filePath, fileString);

                Models.User user = await _userRepository.GetUser(requesterId);
                user.ProfilePictureName = profilePictureName;

                await _userRepository.UpdateUser(user);
                
                return new HttpResponse<Dtos.ReadDtos.UserReadDto>
                {
                    Data = _mapper.Map<Dtos.ReadDtos.UserReadDto>(user),
                    Messages = new string[] {},
                    ResponseType = ServiceResponse.Ok,
                    Success = true
                };
            } catch(Exception e) {
                return new HttpResponse<Dtos.ReadDtos.UserReadDto>
                {
                    Data = null,
                    Messages = new string[] { e.Message },
                    ResponseType = ServiceResponse.Ok,
                    Success = true
                };
            }
        }
        public async Task<HttpResponse<string>> GetUserProfilePicture(string userId)
        {
            Models.User user = await _userRepository.GetUser(userId);

            if (user == null) return new HttpResponse<string> {
                Data = "",
                Messages = new string[] { "User not found" },
                ResponseType = ServiceResponse.NotFound,
                Success = false
            };

            return new HttpResponse<string> {
                Data = user.ProfilePictureName,
                Messages = new string[] { "User profile picture" },
                ResponseType = ServiceResponse.Ok,
                Success = false
            };
        }
        public async Task<HttpResponse<UserReadDto>> UpdateUser(UpdateUserProfileCommand command) {
            User user = await _userRepository.GetUser(command.Id);
            user.FirstName = command.FirstName;
            user.LastName = command.LastName;
            user.Age = command.Age;

            await _userRepository.UpdateUser(user);

            return new HttpResponse<UserReadDto> {
                Data = _mapper.Map<UserReadDto>(user),
                Success = true,
                Messages = new String[] { "User " + command.Id + " has been updated" },
                ResponseType = ServiceResponse.Ok
            };
        }
    }
}