using System;
using System.Collections.Generic;
using API.Enumerations;
using Microsoft.AspNetCore.Identity;

namespace API.Models
{
    public class User : IdentityUser
    {
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ProfilePictureName { get; set; }
        public GenderEnum Gender { get; set; }
        public List<SeenByUserMessage> SeenMessages { get; set; }
    }
}