require('dotenv').config();
const Discord = require('discord.js');

const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#b171d1')
	.attachFiles('images/cupid.png')
	.setTitle(':question:\ Help Guide')
	.setAuthor('Cupid Bot', 'attachment://cupid.png')
	.setDescription(`Welcome to Cupid Bot! Be the cupid for your friends!\n\nFollow these commands below`)
	.setThumbnail('attachment://cupid.png')
	.addFields(
		{ name: '\u200B', value: '\u200B' },
		{ name: "Commands", value: `:heart:\ \`!match @username @username\` | Match your friends!\n\n :kissing_heart:\ \`!flirt <category GIF> @username\` | Be brave and send a random categorized GIF to your crush! It might be weird hehe...\n\n :question:\ \`!help\` | Gives you info on Cupid Bot` },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'React!\ :wave:', value: 'React to the match messages how you feel about the couple being matched!', inline: true },
		{ name: 'Cuteness Level %\ :heart_eyes:', value: 'After a few hours, Cupid Bot will send a percentage of what a great pair people think the match is!', inline: true },
		{ name: '\u200B', value: '\u200B' }
	)
	.setTimestamp()

module.exports = {
	name: 'help',
	description: 'shows how to use the bot',
	args: true,
    usage: 'Cupid',
	execute(message, args) {
		message.channel.send(exampleEmbed);
	},
};