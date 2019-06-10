
module.exports = {
	reactBelgium : function(message) {
		return null;
		message.react("🖤");
		setTimeout(function () {
			message.react("💛");
		}, 1000);
		setTimeout(function () {
			message.react("❤");
		}, 2000);
	}
}