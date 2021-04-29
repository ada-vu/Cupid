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

        //handling error for when user forgets to input the @ symbol and to check if the user is part of the server
        for (let i = 0; i < args.length; i++) {
            const user = args[i].substring(1, 2); //if users are not in the server then the substring(0, 1) that's why this is a check LOL
            if ( user !== "@") {
                return message.channel.send(`${message.author}, you forgot the @ symbol for the usernames! Or the users do not exist in this server!`);
            } 
        }

        let reply = `**Cupid ${message.author} wants to match ${args[0]} and ${args[1]}**`
        reply += `\n*Go ahead react to this messsage!* :wave:`
		message.channel.send(reply);

        const gif = cuteGif.results[Math.floor(Math.random() * cuteGif.results.length)].url;
        message.channel.send(gif);
	}
};