using System.Collections.Generic;

namespace API.Models
{
    public class Post : BaseEntity
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public List<Picture> Pictures { get; set; }
        public string SubmittedAt { get; set; }
    }
}