require('dotenv').config();
const cuteGif = require('../../gifs/love-mocha.json')
const Discord = require('discord.js');

const reactions = new Discord.Message();

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

        if (args[0] === `<@!246046329388793867>` || args[1] === `<@!246046329388793867>`) {
            return message.channel.send(`${message.author}, you can't match me up! I know I'm pretty!`);
        }

        let reply = `**Cupid ${message.author} wants to match ${args[0]} and ${args[1]}**`
        reply += `\n*Go ahead react to this messsage!* :wave:`
		message.channel.send(reply)
        .then(async function(botMessage) {
            botMessage.react('💘');
            botMessage.react('👎');
            botMessage.react('👍');
            botMessage.react('🤡');
            botMessage.react('😍');
            botMessage.react('💔');
            botMessage.react('🙆🏻‍♀️');
            botMessage.react('🙅🏻‍♀️');
            botMessage.react('👀');
            botMessage.react('💩');
            
            const time = 600000;

            const goodFilter = (reaction, user) => {
                return (reaction.emoji.name === '👍' || reaction.emoji.name === '😍' || reaction.emoji.name === '💘' || reaction.emoji.name === '🙆🏻‍♀️' || reaction.emoji.name === '👀') && user.id === message.author.id;
            };
            const goodCollector = botMessage.createReactionCollector(goodFilter, { time: time });

            const badFilter = (reaction, user) => {
                return (reaction.emoji.name === '👎' || reaction.emoji.name === '🤡' || reaction.emoji.name === '💔' || reaction.emoji.name === '🙅🏻‍♀️' || reaction.emoji.name === '💩') && user.id === message.author.id;
            };
            const badCollector = botMessage.createReactionCollector(badFilter, { time: time });
            
            badCollector.on('collect', (reaction, user) => {
                console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
            });
            
            badCollector.on('end', collected => {
                console.log(`Collected ${collected.size} items`);
            });

            goodCollector.on('collect', (reaction, user) => {
                console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
            });
            
            goodCollector.on('end', collected => {
                const allReactions = botMessage.reactions.cache;
                const goodEmojiCount = allReactions.get('💘').count + allReactions.get('👍').count + allReactions.get('😍').count + allReactions.get('🙆🏻‍♀️').count + allReactions.get('👀').count - 5;
                const badEmojiCount = allReactions.get('👎').count + allReactions.get('🤡').count + allReactions.get('💔').count + allReactions.get('🙅🏻‍♀️').count + allReactions.get('💩').count - 5;
        
                console.log(goodEmojiCount)
                const percentage = goodEmojiCount/(goodEmojiCount+badEmojiCount)*100;
                let finalMatchReply = `**Here are the match results for ${args[0]} and ${args[1]} DRUM ROLL~**`
                finalMatchReply += `\n\n> **${percentage}%**`;

                if (percentage <= 50) {
                    finalMatchReply += ` ... 😢\n\n*Hmm, don't lose hope. You can make it happen yourself!*`;
                } else if (percentage <= 85) {
                    finalMatchReply += ` \n\n*People think you're cute enough! If you guys aren't togther, maybe go for it!*`;
                } else {
                    finalMatchReply += ` 🎉\n\n *Wow! You better be dating soon!! 👀*`;
                }
        
                message.channel.send(finalMatchReply);

                console.log(`Collected ${collected.size} items`);
            });

            

        });

        const gif = cuteGif.results[Math.floor(Math.random() * cuteGif.results.length)].url;
        message.channel.send(gif);
        
	}
};
