namespace API.Dtos.ReadDtos
{
    public class ParticipantReadDto
    {
        public UserReadDto User { get; set; }
        public string UserId { get; set; }
        public RoomReadDto Room { get; set; }
        public int RoomId { get; set; }
    }
}