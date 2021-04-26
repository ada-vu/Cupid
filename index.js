require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

const token = process.env.token;
const prefix = process.env.prefix;


client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.content === `${prefix}ping`) {
		message.channel.send('Pong!');
	}
});

client.login(token);