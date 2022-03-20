using API.Enumerations;

namespace API.Models
{
    public class Reaction : BaseEntity
    {
        public int Id { get; set; }
        public User User { get; set; }
        public string UserId { get; set; }
        public Post Post { get; set; }
        public int PostId { get; set; }
        public Comment Comment { get; set; }
        public string CommentId { get; set; }
        public ReactionEnum Type { get; set; }
        public string SubmittedAt { get; set; }
        public bool Seen { get; set; }
    }
}