using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Dtos.Commands.AuthCommands;
using API.HttpHelpers;
using API.Models;
using API.Repositories.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using API.Services.EmailService;

namespace API.Services.AuthService
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _authRepository;
        private readonly IConfiguration _configuration;
        private readonly UserManager<User> _userManager;
        private readonly IEmailService _emailService;
        public AuthService(IAuthRepository authRepository, IConfiguration configuration, UserManager<User> userManager, IEmailService emailService)
        {
            _authRepository = authRepository;
            _configuration = configuration;
            _userManager = userManager;
            _emailService = emailService;
        }

        public string GenerateToken(User user) {
            var mySecret = _configuration.GetSection("AppSettings:SecretKey").Value;
            var myIssuer = _configuration.GetSection("AppSettings:Issuer").Value;
            var myAudience = _configuration.GetSection("AppSettings:Audience").Value;

            var mySecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(mySecret));

            DateTime expirationDate = DateTime.UtcNow.AddDays(7);

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim("name", user.FirstName),
                }),
                Expires = expirationDate,
                Issuer = myIssuer,
                Audience = myAudience,
                SigningCredentials = new SigningCredentials(mySecurityKey, SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public async Task<HttpResponse<string>> Login(LoginCommand command)
        {
            User user = await _authRepository.FindUserByEmail(command.Email);

            if (user == null) return new HttpResponse<string> { 
                Data = null, 
                Success = false,
                ResponseType = ServiceResponse.Unauthorized,
                Messages = new string[] { ServiceResponse.Unauthorized },
            };
            
            bool correctPassword = await _authRepository.CheckPassword(user, command.Password);
            if (!correctPassword) {
                return new HttpResponse<string> { 
                    Data = null, 
                    Success = false,
                    ResponseType = ServiceResponse.WrongPasword,
                    Messages = new string[] { ServiceResponse.WrongPasword },
                };
            }
            
            string token = GenerateToken(user);

            return new HttpResponse<string> { 
                Data = token,
                Success = true,
                ResponseType = ServiceResponse.Success,
                Messages = new string[] { ServiceResponse.Success },
            };
        }

        public async Task<HttpResponse<User>> Register(RegisterCommand command)
        {
            var user = new User { 
                UserName = command.Email, 
                Email = command.Email, 
                FirstName = command.FirstName, 
                LastName = command.LastName,
                Gender = command.Gender
            };
            var result = await _authRepository.CreateUser(user, command.Password);
                
            if (!result.Succeeded) {
                return new HttpResponse<User> { 
                    Data = null, 
                    Success = false,
                    ResponseType = ServiceResponse.ValidationProblem,
                    Messages = result.Errors.Select(error => error.Description).ToArray<string>()
                };
            }

            return new HttpResponse<User> { 
                Data = user, 
                Success = true,
                ResponseType = ServiceResponse.Success,
                Messages = new string[] { "Success" }
            };
        }
        
        public async Task<HttpResponse<bool>> SendResetPasswordEmail(string email) {
            User user = await _authRepository.FindUserByEmail(email);

            if (user == null) {
                return new HttpResponse<bool> {
                    Data = false, 
                    Messages = new string[] { "User not found" },
                    ResponseType = ServiceResponse.NotFound,
                    Success = false
                };
            }

            string token = await _authRepository.GeneratePasswordResetToken(user);

            // Now we send the email with the token
            _emailService.SendEmail(
                new string[] { email }, 
                "Password Reset", 
                "<a href=" + _configuration.GetSection("AppSettings:Audience").Value + "/resetPassword?token=" + token + ">Click here to reset your password</a>"
            );

            return new HttpResponse<bool> {
                Data = true, 
                Messages = new string[] { "Password reinitialization email has been sent" },
                ResponseType = ServiceResponse.Ok,
                Success = true
            };
        }
        
        public async Task<HttpResponse<bool>> ResetPassword(ResetPasswordCommand command) {
            User user = await _authRepository.FindUserByEmail(command.Email);

            if (user == null) {
                return new HttpResponse<bool> {
                    Data = false, 
                    Messages = new string[] { "User not found" },
                    ResponseType = ServiceResponse.NotFound,
                    Success = false
                };
            }

            IdentityResult result = await _authRepository.ResetPassword(user, command.Token, command.Password);

            return new HttpResponse<bool> {
                Data = true, 
                Messages = result.Succeeded ? new string[] { "Password has been reset" } : result.Errors.Select(error => error.Description).ToArray(),
                ResponseType = result.Succeeded ? ServiceResponse.Ok : ServiceResponse.Conflict,
                Success = result.Succeeded
            };
        }
        
        public async Task<HttpResponse<bool>> ChangePassword(ChangePasswordCommand command) {
            User user = await _authRepository.FindUserById(command.UserId);
            
            if (user == null) {
                return new HttpResponse<bool> {
                    Data = false, 
                    Messages = new string[] { "User not found" },
                    ResponseType = ServiceResponse.NotFound,
                    Success = false
                };
            }

            var response = await _authRepository.ChangePassword(user, command.OldPassword, command.NewPassword);
            return new HttpResponse<bool> {
                Data = response.Succeeded, 
                Messages = response.Succeeded ? new string[] { "Password has been changed" } : new string[] { "Problem changing password" },
                ResponseType = response.Succeeded ? ServiceResponse.Ok : ServiceResponse.Conflict,
                Success = response.Succeeded, 
            };
        }
    }
}