using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace API.Hubs
{
    public class APIHub : Hub
    {
        private static Dictionary<string, List<string>> _usersToConnections = new Dictionary<string, List<string>>();
        public static Dictionary<string, List<string>> UsersToConnections { get { return _usersToConnections; } }
        public override Task OnConnectedAsync() {
            List<string> connectionIds;

            if (!_usersToConnections.TryGetValue(Context.UserIdentifier, out connectionIds)) {
                connectionIds = new List<string>();
            }

            connectionIds.Add(Context.ConnectionId);
            _usersToConnections.TryAdd(Context.UserIdentifier, connectionIds);

            return base.OnConnectedAsync();
        }
        public override Task OnDisconnectedAsync(Exception e) {
            List<string> connectionIds;
            if (!_usersToConnections.TryGetValue(Context.UserIdentifier, out connectionIds)) {
                return base.OnDisconnectedAsync(e);
            }

            _usersToConnections.Remove(Context.ConnectionId);

            return base.OnDisconnectedAsync(e);
        }
        public static List<string> GetConnectionIdsFromUserIds(List<string> usersIds) {
            List<string> connectionIds = new List<string>();
            usersIds.ForEach(userId => {
                List<string> userConnectionIds;
                if (!_usersToConnections.TryGetValue(userId, out userConnectionIds)) {
                    userConnectionIds = new List<string>();
                }
                userConnectionIds.ForEach(connectionId => {
                    connectionIds.Add(connectionId);
                });
            });

            return connectionIds;
        }
    }
}