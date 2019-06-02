const WebSocketServer = require("websocket").server;
const http = require("http");
const fs = require("fs");

const character_template = JSON.parse(fs.readFileSync("characters/template.json"));

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

function handleMessage(client, msgId, msgData) {
  switch (msgId) {
    case "requestCharacter":
      client.sendUTF(JSON.stringify({
        id: "character",
        data: character_template // TODO: should be something like characters[msgData.id]
      }));
      break;
  }
}

wsServer.on("request", function (request) {
  if (!originIsAllowed(request.origin)) {
    request.reject();
    console.log("Connection from origin " + request.origin + " rejected.");
    return;
  }

  console.log("Connection from origin " + request.origin + " accepted.");
  const client = request.accept("echo-protocol", request.origin);
  client.on("message", function (message) {
    if (message.type === "utf8") {
      console.log("Received Message: " + message.utf8Data);
      const msg = JSON.parse(message.utf8Data);
      handleMessage(client, msg.id, msg.data)
    } else if (message.type === "binary") {
      console.log("Received Binary Message of " + message.binaryData.length + " bytes");
    }
  });
  client.on("close", function (reasonCode, description) {
    console.log("Peer " + client.remoteAddress + " disconnected.");
  });
});