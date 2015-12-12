var fs = require("fs");
fs.readFile("./index.html","utf8", function(err, data){
	if(err){
		console.log("couldn't read file", err);
		return;
	}

	var ghPagesIndex = data
		.replace("/vendor","./vendor")
		.replace("/app", "./app")
		.replace("/favicon", "./favicon");

	console.log(ghPagesIndex);

	fs.writeFile("./index.html", ghPagesIndex, function(err){
		if(err) {
			console.log("couldn't save file");
		}
	});
})