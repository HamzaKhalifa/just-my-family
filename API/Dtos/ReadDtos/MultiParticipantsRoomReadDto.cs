using System.Collections.Generic;

namespace API.Dtos.ReadDtos
{
    public class MultiParticipantsRoomReadDto : RoomReadDto
    {
        public string Name { get; set; }
        public List<ParticipantReadDto> Participants { get; set; }
        public bool DirectMessages { get; set; }
    }
}