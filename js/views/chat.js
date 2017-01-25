module.exports = Backbone.View.extend({
	
	initialize() {
		this.model.on('change', this.render, this);
		this.model.on('remove', this.render, this);
	},
	
	events: {
		'click #send': 'createMessage',
	},
	
	createMessage() {
		const user = this.el.querySelector('#new-user').value;
		const message = this.el.querySelector('#new-message').value;
		this.model.postChat(user, message);
		
		this.el.querySelector('#new-user').innerHTML = '';
		this.el.querySelector('#new-message').innerHTML = '';
	},
	
	render() {
		const parent = this.el.querySelector('#chats ul');
		parent.innerHTML = '';
		
		const template = document.querySelector('#chat-template');
		
		for (let i=0; i<this.model.models.length; i++) {
			const chat = this.model.models[i];
			
			const li = document.createElement('li');
			li.innerHTML = Mustache.render(
				template.innerHTML,
				{
					user: chat.get('user'),
					message: chat.get('message'),
				}
			);
			
			const remove = li.querySelector('.remove');
			remove.addEventListener('click', () => {
				this.model.deleteChat(chat.get('id'));
			});
			
			parent.appendChild(li);
		}
	},
	
});