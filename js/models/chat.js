module.exports = Backbone.Model.extend({
	defaults: {
		user: 'User',
		timestamp: '', //new Date();
		message: 'Message',
	},
});