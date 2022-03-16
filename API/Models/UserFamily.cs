namespace API.Models
{
    public class UserFamily : BaseEntity
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public int FamilyId { get; set; }
        public Family Family { get; set; }
    }
}