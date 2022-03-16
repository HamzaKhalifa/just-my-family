namespace API.Models
{
    public class Participant : BaseEntity
    {
        public User User { get; set; }
        public string UserId { get; set; }
        public Room Room { get; set; }
        public int RoomId { get; set; }
    }
}