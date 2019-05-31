function connectToServer() {
  if ("WebSocket" in window) {
    const socket = new WebSocket("ws://127.0.0.1:8080", "echo-protocol");
    socket.onopen = function () {
      console.log("socket is open");
    };
    socket.onmessage = function (message) {
      console.log("Got message: " + message.data);
      const msg_data = JSON.parse(message.data);
      handleMessage(msg_data.id, msg_data.payload);
    };
    socket.onclose = function () {
      console.log("Socket closed");
    };
    return true;
  } else {
    return false;
  }
}

function handleMessage(id, payload) {
  switch (id) {
    case "character":
      updateCharacter(payload);
      break;
  }
}

function updateCharacter(data) {
  $("#name").html(data.name);
  $("#class").html(data.class);
  $("#level").html(data.level);
  $("#hp").html(data.hp + "/" + data.max_hp);
  $("#exp").html(data.exp);
  jQuery.each(data.stats, function(k, v) {
    $("#stat_" + k).html(v);
  });
  let proficiency_bonus = data.stats.proficiency_bonus;
  jQuery.each(data.skills, function(k, v) {
    let element = $("#skill_" + k);
    element.html(v.proficient ? v.value + proficiency_bonus : v.value);
    if (v.proficient) {
      element.addClass("text-success");
    }
  });
  jQuery.each(data.modifiers, function(k, v) {
    let element = $("#modifier_" + k);
    element.html(v.proficient ? v.value + " (" + (v.value + proficiency_bonus) + ")" : v.value);
    if (v.proficient) {
      element.addClass("text-success");
    }
  });
}

function switchView(navId, viewId) {
  const viewContainerList = document.getElementsByClassName("container");
  for(let i = 0; i < viewContainerList.length; i++){
      viewContainerList[i].style.visibility = "hidden";
  }

  const navLinks = document.getElementsByClassName("nav-link");
  for(let j = 0; j < navLinks.length; j++) {
    navLinks[j].classList.remove("active");
  }

  const viewContainer = document.getElementById(viewId);
  viewContainer.style.visibility = "visible";
  const navElement = document.getElementById(navId);
  navElement.classList.add("active");
}