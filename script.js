startGame();

function startGame() {
    var game = prompt("Do you want to play?");

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

    if (game.toLowerCase() === "yes") {
        usr.name = prompt("What's your name?");

        var continueGame = true;
        do {
            var choice = prompt("Would you like to attack, heal (limit 2), or forfeit?");
            if (choice.toLowerCase() === "attack") {
                attack(usr, computer);
            } else if (choice.toLowerCase() === "heal") {
                if (usr.healCount < 2) {
                    regenerate(usr);
                } else {
                    console.log("You're out of healing power!")
                }
            } else if (choice.toLowerCase() === "forfeit") {
                continueGame = false;
                break;
            }
            console.log(computer.name + " has " + computer.health + " health left.");
            console.log(usr.name + " has " + usr.health + " health left.");

            continueGame = checkWinLose(usr, computer);

        } while (continueGame);

        console.log("Game Over!");
        console.log(usr.name + " has " + usr.wins + " wins.");
        console.log(computer.name + " has " + computer.lives + " lives left.");
        if (usr.wins === 5 && computer.lives <= 0) {
            console.log(usr.name + " wins!");
        } else {
            console.log(computer.name + " wins!");
        }

    } else {
        console.log("Ok...maybe next time.");
    }
}

function attack(combatUsr, combatComputer) {
    combatUsr.attack();
    combatComputer.attack();
}

function regenerate(healUsr) {
    healUsr.heal();
}

function checkWinLose(cwlUsr, cwlComputer) {
    if (cwlComputer.health < 1 && cwlComputer.lives > 0) {
        cwlComputer.health = 10;
        cwlComputer.lives--;
        cwlUsr.wins++;
        console.log("DING! DING! DING!");
    }
    if (cwlComputer.lives === 0) {
        return false;
    } else if (cwlUsr.health < 1) {
        return false;
    }
    return true;
}