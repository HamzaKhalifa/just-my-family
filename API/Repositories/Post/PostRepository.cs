using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using API.Repositories.Pictures;

namespace API.Repositories.Post
{
    public class PostRepository : IPostRepository
    {
        private readonly DataContext _context;
        private readonly IPictureRepository _pictureRepository;
        public PostRepository(DataContext context, IPictureRepository pictureRepository)
        {
            _context = context;
            _pictureRepository = pictureRepository;
        }
        public async Task<Models.Post> CreatePost(Models.Post post, List<string> pictures)
        {
            _context.Posts.Add(post);
            pictures.ForEach(async picture => {
                await _pictureRepository.CreatePicture(new Picture { Path = picture, PostId = post.Id });
            });
            await _context.SaveChangesAsync();
            return post;
        }
    }
}