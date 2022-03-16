namespace API.Dtos.Commands.AuthCommands
{
    public class ResetPasswordCommand
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
    }
}