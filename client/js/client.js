function connectToServer() {
  if ("WebSocket" in window) {
    const socket = new WebSocket("ws://127.0.0.1:8080", "echo-protocol");
    socket.onopen = function () {
      console.log("socket is open");
    };
    socket.onmessage = function (message) {
      console.log("Got message: " + message.data);
    };
    socket.onclose = function () {
      console.log("Socket closed");
    };
    return true;
  } else {
    return false;
  }
}