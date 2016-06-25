module.exports = {
    onConnect: function(socket) {
        socket.on('player_update', PlayerService.onUpdate);
    }
}
