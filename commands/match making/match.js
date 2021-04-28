const fetch = require('node-fetch')
const cuteGif = require('../../gifs/love-mocha.json')

module.exports = {
	name: 'match',
	description: 'match two users',
    args: true,
    usage: '<@username> <@username>',
	execute(message, args) {
		message.channel.send(`Cupid ${message.author} wants to match ${args[0]} and ${args[1]}`);

        const gif = cuteGif.results[Math.floor(Math.random() * cuteGif.results.length)].url;
        message.channel.send(gif);
	}
};