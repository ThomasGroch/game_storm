module.exports = {
    init_game_socket: function(socket) {

        var onPlayerUpdate = function(data) {
            Player.update({"id": data.id}, data.data).exec(function(err, data) {});
        };

        socket.on('player_update', onPlayerUpdate);
    }
}
