using System.Collections.Generic;

namespace API.Dtos.ReadDtos
{
    public class UserReadDto
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string ProfilePictureName { get; set; }
        public List<PostReadDto> Posts { get; set; }
        
    }
}