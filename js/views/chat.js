module.exports = Backbone.View.extend({
	
	initialize() {
		this.model.on('change', this.render, this);
		this.model.on('add', this.render, this);
		//this.model.on('remove', this.render, this);
	},
	
	events: {
		'click #send': 'createMessage',
	},
	
	createMessage() {
		const user = this.el.querySelector('#new-user').value;
		const message = this.el.querySelector('#new-message').value;
		this.model.postChat(user, message);
	},
	
	render() {
		const parent = this.el.querySelector('#chats');
		parent.innerHTML = '';
		
		const template = document.querySelector('#chat-template');
		
		for (let i=0; i<this.model.models.length; i++) {
			const chat = this.model.models[i];
			const li = document.createElement('li');
			
			li.innerHTML = Mustache.render(
				template.innerHTML,
				{
					from: chat.get('user'),
					message: chat.get('message'),
					added: chat.get('timestamp'),
				}
			);
			
			/*const remove = li.querySelector('.remove');
			remove.addEventListener('click', () => {
				console.log('removed ' + event.get('name'));
				this.model.remove(event);
				// ^ if you don't use an arrow function here,
				// you need to use self.model instead of this.model
			});*/
			
			parent.appendChild(li);
		}
	},
	
});