const ChatList = require('./models/chat-list');
const ChatView = require('./views/chat');
require('./ajax.js');

window.addEventListener('load', () => {
	const list = new ChatList();
	
	const view = new ChatView({
		el: document.querySelector('body'),
		model: list,
	});
	
	view.model.fetch();
	
	/*setInterval(function() {
		view.model.fetch();
	}, 3000);*/
});