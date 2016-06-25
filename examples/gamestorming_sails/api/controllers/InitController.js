module.exports = {
    game_socket: function(req, res) {
        sails.io.on('connect', SocketService.onConnect);
        res.send(200);
    }
}
