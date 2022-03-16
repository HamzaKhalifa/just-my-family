using API.Enumerations;

namespace API.Models
{
    public class Relationship : Room
    {
        public RelationshipTypeEnum Type { get; set; }
        public User User1 { get; set; }
        public string User1Id { get; set; }
        public User User2 { get; set; }
        public string User2Id { get; set; }
        public User SenderUser { get; set; }
        public string SenderUserId { get; set; }
        public bool Approved { get; set; }
        public bool Seen { get; set; }
    }
}