const ChatList = require('./models/chat-list');
const ChatView = require('./views/chat');

window.addEventListener('load', () => {
	const list = new ChatList();
	
	const view = new ChatView({
		el: document.querySelector('body'),
		model: list,
	});
	
	view.render();
});