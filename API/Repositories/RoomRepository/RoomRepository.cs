using API.Data;

namespace API.Repositories.RoomRepository
{
    public class RoomRepository : IRoomRepository
    {
        private readonly DataContext _dataContext;
        public RoomRepository(DataContext dataContext) {
            _dataContext = dataContext;
        }
    }
}