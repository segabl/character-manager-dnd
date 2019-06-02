let characters = [];
let myCharId = 0;

function connectToServer() {
  if ("WebSocket" in window) {
    const socket = new WebSocket("ws://127.0.0.1:8080", "echo-protocol");
    socket.onopen = function () {
      console.log("socket is open");
      socket.send(JSON.stringify({
        id: "requestCharacter",
        data: { "id": myCharId }
      }))
    };
    socket.onmessage = function (message) {
      console.log("Got message: " + message.data);
      const msg = JSON.parse(message.data);
      handleMessage(msg.id, msg.data);
    };
    socket.onclose = function () {
      console.log("Socket closed");
    };
    return true;
  } else {
    return false;
  }
}

function handleMessage(msgId, msgData) {
  switch (msgId) {
    case "character":
      updateCharacter(msgData);
      break;
  }
}

function updateCharacter(data) {
  characters[data.id] = data;
  if (data.id !== myCharId) {
    return;
  }
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
  $("#inventory_pp").html(data.money.platinum);
  $("#inventory_gp").html(data.money.gold);
  $("#inventory_ep").html(data.money.electrum);
  $("#inventory_sp").html(data.money.silver);
  $("#inventory_cp").html(data.money.copper);
  jQuery.each(data.inventory, function(k, v) {
    $("#inventory").append("<div class=\"col-lg-2 col-sm-4 col-6\"><strong class=\"text-nowrap\">" + v.name + "</strong>&nbsp;<small>x" + v.count + "</small></div>");
  })
}

function switchView(navId, viewId) {
  const viewContainerList = $(".container");
  for(let i = 0; i < viewContainerList.length; i++){
      viewContainerList[i].style.display = "none";
  }

  const navLinks = $(".nav-link");
  for(let j = 0; j < navLinks.length; j++) {
    navLinks[j].classList.remove("active");
  }

  const viewContainer = $("#"+viewId)[0];
  viewContainer.style.display = "block";
  const navElement = $("#"+navId)[0];
  navElement.classList.add("active");
}

function addTopPlayer() {
  const topRow = $("#playerTopRow")[0];
  addPlayerHorizontal(topRow);
}

function delTopPlayer() {
  const row = $("#playerTopRow")[0];
  delPlayer(row);
}

function addLeftPlayer() {
  const leftCol = $("#playerLeftCol")[0];
  addPlayerVertical(leftCol);
}

function delLeftPlayer() {
  const col = $("#playerLeftCol")[0];
  delPlayer(col);
}

function addRightPlayer() {
  const rightCol = $("#playerRightCol")[0];
  addPlayerVertical(rightCol);
}

function delRightPlayer() {
  const col = $("#playerRightCol")[0];
  delPlayer(col);
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

  const playerNameCol = createCol();
  const playerSelect = createSelect();
  playerNameCol.appendChild(playerSelect);
  playerNameRow.appendChild(playerNameCol);

  //AC
  const acRow = createRow();
  playerCol.appendChild(acRow);

  const ac = createCol();
  ac.innerHTML = "AC";
  acRow.appendChild(ac);

  const acValue = createCol();
  acValue.innerHTML = "0";
  acRow.appendChild(acValue);

  //HP
  const hpRow = createRow();
  playerCol.appendChild(hpRow);

  const hp = createCol();
  hp.innerHTML = "HP";
  hpRow.appendChild(hp);

  const hpValue = createCol();
  hpValue.innerHTML = "0";
  hpRow.appendChild(hpValue);

  //INIT
  const initRow = createRow();
  playerCol.appendChild(initRow);

  const init = createCol();
  init.innerHTML = "INIT";
  initRow.appendChild(init);

  const initValue = createCol();
  const initInput = document.createElement("input");
  initInput.type = "text";
  initInput.size = "1";
  initValue.appendChild(initInput);
  initRow.appendChild(initValue);
}

function delPlayer(el) {
  if(!el.hasChildNodes()) {
    return;
  }
  el.removeChild(el.lastChild);
}

function createCol() {
  const col = document.createElement("div");
  col.setAttribute("class", "col-auto");
  return col;
}

function createRow() {
  const row = document.createElement("div");
  row.setAttribute("class", "row py-1 mb-2 text-center text-light");
  return row;
}

function createSelect() {
  const select = document.createElement("select");

  const option1 = document.createElement("option");
  option1.value = "Player 1";
  option1.text = "Player 1";
  const option2 = document.createElement("option");
  option2.value = "Player 2";
  option2.text = "Player 2";
  const option3 = document.createElement("option");
  option3.value = "Player 3";
  option3.text = "Player 3";
  const option4 = document.createElement("option");
  option4.value = "Player 4";
  option4.text = "Player 4";
  const option5 = document.createElement("option");
  option5.value = "Player 5";
  option5.text = "Player 5";
  const option6 = document.createElement("option");
  option6.value = "Player 6";
  option6.text = "Player 6";
  const option7 = document.createElement("option");
  option7.value = "Player 7";
  option7.text = "Player 7";

  select.appendChild(option1);
  select.appendChild(option2);
  select.appendChild(option3);
  select.appendChild(option4);
  select.appendChild(option5);
  select.appendChild(option6);
  select.appendChild(option7);

  return select;
}