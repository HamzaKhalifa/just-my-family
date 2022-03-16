using System.Threading.Tasks;
using API.Models;

namespace API.Repositories.Pictures
{
    public interface IPictureRepository
    {
        Task<Picture> CreatePicture(Picture picture);
    }
}