using System;
using System.Linq;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : IdentityDbContext<User>
    {
        public DbSet<Family> Families { get; set; }
        public DbSet<UserFamily> UsersFamilies { get; set; }
        public DbSet<Relationship> Relationships { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Participant> Participants { get; set; }
        public DbSet<SeenByUserMessage> SeenByUsersMessages { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Picture> Pictures { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Reaction> Reactions { get; set; }
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder) {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>().HasData(new IdentityRole[] {
                new IdentityRole { Name = "SuperAdmin", NormalizedName = "SUPERADMIN"},
                new IdentityRole { Name = "Admin", NormalizedName = "ADMIN"},
                new IdentityRole { Name = "Member", NormalizedName = "MEMBER" },
            });

            builder.Entity<UserFamily>().HasKey(nameof(UserFamily.UserId), nameof(UserFamily.FamilyId));
            builder.Entity<Participant>().HasKey(nameof(Participant.UserId), nameof(Participant.RoomId));
            builder.Entity<Reaction>().HasKey(nameof(Reaction.UserId), nameof(Reaction.PostId));
            builder.Entity<SeenByUserMessage>()
                .HasKey(seenByUserMessage => new { seenByUserMessage.UserId, seenByUserMessage.MessageId });  
            builder.Entity<SeenByUserMessage>()
                .HasOne(userMessage => userMessage.User)
                .WithMany(user => user.SeenMessages)
                .HasForeignKey(userMessage => userMessage.UserId);  
            builder.Entity<SeenByUserMessage>()
                .HasOne(userMessage => userMessage.Message)
                .WithMany(message => message.SeenByUsersMessages)
                .HasForeignKey(userMessage => userMessage.MessageId);  
        }
        public override int SaveChanges()
        {
            this.ChangeTracker.DetectChanges();
            var added = this.ChangeTracker.Entries()
                        .Where(t => t.State == EntityState.Added)
                        .Select(t => t.Entity)
                        .ToArray();

            foreach (var entity in added)
            {
                if (entity is BaseEntity || entity is User)
                {
                    var track = entity as BaseEntity;
                    track.CreatedAt = DateTime.Now;
                }
            }

            var modified = this.ChangeTracker.Entries()
                        .Where(t => t.State == EntityState.Modified)
                        .Select(t => t.Entity)
                        .ToArray();

            foreach (var entity in modified)
            {
                if (entity is BaseEntity || entity is User)
                {
                    var track = entity as BaseEntity;
                    track.UpdatedAt = DateTime.Now;
                }
            }
            return base.SaveChanges();
        }
        
    }

}