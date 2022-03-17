using API.Models;

namespace API.Dtos.ReadDtos
{
    public class PostReadDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string SubmittedAt { get; set; }
        public UserReadDto User { get; set; }
        public string UserId { get; set; }
    }
}