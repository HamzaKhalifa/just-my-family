using API.Enumerations;

namespace API.Dtos.Commands.AuthCommands
{
    public class RegisterCommand
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public GenderEnum Gender { get; set; }
    }
}