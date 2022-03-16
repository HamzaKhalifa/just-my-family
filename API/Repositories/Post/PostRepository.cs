using System.Threading.Tasks;
using API.Data;

namespace API.Repositories.Post
{
    public class PostRepository : IPostRepository
    {
        private readonly DataContext _context;
        public PostRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<Models.Post> CreatePost(Models.Post post)
        {
            _context.Posts.Add(post);
            await _context.SaveChangesAsync();
            return post;
        }
    }
}