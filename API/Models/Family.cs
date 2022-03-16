using System.Collections.Generic;
using Enumerations;

namespace API.Models
{
    public class Family : BaseEntity
    {
        public int Id { get; set; }
        public FamilyTypeEnum FamilyType { get; set; }
        public List<User> Users { get; set; }
    }
}