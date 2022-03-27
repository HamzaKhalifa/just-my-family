namespace API.Dtos.Commands.UserCommands
{
    public class UpdateUserProfileCommand
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
    }
}