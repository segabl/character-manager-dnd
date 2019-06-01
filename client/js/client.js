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
  jQuery.each(data.skills, function(k, v) {
    let element = $("#skill_" + k);
    element.html(v.proficient ? v.value + data.stats.proficiency_bonus : v.value);
    if (v.proficient) {
      element.addClass("text-success");
    }
  });
  jQuery.each(data.modifiers, function(k, v) {
    let element = $("#modifier_" + k);
    element.html(v.proficient ? v.value + " (" + (v.value + data.stats.proficiency_bonus) + ")" : v.value);
    if (v.proficient) {
      element.addClass("text-success");
    }
  });
  jQuery.each(data.inventory, function(k, v) {
    $("#inventory").append("<div class=\"col\"><strong class=\"text-nowrap\">" + v.name + "</strong>&nbsp;<small>x" + v.count + "</small></div>");
  })
}

function switchView(navId, viewId) {
  const viewContainerList = document.getElementsByClassName("container");
  for(let i = 0; i < viewContainerList.length; i++){
      viewContainerList[i].style.display = "none";
  }

  const navLinks = document.getElementsByClassName("nav-link");
  for(let j = 0; j < navLinks.length; j++) {
    navLinks[j].classList.remove("active");
  }

  const viewContainer = document.getElementById(viewId);
  viewContainer.style.display = "block";
  const navElement = document.getElementById(navId);
  navElement.classList.add("active");
}

function addTopPlayer() {
  const topRow = document.getElementById("playerTopRow");
  addPlayerHorizontal(topRow);
}

function addLeftPlayer() {
  const leftCol = document.getElementById("playerLeftCol");
  addPlayerVertical(leftCol);
}

function addRightPlayer() {
  const rightCol = document.getElementById("playerRightCol");
  addPlayerVertical(rightCol);
}

function addPlayerHorizontal(row) {
  const playerCol = createCol();
  row.appendChild(playerCol);
  addPlayer(playerCol);
}

function addPlayerVertical(col) {
  const row = createRow();
  col.appendChild(row);

  const playerCol = createCol();
  row.appendChild(playerCol);
  addPlayer(playerCol);
}

function addPlayer(playerCol) {
  const playerNameRow = createRow();
  playerCol.appendChild(playerNameRow);

  const playerNameCol = createCol();;
  playerNameCol.innerHTML = "TestName";
  playerNameRow.appendChild(playerNameCol);

  const statNamesRow = createRow();
  playerCol.appendChild(statNamesRow);

  const ac = createCol();
  ac.innerHTML = "AC";
  statNamesRow.appendChild(ac);

  const hp = createCol();
  hp.innerHTML = "HP";
  statNamesRow.appendChild(hp);

  const init = createCol();
  init.innerHTML = "INIT";
  statNamesRow.appendChild(init);

  const statsRow = createRow();
  playerCol.appendChild(statsRow);

  const acValue = createCol();
  acValue.innerHTML = "0";
  statsRow.appendChild(acValue);

  const hpValue = createCol();
  hpValue.innerHTML = "0";
  statsRow.appendChild(hpValue);

  const initValue = createCol();
  initValue.innerHTML = "0";
  statsRow.appendChild(initValue);
}

function createCol() {
  const col = document.createElement("div");
  col.setAttribute("class", "col");
  return col;
}

function createRow() {
  const row = document.createElement("div");
  row.setAttribute("class", "row py-1 mb-2 text-center text-light");
  return row;
}