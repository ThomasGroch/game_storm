/**
 * GameController
 *
 * @description :: Server-side logic for managing Games
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res) {
		var name = req.param('name');

		Player.findOne({name: name}).exec(function(err, data) {
			if(!data) {
				res.redirect('/home');
				return;
			}

			res.view({
				player: data
			});
		});
	}
};
