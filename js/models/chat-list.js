const ChatModel = require('./chat');

module.exports = Backbone.Collection.extend({
	model: ChatModel,
	
	postChat(user, message) {
		const chat = new ChatModel();
		chat.set('user', user);
		chat.set('message', message);
		this.add(chat);
		
		console.log(chat);
		chat.save();
	},
	
});