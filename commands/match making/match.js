module.exports = {
	name: 'match',
	description: 'match two users',
    args: true,
    usage: '<user1> <user2>',
	execute(message, args) {
		message.channel.send(`${message.author} wants to match `);
	},
};