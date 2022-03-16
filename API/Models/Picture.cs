namespace API.Models
{
    public class Picture : BaseEntity
    {
        public int Id { get; set; }
        public string Path { get; set; }
        public Post Post { get; set; }
        public int PostId { get; set; }
    }
}