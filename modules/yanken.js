//{ variables
const fileSystem 		= require("fs")

const yankenArray = ["rock", "paper", "scissors"];
//}

//{ export
module.exports = {
	jankenGo: function(message, stringMessage){
		let pickIndex = Math.floor((Math.random() * 3))
		let pick = yankenArray[pickIndex];//rock paper scissors
		let humanpick = -2;
		
		for( let i = 0; i<yankenArray.length; i++){
			if(stringMessage.indexOf(yankenArray[i]) != -1){
				humanpick = i;
				break;
			}
		}
		if(humanpick==-2){
			message.reply("You appear to have made a typo.");
			return;
		}
		message.reply("Then I will pick " + pick + "!");
		
		if ((humanpick+1)%3 == pickIndex){//bot wins
			message.channel.send("HAHA I won!");
			updateScoreBoard(message, 1);
		}else if((pickIndex+1)%3 == humanpick){//human wins
			updateScoreBoard(message, -1);
			message.channel.send("You got lucky this time...");
		}else{
			updateScoreBoard(message, 0);
			message.channel.send("I guess we're evenly matched...");
		}
		return;
	},

	printScoreboard: function (){
		let message = ""; 
		let fileContent = fileSystem.readFileSync(require('path').resolve(__dirname, './scores/scores.txt'), 'utf8');
		let playerArray = fileContent.split("\n");
		
		for(let i = 0; i < playerArray.length; i++) {
			if(playerArray[i].indexOf(",")!=-1){
				let scoreArray = playerArray[i].split(",")
				message += "**" + scoreArray[0] + ":** " + scoreArray[1]+ " wins," + scoreArray[2]+ " ties," + scoreArray[3]+ " loses.\n";
			}
		}
		return message;
	}		
}
//}

//{local Function
function updateScoreBoard(message, result){
	let sender = message.author.username;
	let senderScore = null;
	let fileContent = fileSystem.readFileSync(require('path').resolve(__dirname, './scores/scores.txt'), 'utf8');
	let player = "";
	let found = false;
	
	//reading from file
	//player = fileContent.substring(fileContent.indexOf(sender), fileContent.length);
	let playerArray = fileContent.split("\n");
	fileContent="";
	for(let i = 0; i < playerArray.length; i++) {
		if (playerArray[i].indexOf(sender+",")!=-1){//found player
			player = playerArray[i];
			found = true;
		}
		else{
			fileContent += playerArray[i] + "\n"
		}
	}
	if (!found){
		player = sender + ",0,0,0" + "\n"
		console.log("Made new player named " + sender + ".");
	}

	//updating score
	let scoreline = player.split(',');
	scoreline[2+result] = 1 + parseInt(scoreline[2+result])//2 is the index of tie and result is a number between -1 and 1
	senderScore = scoreline.join(',');
	fileContent += scoreline;
	
	fileSystem.writeFileSync(require('path').resolve(__dirname, './scores/scores.txt'), fileContent);//writing to file
	
	return;
}

//}