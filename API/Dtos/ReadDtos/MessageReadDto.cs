using System;
using System.Collections.Generic;
using API.Models;

namespace API.Dtos.ReadDtos
{
    public class MessageReadDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public UserReadDto Sender { get; set; }
        public string SenderId { get; set; }
        public RoomReadDto Room { get; set; }
        public int RoomId { get; set; }
        public string SentAt { get; set; }
        public List<User> SeenByUsers { get; set; }
    }
}