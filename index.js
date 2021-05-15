require('dotenv').config();
const fs = require('fs');
const token = process.env.discordtoken;
const prefix = process.env.prefix;

//connect to discord
const Discord = require('discord.js');
const client = new Discord.Client();

//dynamic command handling setup with commands in different folders
client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

const arrayOfCommands = ["!match", "!flirt", "!help"];

client.once('ready', () => {
	console.log('Ready!');
	client.user.setPresence({
        status: "online",  //You can show online, idle....
        activity: {
            name: "casually matching yall up 👀",  //The message shown
            type: "STREAMING" //PLAYING: WATCHING: LISTENING: STREAMING:
        }
    });
});

//inputting commands into discord 
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	//parsing arguments, each word is an argument
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (commandName !== "match" && commandName !== "flirt" && commandName !== "help") {
		return message.channel.send(`Uh oh ${message.author}... That seems to be the wrong command. Did you mean to type \`${arrayOfCommands[Math.floor(Math.random() * arrayOfCommands.length)]}\`?`)
	}

	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);

	//if command requires args and not given any handle it by returning what args it expects
	if (command.args && !args.length) {
		let reply = `Hold up! You need to add more info, ${message.author}`;
		if (command.usage) {
			reply += `\nThe proper usage would be: \n\`${prefix}${command.name} ${command.usage}\``;
		}
		return message.channel.send(reply);
	}

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(token);