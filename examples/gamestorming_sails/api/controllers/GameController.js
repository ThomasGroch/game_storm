/**
 * GameController
 *
 * @description :: Server-side logic for managing Games
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res) {
		Player.find({}).exec(function(err, data) {
			res.view({
				players: data
			});
		});
	},
	play: function(req, res) {
		var id = req.param('id');

		Player.findOne({id: id}).exec(function(err, data) {
			if(!data) {
				res.redirect('/game');
				return;
			}

			res.view({
				player: data
			});
		});
	}
};
