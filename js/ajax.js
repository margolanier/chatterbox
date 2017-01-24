const ChatList = require('./models/chat-list');
const ChatModel = require('./models/chat');

module.exports = Backbone.sync = function (method, model) {
	// Get chats
	if (method === 'read') {
		const req = new XMLHttpRequest();
		req.open('GET', 'http://api.queencityiron.com/chats');
		req.addEventListener('load', function () {
			const response = JSON.parse(req.responseText);
			const chatList = response.chats;
			
			// For each chat object in the ajax response,
			// send info to be parsed as a new chat model
			for (let i=0; i<response.chats.length; i++) {
				model.parseChat(response.chats[i]);
			}
			
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
			
			// After posting new chat, fetch all chats
			model.collection.fetch();
		});
		
		const body = JSON.stringify({
			from: model.get('user'),
			message: model.get('message'),
		});
		
		req.send(body);
	}
	
};