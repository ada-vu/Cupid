const Discord = require('discord.js');

const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#b171d1')
	.setTitle(':question:\ Help Guide')
	.setAuthor('Cupid Bot', 'https://images.unsplash.com/photo-1571172964533-d2d13d88ce7e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80')
	.setDescription(`Welcome to Cupid Bot! Being a cupid for your friends is really easy!\n\nFollow these commands below`)
	.setThumbnail('https://images.unsplash.com/photo-1571172964533-d2d13d88ce7e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80')
	.addFields(
		{ name: '\u200B', value: '\u200B' },
		{ name: "Commands", value: `:heart:\ \`!match <username> <username>\` | Match your friends!\n\n :kissing_heart:\ \`!flirt <category GIF> <username>\` | Send a random categorized GIF to your crush!\n\n :question:\ \`!help\` | Gives you info on Cupid Bot` },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'React!\ :wave:', value: 'React to the match messages how you feel about the couple being matched!', inline: true },
		{ name: 'Cuteness Level %\ :heart_eyes:', value: 'After a few hours, Cupid Bot will send a percentage of what a great pair people think the match is!', inline: true },
		{ name: '\u200B', value: '\u200B' }
	)
	.setTimestamp()

module.exports = {
	name: 'help',
	description: 'shows how to use the bot',
	execute(message, args) {
		message.channel.send(exampleEmbed);
	},
};