using System.Linq;
using API.Enumerations;
using API.Models;
using AutoMapper;

namespace API.Dtos.ReadDtos
{
    public class RelationshipReadDto : RoomReadDto
    {
        public RelationshipTypeEnum Type { get; set; }
        public UserReadDto User1 { get; set; }
        public string User1Id { get; set; }
        public UserReadDto User2 { get; set; }
        public string User2Id { get; set; }
        public UserReadDto SenderUser { get; set; }
        public string SenderUserId { get; set; }
        public bool Approved { get; set; }
    }
}