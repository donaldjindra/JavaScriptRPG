let player

// Player Constructor

function Player(classType, race, gender, hitPoints, strength, agility, intelligence) {
    this.classType = classType;
    this.race = race;
    this.gender = gender;
    this.hitPoints = hitPoints;
    this.strength = strength;
    this.agility = agility;
    this.intelligence = intelligence;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Player Attacks.  Eventually each character will have at least 3.

let playerMoves = {

    //Warrior's attack
    warriorSwordSwing: function() {            //25 
        let attack = (Math.floor(Math.random() * 45) +1) * player.strength ;
        return attack;
    },

    //Mage's attack
    mageCastFireball: function(){              //35
        let attack = (Math.floor(Math.random() * 60) +1) * player.intelligence ;
        return attack;
    },

    //Rogue's attack
    rogueStab: function(){                     //30
        let attack = (Math.floor(Math.random() * 50) +1) * player.agility ;
        return attack;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Functions used in the actual combat.  Generates the attack message too.

function warriorFight() {
    const warriorSwingSword = playerMoves.warriorSwordSwing();
    let attackName = "Swing Sword"
    combatMessage(attackName, warriorSwingSword)
}


function mageFight() {
    const mageCastFireball = playerMoves.mageCastFireball();
    let attackName = "Cast Fireball"
    combatMessage(attackName, mageCastFireball)
}


function rogueFight() {
    const rogueStab = playerMoves.rogueStab();
    let attackName = "Stab"
    combatMessage(attackName, rogueStab)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Generates the attack on the enemy and populates the log.

const combatPlayerLog = document.querySelector(".combat-log-player");
let playerCombatMsg = "";


function combatMessage(attackName, attack) {

    playerCombatMsg = playerCombatMsg + "You have attacked the " + enemy.enemyType + " with " + attackName + " for " + attack + " hit points of damage.<hr>";
    combatPlayerLog.innerHTML = playerCombatMsg;
    const newEnemyHP =  document.querySelector(".enemy-hit-points").innerHTML = enemy.hitPoints - attack;
    enemy.hitPoints = newEnemyHP;
    alert.style.display = "block";
    alert.style.opacity="1";
    alert.style.transition = "opacity .5s linear";
    document.querySelector(".alert").innerHTML = "You have attacked the " + enemy.enemyType + " with " + attackName + " for " + attack + " hit points of damage."
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Attack Back Button.

function attackBack() {
    getAdventures.style.opacity = "1";
    getAdventures.style.transition = "opacity .5s linear";
    getAdventures.innerHTML = '<div><p>Attack Back?</p><button class="encounter-btn" id="encounter-btn-yes" onclick="RunGame.secondAttack()">Yes</button></div>'
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Defeated Player. 

function playerDefeat() {
    alert.style.opacity = "1";
    alert.style.transition = "opacity .5s linear";
    alert.innerHTML = "You have been defeated";
    getAdventures.style.opacity = "1";
    getAdventures.style.transition = "opacity .5s linear";
    document.querySelector(".player-hit-points").innerHTML = 0;
    getAdventures.innerHTML = '<div class="action"><p><span class="defeated-enemy">You have died.</span><br> Please refresh the browser to continue.</div>';
    combatPlayerLog.style.opacity = "0";
    combatPlayerLog.style.transition = "opacity .5s linear";
    setTimeout(function () {
        playerCombatMsg = "";
        combatPlayerLog.innerHTML = "";
        combatPlayerLog.style.opacity = "1";
        combatPlayerLog.style.transition = "opacity .5s linear";
    }, 1000)
}
