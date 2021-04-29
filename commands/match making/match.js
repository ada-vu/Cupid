require('dotenv').config();
const cuteGif = require('../../gifs/love-mocha.json')

module.exports = {
	name: 'match',
	description: 'match two users',
    args: true,
    usage: '@username @username',
	execute(message, args) {
        //handling error when user only inputs one username
        if (args.length !== 2) {
            return message.channel.send(`${message.author}, you only inputted one user! They're lonely and waiting for a pair! \nThe proper usage would be: \n\`!${this.name} ${this.usage}\``)
        }

        //handling error for when user forgets to input the @ symbol
        for (let i = 0; i < args.length; i++) {
            const user = args[i].substring(1, 2);
            if (args[0] && args[1] && user !== "@") {
                return message.channel.send(`${message.author}, you forgot the @ symbol for both usernames!`);
            } else if (args[0] && user !== "@") {
                return message.channel.send(`${message.author}, you must include the @ symbol for the first username!`);
            } else {
                return message.channel.send(`${message.author}, you must include the @ symbol for the second username!`);
            }
        }

		message.channel.send(`Cupid ${message.author} wants to match ${args[0]} and ${args[1]}`);

        const gif = cuteGif.results[Math.floor(Math.random() * cuteGif.results.length)].url;
        message.channel.send(gif);
	}
};