using System.Collections.Generic;

namespace API.Dtos.ReadDtos
{
    public class RoomReadDto
    {
        public int Id { get; set; }
        public List<MessageReadDto> Messages { get; set; }
        public int NumberOfUnseenMessages { get; set; }
        public int TotalMessages { get; set; }
    }
}