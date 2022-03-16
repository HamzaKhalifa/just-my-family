using System.Collections.Generic;
using API.Models;

namespace API.Dtos.Commands.Posts
{
    public class CreatePostCommand
    {
        public string Content { get; set; }
        public List<string> Pictures { get; set; }
        public string SubmittedAt { get; set; }
    }
}