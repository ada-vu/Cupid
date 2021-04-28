module.exports = {
	name: 'help',
	description: 'shows how to use the bot',
	execute(message, args) {
		message.channel.send(`To use Cupid bot and match people up, type: \n\`!match <@username> <@username>\``);
	},
};