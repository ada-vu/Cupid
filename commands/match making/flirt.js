require('dotenv').config();
const Tenor = require("tenorjs").client({
    "Key": `${process.env.tenorkey}`, // https://tenor.com/developer/keyregistration
    "Filter": "off", // "off", "low", "medium", "high", not case sensitive
    "Locale": "en_US", // Your locale here, case-sensitivity depends on input
    "MediaFilter": "minimal", // either minimal or basic, not case sensitive
    "DateFormat": "D/MM/YYYY - H:mm:ss A" // Change this accordingly
});

module.exports = {
	name: 'flirt',
	description: 'send a GIF to your crush oooooo~',
    args: true,
    usage: '<category GIF> @username',
	execute(message, args) {
        //handling error when user only one of the arguments
        if (args.length != 2) {
            return message.channel.send(`Hey ${message.author}! You're missing a some information. \nThe proper usage would be: \n\`!${this.name} ${this.usage}\``)
        }
        
        //handling wrong input for category
        if (args[0].substring(0,1) !== "<" && args[0].substring(args[0].length-1, args[0].length) !== ">") {
            return message.channel.send(`Ahh ${message.author}, you need to put < > around your category. \nFor example: \`<love>\``);
        }

        const categoryGIF = args[0].substring(1, args[0].length-1);

        // Tenor.Categories.Find("CATEGORY OR TAG HERE", "LIMIT HERE")
        Tenor.Search.Random(`${categoryGIF}`, "1").then(Results => {
            Results.forEach(Post => {
                message.channel.send(`**Hey ${args[1]}!** \nIt seems ${message.author} is sending you a ***${categoryGIF}*** GIF. Maybe you should privately DM them :heart:`);
                message.channel.send(Post.url);
            });
        }).catch(console.error);
    }
}