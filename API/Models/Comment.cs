using System.Collections.Generic;

namespace API.Models
{
    public class Comment : BaseEntity
    {
        public int Id { get; set; }
        public User User { get; set; }
        public string UserId { get; set; }
        public Post Post { get; set; }
        public int PostId { get; set; }
        public string Content { get; set; }
        public string SubmittedAt { get; set; }
        public List<Reaction> Reactions { get; set; }
    }
}