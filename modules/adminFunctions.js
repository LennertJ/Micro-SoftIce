const config 			= require("../config.json");

//{ export
module.exports = {
	purge : function(message, messagesToBeDeleted){
		if (isNaN(messagesToBeDeleted)){
			message.reply(messagesToBeDeleted + " is not a valid amount of messages to delete!")
			return;
		}
			
		if(!message.author.id === config.discordID)
		{
			message.channel.send(" ┍ ┞ ⊟⸎⥮ ⥯ ⊠ ┟ ┠┎ ⌆ ⌇◴ ლ(｀ー´ლ) ⎃ ◶ ◈ ⬖ ☍ ⌃ ⥮ ⥯ ◷ ┏ ");
			return;
		}
		
		if (messagesToBeDeleted>50)
		{
			message.reply(" I'm sorry i cant delete more than 50 messages at a time ");
			return;
		}
		
		message.channel.bulkDelete(messagesToBeDeleted).then(() => {
			message.channel.send("Look Micro-Ice, I deleted " + messagesToBeDeleted +" messages.").then(msg => msg.delete(3000));
		});
	},
	
	kill : function(message, bot){
		if (message.author.id === config.discordID){
			console.log("shutting off!");
			message.reply("I'll be back...")
			bot.destroy((err) => {
				console.log(err);
			});
			return;
		}else{
			message.channel.send(" ┍ ┞ ⊟⸎⥮ ⥯ ⊠ ┟ ┠┎ ⌆ ⌇◴ ლ(｀ー´ლ) ⎃ ◶ ◈ ⬖ ☍ ⌃ ⥮ ⥯ ◷ ┏ ");
			return;
		}
	}
}
//}