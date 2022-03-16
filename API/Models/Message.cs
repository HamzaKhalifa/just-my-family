using System.Collections.Generic;

namespace API.Models
{
    public class Message : BaseEntity
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public User Sender { get; set; }
        public string SenderId { get; set; }
        public Room Room { get; set; }
        public int RoomId { get; set; }
        public string SentAt { get; set; }
        public List<SeenByUserMessage> SeenByUsersMessages { get; set; }
    }
}