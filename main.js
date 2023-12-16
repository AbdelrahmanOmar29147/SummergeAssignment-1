let levelNum = 1;
let highscore;
localStorage.getItem("highscore")
  ? (highscore = localStorage.getItem("highscore"))
  : (highscore = 0);

function initialize() {
  document.getElementById("level").innerHTML = levelNum;
  document.getElementById("highscore").innerHTML = highscore;
  document.getElementById("narration").innerHTML =
    "<button id='gameButton' class='btn' onclick='startGame()'>Start Game</button>";
  document.getElementById("left").innerHTML = "";
  document.getElementById("right").innerHTML = "";
}

function startGame() {
  levelNum = 1;
  document.getElementById("level").innerHTML = levelNum;
  document.getElementById("highscore").innerHTML = highscore;
  layImages();
}

function clearImages() {
  const left = document.getElementById("left");
  const right = document.getElementById("right");

  while (left.firstChild) {
    left.removeChild(left.firstChild);
  }
  while (right.firstChild) {
    right.removeChild(right.firstChild);
  }
}

function createImages(direction, index) {
  let image = document.createElement("i");
  image.classList.add("fi");
  image.classList.add("fi-rr-flower");
  image.setAttribute("id", direction + "-node-" + index);
  document.getElementById(direction).appendChild(image);
  if (direction === "right") {
    image.setAttribute("onclick", "wrongClick()");
  }
}

function createTarget() {
  let target = document.createElement("i");
  target.classList.add("fi");
  target.classList.add("fi-rr-flower");
  target.setAttribute("id", "target");
  target.setAttribute("onclick", "targetClick()");
  document.getElementById("right").appendChild(target);
}

function layImages() {
  clearImages();

  document.getElementById("narration").innerHTML =
    "Click the image on the right that has no pair on the left. <button onclick='hint()' class='btn next-btn'>Hint?</button>";
  document.getElementById("level").innerHTML = levelNum;

  for (var i = 0; i < levelNum; i++) {
    let x = Math.random() * 92.5;
    let y = Math.random() * 92.5;

    createImages("left", i);
    createImages("right", i);

    document.getElementById("left-node-" + i).style.left = x + "%";
    document.getElementById("left-node-" + i).style.top = y + "%";
    document.getElementById("left-node-" + i).style.position = "absolute";

    document.getElementById("right-node-" + i).style.left = x + "%";
    document.getElementById("right-node-" + i).style.top = y + "%";
    document.getElementById("right-node-" + i).style.position = "absolute";
  }

  createTarget();
  document.getElementById("target").style.left = Math.random() * 90 + "%";
  document.getElementById("target").style.top = Math.random() * 90 + "%";
  document.getElementById("target").style.position = "absolute";
}

function wrongClick() {
  document.getElementById("narration").innerHTML =
    "Wrong one! Game over. <button onclick='initialize()' class='btn next-btn'>Start Over</button>";

  //sets high score
  if (levelNum > highscore) {
    highscore = levelNum - 1;
    localStorage.setItem("highscore", highscore);
  }
  document.getElementById("highscore").innerHTML = highscore;
}

function targetClick() {
  levelNum++;
  document.getElementById("narration").innerHTML =
    "Good job! <button onclick='layImages()' class='btn next-btn'>Next Level</button>";
}

function hint() {
  document.getElementById("target").style.color = "#57c0e9";
}
