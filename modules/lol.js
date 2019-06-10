const lolNameArray 	= ["Sazou bèta", "MicroIce0k", "Gold3n TURTL3"];
const runePage		= "https://champion.gg/champion/"
const webshot 		= require('webshot');
const region		= {captureSelector: '.o-wrap'};
const region2		= {captureSelector: '.skill-order'};
const region3		= {captureSelector: '.build-wrapper'};


const request = require('request');


module.exports = {
		leagueRankLookUp : function (message,name){
		if(name.toLowerCase()=="sara"){
			name = lolNameArray[0];
		}else if(name.toLowerCase()=="lennert"){
			name = lolNameArray[1];
		}else if(name.toLowerCase()=="michaël" || name.toLowerCase()=="michael"){
			name = lolNameArray[2]
		}else if( name.toLowerCase()== "all"){
			for (let i = 0; i < lolNameArray.length; i++){
				name = lolNameArray[i].split(" ").join("+");
				message.channel.send("<https://euw.op.gg/summoner/userName=" + name  + ">");
			}
			message.delete();
			return;
		}
		
		name = name.split(" ").join("+");
		message.channel.send("<https://euw.op.gg/summoner/userName=" + name + ">");
		message.delete();
	},

	runeLookUp : function(message, championName){
		championName= championName.split(' ').slice(1).join('');
		message.channel.send(runePage + championName);
		
		webshot(runePage + championName, "./images/runePage.png", region, 
			function(err){
				if(!err){
					message.channel.send({
						files: ['./images/runePage.png']
					});
				}else{
					console.log("lennert ge sucked, also:" + err);
				}
			});
	},
	
	skillOrder : function(message, championName){
		championName= championName.split(' ').slice(1).join('');
		message.channel.send("<" + runePage + championName + ">")
		
		webshot(runePage + championName, 
			"./images/skillorder.png",
			region2, function(err){
				if(!err){
					message.channel.send({
						files: ['./images/skillorder.png']
					});
				}else{
					console.log("lennert ge sucked, also:" + err);
				}
			});
	},
	
	buildOrder : function(message, championName){
		championName= championName.split(' ').slice(1).join('');
		message.channel.send("<" + runePage + championName + ">")
		
		webshot(runePage + championName, "./images/buildorder.png",
			region3, function(err){
				if(!err){
					message.channel.send({
						files: ['./images/buildorder.png']
					});
				}else{
					console.log("lennert ge sucked, also:" + err);
				}
			});
	}
	
}