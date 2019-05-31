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

function switchView(navId, viewId) {
  var viewContainerList = document.getElementsByClassName("container");
  for(var i = 0; i < viewContainerList.length; i++){
      viewContainerList[i].style.visibility = "hidden";
  }

  var navLinks = document.getElementsByClassName("nav-link");
  for(var j = 0; j < navLinks.length; j++) {
    navLinks[j].classList.remove("active");
  }

  var viewContainer = document.getElementById(viewId);
  viewContainer.style.visibility = "visible";
  var navElement = document.getElementById(navId);
  navElement.classList.add("active");
}