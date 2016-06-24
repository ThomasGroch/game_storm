module.exports = {
    game_socket: function(req, res) {
        sails.io.on('connect', function(socket) {
			SocketService.init_game_socket(socket);
		});
        res.send(200);
    }
}
