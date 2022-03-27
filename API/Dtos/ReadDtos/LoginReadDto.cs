namespace API.Dtos.ReadDtos
{
    public class LoginReadDto
    {
        public string Token { get; set; }
        public UserReadDto User { get; set; }
    }
}