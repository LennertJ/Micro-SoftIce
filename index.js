//{ variables
const discord 			= require('discord.js');
const config 			= require("./config.json");
const bot 				= new discord.Client();
const request 			= require("request");
const fileSystem 		= require("fs")
const apiai				= require("apiai");
var apiaiApp			= apiai(config.dialogMasterKey);

const prefix = config.prefix;

const botName = "Micro-SoftIce";
const botId = "#0001";

const ikBenArray = ["ik ben", "ik was", "ben ik", "was ik", "kben", "kwas", "wask", "benk", "wij zijn", "zijn wij"];

const musicbot 	= require('./modules/musicbot.js');
const yanken	= require('./modules/yanken.js');
const core 		= require('./modules/coreFunctions.js');
const lol		= require('./modules/lol.js');
const admin 	= require('./modules/adminFunctions.js');
const fortnite  = require('./modules/seasonal/fortnite.js');
const wk 		= require('./modules/seasonal/footbal.js');

//}

//{ login
console.log('script is running');
bot.on("ready", () => {
    console.log('Logged in as: ');
    console.log(botName + ' - (' + botId + ')');
	bot.user.setPresence({ status: 'online', game: { name: "fix the skipbutton" } });
});
//}
      
//{ eventlisteners
bot.on("message", (message) => {
	var stringMessage = message.content.toLowerCase();
	if (stringMessage.indexOf("it'll be fun!!")!==-1){
		message.react("❌")
		setTimeout(function () {
		message.react("⏭")}, 1000);
	}
    if (message.author.bot) return;

    if (message.content.charAt(0) == prefix) {//if it's a command
		console.log("\nIssued Command: " + message.content.substr(1));
		var request = apiaiApp.textRequest(message.content.substr(1), {
            sessionId: 'Micro-SoftIceAiSession'
        });
		//console.log(request);

        // Listen to a response from API.ai
        request.on('response', (response) => {
            // Reply the user with the given response
			processCommand(message, message.content.split(' ').slice(1).join(" "), stringMessage, response.result.fulfillment.speech);
        });
    
        // Listen for any errors in the response
        request.on('error', (error) => {
            // Tell the user that an error happened
			console.log(error);
            message.reply("Oops! There is an error in our end");
        });

        // End the request to avoid wasting memory
        request.end();
		
        //processCommand(message, message.content.split(' ').slice(1).join(" "), stringMessage,"");
    } else {
        processDumbStuff(message, stringMessage);
    }
});

bot.on('messageReactionAdd', (messageReaction, user)=>{
	if (user.bot) return;

	stringMessage = messageReaction.message.content.toLowerCase();
	if (stringMessage.indexOf("it'll be fun!!")==-1) {return;}
	else if (messageReaction.emoji.name == "❌"){
		fortnite.wrongSpot(messageReaction.message);
	}else if(messageReaction.emoji.name == "⏭"){
		fortnite.nextSpot(messageReaction.message);
	}
});
//}

//{ function calls
function processCommand(message, args, stringMessage, response="") {

	try{
		if 		 (response == "_kill") 							{admin.kill(message, bot); 								return;
		}else if (response.split(" ")[0] == "_purge")			{admin.purge(message, response.split(" ")[1]); 			return;
		}else if (response.split(" ")[0] == "_yanken")			{yanken.jankenGo(message, "yanken " + response);		return;
		}else if (stringMessage.startsWith(prefix + "yanken "))	{yanken.jankenGo(message, stringMessage);				return;
		}else if (stringMessage.startsWith(prefix + "yankenlb")){message.channel.send(yanken.printScoreboard());		return;

		}else if (stringMessage.startsWith(prefix + "poll")) 	{core.poll(message, args);								return;
		}else if (stringMessage.startsWith(prefix + "say"))		{core.say(message, args);								return;
		}else if (response == "_els")							{core.els(message); 									return;
		}else if (response.split(" ")[0] == "_google")			{core.advancedSearch(message,response.split(" ").shift());return;						
		}else if (stringMessage.startsWith(prefix + "ggl"))		{core.search(message,args);								return;
		}else if (response.split(" ")[0] == "_runes")			{lol.runeLookUp(message,response);						return;	
		}else if (response.split(" ")[0] == "_skillorder")		{lol.skillOrder(message,response);						return;	
		}else if (response.split(" ")[0] == "_buildorder")		{lol.buildOrder(message,response);						return;	
		//}else if (stringMessage.startsWith(prefix + "runes"))	{core.runeLookUp(message, args);						return;
		//}else if (stringMessage.startsWith(prefix + "google"))	{core.advancedSearch(message,args);						return;
		//}else if (stringMessage.startsWith(prefix + "op"))		{lol.leagueRankLookUp(message,args);					return;
		
		}else if (stringMessage.startsWith(prefix + "play") || stringMessage.startsWith(prefix + "stop") ||
			stringMessage.startsWith(prefix + "skip") || stringMessage.startsWith(prefix + "queue")) {
			voiceChannel = message.member.voiceChannel;
			if (voiceChannel != undefined) {
				if (stringMessage.startsWith(prefix + "play")) 			{musicbot.processPlayComand(message, args, voiceChannel);
				}else if (stringMessage.startsWith(prefix + "stop")) 	{musicbot.processStopComand(message, voiceChannel);
				}else if (stringMessage.startsWith(prefix + "skip")) 	{musicbot.processSkipComand(message, voiceChannel);
				}else if (stringMessage.startsWith(prefix + "queue")) 	{musicbot.processCueComand(message, voiceChannel) ;}
				
			} else {
				message.reply("**You need to be in a voice channel to use this command!** >:(");
				return;
			}
		}else if(response != ""){
			message.channel.send(response);
			return;
		}
	}catch(error){
		console.log(error);
	}
}

function processDumbStuff(message, stringMessage) {
    //dag weg
    for (var i = 0; i < ikBenArray.length; i++) {
        if (stringMessage.indexOf(ikBenArray[i]) !== -1) {
            message.channel.send(core.dagWeg(stringMessage));
        }
    }
	
    if (stringMessage.indexOf("oracle") !== -1) {core.reactOracle(message); }
	if (stringMessage.indexOf("join") !== -1){message.channel.send("joins are overrated! ```overrated: An excuse that people make because they don't like something as much as someone else, and they hate that other people like it.```");}
	if (message.attachments.size > 0 && (message.channel.id == "390211458253979659" || message.channel.id == "387634002959532032" || message.channel.id == "430022169745948689" || message.channel.id == "523885249873313792")) {message.react("👌");}
	if (stringMessage.indexOf(prefix + "landing") !== -1){message.reply(fortnite.pickLandingLocation(message));}
	if (stringMessage.indexOf("belgi") !== -1 || stringMessage.indexOf("wk") !== -1 || stringMessage.indexOf("voetbal") !== -1) {wk.reactBelgium(message);}
}
//}

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use
})

bot.login(config.token);