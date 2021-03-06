const ChatModel = require('./chat');

module.exports = Backbone.Collection.extend({
	model: ChatModel,
	
	// After user 'sends' a chat,
	// create new Chat model to send to server
	postChat(user, message) {
		const chat = new ChatModel();
		chat.set('user', user);
		chat.set('message', message);
		
		chat.collection = this;
		chat.save();
	},
	
	// After response comes back from server,
	// parse through all chats and create model for each
	parseChat(response) {
		const chat = new ChatModel();
		chat.set('id', response.id);
		chat.set('timestamp', response.added);
		chat.set('user', response.from);
		chat.set('message', response.message);
		
		this.add(chat);
	},
	
	// Find the model that has matching id and delete it
	deleteChat(id) {
		let matches = this.models.filter(function (model) {
			return (model.get('id') === id);
		});
		
		let match = matches[0];
		this.remove(match);
		match.destroy();
	},
	
});