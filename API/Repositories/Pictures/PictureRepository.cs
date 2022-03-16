using System.Threading.Tasks;
using API.Data;
using API.Models;

namespace API.Repositories.Pictures
{
    public class PictureRepository : IPictureRepository
    {
        private readonly DataContext _context;
        public PictureRepository(DataContext context)
        {
            _context = context;
        }
        async Task<Picture> IPictureRepository.CreatePicture(Picture picture) {
            _context.Pictures.Add(picture);

            await _context.SaveChangesAsync();

            return picture;
        }
        
    }
}