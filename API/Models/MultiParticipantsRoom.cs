using System.Collections.Generic;

namespace API.Models
{
    public class MultiParticipantsRoom : Room
    {
        public string Name { get; set; }
        public List<Participant> Participants { get; set; }
    }
}