//{variables
const locations = ["Anarchy", "Dusty", "Fatal", "Flush Factory", "Greasy", "Haunted ♥", "Junk", "Lonely :(", "Loot lake", "'Never' Lucky", "**Moist**y mire", 
					"Pleasant", "Retail", "Risky Reels", "Salty", "Shifty", "SHobby", "Tilted Towers and die", "Tomato / Potato Town", "Wailing"];
//}

//{ fortnite
module.exports = {
	pickLandingLocation : function(message){
		index = Math.floor((Math.random() * locations.length));
		response = "let's land at " + locations[index] + "\nIt'll be fun!!."
		return response;
	},

	wrongSpot : function(message){

		message.channel.send("https://giphy.com/gifs/election2016-donald-trump-election-2016-3oz8xLd9DJq2l2VFtu");
		message.channel.send("\n in that case, " + pickLandingLocation(message));
	},

	nextSpot : function(message){
		message.channel.send("\n ok now, " + pickLandingLocation(message));
	}
}
//}