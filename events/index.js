var http = require("http");

var server = http.createServer(function(req, res) {
	res.writeHead(200, {
		"Content-Type": "text/plain"
	});
	res.end("Hello Woooooorld\n");
}).listen(3000, "127.0.0.1");
console.log("Server running at http://127.0.0.1:3000");

server.on("connection", function() {
	console.log("client connected!");
});

server.on("request", function() {
  console.log("client request!");
});

