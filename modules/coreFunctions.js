//{variables
const config 				= require("../config.json");
const ggl_api_key 			= config.google_api_key;
const ggl_cx				= config.google_cx;
const googleResultLinkPt1 	= "https://www.googleapis.com/customsearch/v1?q=";
const googleResultLinkPt2 	= "&cx=" + ggl_cx + "&key=" + ggl_api_key + "&num=1";
const googleUrl				= "https://www.google.com/search?q="

const fetch 				= require('node-fetch');
const botName = "Micro-SoftIce";
const ikBenArray = ["ik ben", "ik was", "ben ik", "was ik", "kben", "kwas", "wask", "benk", "wij zijn", "zijn wij"];
const request = require('request');

//}

//{ functions accesable by anyone
module.exports = {
	
	dagWeg : function(stringMessage){
		var ikBenPlaats = -1;
		var i = 0;
		while (ikBenPlaats === -1) {
			var ikBenPlaats = stringMessage.indexOf(ikBenArray[i]);
			i++;
		}
		ikBenPlaats += ikBenArray[i - 1].length + 1;
		
		return "Dag " + stringMessage.substr(ikBenPlaats) + ", ik ben " + botName + "!";
	},


	reactOracle: function (message) {
		message.react("<:or:407907927043604491");
		setTimeout(function () {
			message.react("<:rik:407907950238105610");
		}, 1000);
		setTimeout(function () {
			message.react("<:el:407907994366378016");
		}, 2000);
	},

	say : function (message, args){
		message.channel.send(args);
		message.delete();
		
		return;
	},

	els : function (message){
		message.channel.send("FUUUUUUT");
		message.delete();
		return;
	}, 

	poll : function (message, args){
		message.channel.send(args)            
			.then(function (message) {
					message.react("✅")
				setTimeout(function () {
					message.react("❔")
				}, 1000);
				setTimeout(function () {
					message.react("❌")
				}, 2000);
				
			}).catch(function() {
			  console.log("Lennert, ge suckt!");
			});
		message.delete();
	},

	search : function (message, keyword){//just add a searchterm to a standard google search url
		if(keyword.length==0){return;}//return if no keword is given
		let keywordArray = keyword.split(" ");
		keyword = keywordArray.join("+");
		message.channel.send(googleUrl + keyword);
		message.delete();
	},

	advancedSearch : async function (message,keyword){// use google api to browse the web
		console.log("response: " + keyword); 
		if(keyword.length==0){return;}//return if no keword is given
		let jsonResult = "";
		let keywordArray = keyword.split(" ");
		keyword = keywordArray.join("+");
		keyword = keyword.split("\"").join("");

		jsonResult = await fetch(googleResultLinkPt1 + keyword + googleResultLinkPt2)
												.then(r => r.text())
												.then(body => decodeURIComponent(body));//if entire file is read in using node fetch put text in variable
		jsonResult = JSON.parse(jsonResult);
		//console.log(jsonResult); 
		//let itemstring = JSON.stringify(jsonResult['items'])[0];
		let url = JSON.stringify(jsonResult['items'][0]["link"]);
		let description = JSON.stringify(jsonResult['items'][0]["snippet"]);
		description = description.split('\\n').join('');
		
	
		message.channel.send('<' + url.substring(1,url.length-1) + '>');
		message.channel.send("```" + description.substring(1,description.length-1) + "```");
		//message.delete();
	}
}
//}
