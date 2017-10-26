var startBtn = document.getElementById("startButton");
var everything = document.getElementById("entireGame");

startBtn.onclick = function () {
    startBtn.style.display = "none";
    everything.className = "visibleGame";
    startGame();
}

function startGame() {
    var usr = {
        name: "",
        health: 40,
        healCount: 0,
        wins: 0
    }
    usr.attack = function () {
        this.health -= Math.floor(Math.random() * 5) + 1;
    }
    usr.heal = function () {
        this.health += Math.floor(Math.random() * 10) + 1;
        this.healCount++;
    }

    var computer = {
        name: "Almighty Grant",
        health: 10,
        lives: 5
    }

    computer.attack = function () {
        this.health -= Math.floor(Math.random() * 3) + 1;
    }

    var attackBtn = document.getElementById("attackButton");
    attackBtn.onclick = function () {
        attack(usr, computer);
    }

    var healBtn = document.getElementById("healButton");
    healBtn.onclick = function () {
        regenerate(usr, computer);
    }

    var forfeitBtn = document.getElementById("forfeitButton");
    forfeitBtn.onclick = function () {
        document.getElementById("gameStatusLine").innerHTML = "You quit, therefore you lose!";
        forfeit();
    }

    usr.name = prompt("What's your name?");
    document.getElementById("playerName").innerHTML = usr.name;
    document.getElementById("computerName").innerHTML = computer.name;

    var statusUpdates = usr.name + " has " + usr.health + " health left. "
        + computer.name + " has " + computer.health + " health left.";
    document.getElementById("gameStatusLine").innerHTML = statusUpdates;
}

function attack(combatUsr, combatComputer) {
    combatUsr.attack();
    combatComputer.attack();
    updateProgress(combatUsr, combatComputer);
    checkWinLose(combatUsr, combatComputer);
}

function regenerate(healUsr, healComputer) {
    healUsr.heal();
    updateProgress(healUsr, healComputer);
    checkWinLose(healUsr, healComputer);
    if (healUsr.healCount === 2) {
        document.getElementById("healButton").setAttribute("disabled", true);
    }
}

function checkWinLose(cwlUsr, cwlComputer) {
    if (cwlComputer.health < 1 && cwlComputer.lives > 0) {
        cwlComputer.health = 10;
        cwlComputer.lives--;
        cwlUsr.wins++;
    }
    if (cwlComputer.lives === 0) {
        document.getElementById("gameStatusLine").innerHTML = cwlComputer.name + " is out of lives! " + cwlUsr.name + " wins!";
        forfeit();
    } else if (cwlUsr.health < 1) {
        document.getElementById("gameStatusLine").innerHTML = cwlUsr.name + " is out of health! " + cwlComputer.name + " wins!";
        forfeit();
    }
}

function updateProgress(progUsr, progComputer) {
    document.getElementById("playerHealth").value = progUsr.health;
    document.getElementById("playerHealCount").value = progUsr.healCount;
    document.getElementById("playerWins").value = progUsr.wins;
    document.getElementById("computerHealth").value = progComputer.health;
    var statusUpdates = progUsr.name + " has " + progUsr.health + " health left. "
        + progComputer.name + " has " + progComputer.health + " health left.";
    document.getElementById("gameStatusLine").innerHTML = statusUpdates;
}

function forfeit() {
    document.getElementById("attackButton").setAttribute("disabled", true);
    document.getElementById("healButton").setAttribute("disabled", true);
    document.getElementById("forfeitButton").setAttribute("disabled", true);
}