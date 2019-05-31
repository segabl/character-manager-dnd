const WebSocketServer = require("websocket").server;
const http = require("http");

const server = http.createServer(function (request, response) {
  console.log("Received request for " + request.url);
  response.writeHead(404);
  response.end();
});
server.listen(8080, function () {
  console.log("Server is listening on port 8080");
});

wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

wsServer.on("request", function (request) {
  if (!originIsAllowed(request.origin)) {
    request.reject();
    console.log("Connection from origin " + request.origin + " rejected.");
    return;
  }

  const connection = request.accept("echo-protocol", request.origin);
  connection.sendUTF("Hello World!");

  console.log("Connection from origin " + request.origin + " accepted.");
  connection.on("message", function (message) {
    if (message.type === "utf8") {
      console.log("Received Message: " + message.utf8Data);
    } else if (message.type === "binary") {
      console.log("Received Binary Message of " + message.binaryData.length + " bytes");
    }
  });
  connection.on("close", function (reasonCode, description) {
    console.log("Peer " + connection.remoteAddress + " disconnected.");
  });
});