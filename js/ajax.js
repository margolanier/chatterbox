//const ChatList = require('./models/chat-list');
const ChatModel = require('./models/chat');

module.exports = Backbone.sync = function (method, model) {
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
			
			console.log(chatList);
			
			// Make a new Chat Model for each of the responses
			for (let i=0; i<response.chats.length; i++) {
				let chat = new ChatModel();
				chat.set('id', chatList.id);
				chat.set('timestamp', chatList.added);
				chat.set('user', chatList.from);
				chat.set('message', chatList.message);
				
				model.add(chat);
			}
			
			model.trigger('change');
		});
		
		const body = JSON.stringify({
			from: model.get('user'),
			message: model.get('message'),
		});
		
		req.send(body);
	}
	
};