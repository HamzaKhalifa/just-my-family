using API.Repositories.RoomRepository;
using AutoMapper;

namespace API.Services.RoomService
{
    public class RoomService : IRoomService
    {
        private readonly IRoomRepository _roomRepository;
        private readonly IMapper _mapper;
        public RoomService(IRoomRepository roomRepository, IMapper mapper) {
            _roomRepository = roomRepository;
            _mapper = mapper;
        }
    }
}