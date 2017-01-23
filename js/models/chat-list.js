const ChatModel = require('./chat');

module.exports = Backbone.Collection.extend({
	model: ChatModel,
	
	addChat(user, message) {
		const chat = new ChatModel();
		chat.set('user', user);
		chat.set('timestamp', 'monday');
		//chat.set('added', ...);
		chat.set('message', message);
		
		this.add(chat);
	},
	
});


Backbone.sync = function (method, model) {
	// Get chats
	if (method === 'read') {
		const req = new XMLHttpRequest();
		req.open('GET', 'http://api.queencityiron.com/chats');
		req.addEventListener('load', function () {
			const response = JSON.parse(req.responseText);
			const chatList = response.chats;
			
			console.log('getting');
			console.log(chatList);
			
			
			model.trigger('change');
		});
		
		req.send();
	}
	
	// Add a chat
	if (method === 'create' || method === 'update') {
		const req = new XMLHttpRequest();
		req.open('POST', 'http://api.queencityiron.com/chats');
		req.addEventListener('load', function () {
			const response = JSON.parse(req.responseText);
			const chatList = response.chats;
			
			console.log('posting');
			console.log(chatList);
			
			// Add last chat to collection
			console.log('list length = ' + chatList.length);
			let lastChat = chatList.length - 1;
			
//			model.set('round', round);
//			model.set('feedback', 	model.get('feedback').push(latest.response));
			
			model.trigger('change');
		});
		
		const body = JSON.stringify({
			from: 'margo',
			message: 'cool, it is working',
		});
		
		req.send(body);
	}
	
};