namespace API.Models
{
    public class SeenByUserMessage
    {
        public string UserId { get; set; }
        public User User { get; set; }
        public int MessageId { get; set; }
        public Message Message { get; set; }
    }
}