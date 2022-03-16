namespace API.Dtos.Commands.AuthCommands
{
    public class ChangePasswordCommand
    {
        public string UserId { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}