//{variables
const config 			= require("../config.json");
const ytDownloader 		= require("ytdl-core");
const request 			= require("request");
const fileSystem 		= require("fs")
const youTubeId 		= require("get-youtube-id");
const videoInfo 		= require("youtube-info");
const yt_api_key 		= config.api_key;

var queue = [];
var isPlaying = false;
var dispatcher = null;
var voiceChannel = null;
//}

//{ exports  
module.exports = {
	processPlayComand: function(message, args, voiceChannel1) {
		return null;
		voiceChannel =  voiceChannel1;
		message.reply("This feature is currently offline, I'm sorry for the inconvenience");
		if (queue.length > 0 || isPlaying) {
			getID(args, function (id) {
				queue.push(id);
				videoInfo(id, function (err, videoInfo) {
					if (err) throw new Error(err);

					message.reply("**" + videoInfo.title + "** is added to the queue!");
				});

			});
		} else {    
			isPlaying = true;
			getID(args, function (id) {
				queue.push("windows booting up sound")
				playMusic(id, message);
				videoInfo(id, function (err, videoInfo) {
					if (err) throw new Error(err);

					message.reply("**" + videoInfo.title + "** is added to the queue!");
				});
			});
		}
	},
					
	processStopComand: function (message, voiceChannel1){
		voiceChannel =  voiceChannel1;
		message.reply("This feature is currently offline, I'm sorry for the inconvenience");
		while (queue.length > 0) {
			queue.shift();
		}

		queue = [];
		isPlaying = false;
		voiceChannel.leave();
	},

	processCueComand: function(message, voiceChannel1){
		voiceChannel =  voiceChannel1;
		message.reply("This feature is currently offline, I'm sorry for the inconvenience");
		var response = "";
		for ( var i = 1; i < queue.length; i++){
			response += "https://www.youtube.com/watch?v="+queue[i] + "\n";
		}
		message.channel.send("```The current queue is:```\n" + response);
	},

	processSkipComand: function(message, voiceChannel1){
		voiceChannel =  voiceChannel1;
		message.reply("This feature is currently offline, I'm sorry for the inconvenience");
		skipSong(message);
		message.reply("skipped the current song! :(");
	}		
}	
//}

//{local methods
function getID(string, cb) {
    if (string.indexOf("youtube.com") !== -1) {
        cb(youTubeId(string));
    } else {
        searchVid(string, function(id) {
            cb(id);
        });
    }
}

//copypasted magic
function searchVid(query, callback) {
	console.log(query);

    request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + yt_api_key, function (error, response, body) {
			console.log(JSON.parse(body));
        var json = JSON.parse(body);
        callback(json.items[0].id.videoId);
    });
}

function skipSong(message) {
	dispatcher.end();
    if (queue.length < 1) {
		playMusic(queue[0], message);
    } else {
        isPlaying = false;
		queue = [];
    }
}

function playMusic(id, message) {
    voiceChannel = message.member.voiceChannel;
    voiceChannel.join().then(function (connection) {
        link = ytDownloader("https://www.youtube.com/watch?v=" + id, {
            filter: 'audioonly'
        });

        dispatcher = connection.playStream(link);
        dispatcher.on('end', function () {
            queue.shift();
            if (queue.length === 0) {
                queue = [];
                isPlaying = false;
				voiceChannel.leave();
				
            } else {
                playMusic(queue[0], message);
            }

        });
    });
}
//}
