using System.Collections.Generic;

namespace API.Models
{
    public class Post : BaseEntity
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public List<Picture> Pictures { get; set; }
        public string SubmittedAt { get; set; }
        public User User { get; set; }
        public string UserId { get; set; }
        public List<Comment> Comments { get; set; }
        public List<Reaction> Reactions { get; set; }
    }
}