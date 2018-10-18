let enemy

// Enemy Constructor

function Enemy(enemyType, hitPoints, strength, agility, intelligence) {
    this.enemyType = enemyType;
    this.hitPoints = hitPoints;
    this.strength = strength;
    this.agility = agility;
    this.intelligence = intelligence;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Enemy Attacks.  Eventually each enemy will have at least 3.

let enemyMoves = {

    attack: function(){                        //30
        var attack = (Math.floor(Math.random() * 30) +1) * enemy.strength;
        return attack;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Generates the attack on the enemy and populates the log.

const combatEnemyLog = document.querySelector(".combat-log-enemy");
let enemyCombatMsg = "";

function enemyStrike() { 
    let enemyAttack = enemyMoves.attack();

    enemyCombatMsg = enemyCombatMsg + "The " + enemy.enemyType + " now attacks you for " + enemyAttack + " hit points of damage.<hr>";
    combatEnemyLog.innerHTML = enemyCombatMsg;
    let newHitPoints = document.querySelector(".player-hit-points").innerHTML = player.hitPoints - enemyAttack; 
    player.hitPoints = newHitPoints;
    let alert = document.querySelector(".alert")
    alert.style.opacity = "1";
    alert.style.transition = "opacity .5s linear";
    alert.innerHTML = "The " + enemy.enemyType + " now attacks you for " + enemyAttack + " hit points of damage."
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Defeated Enemy. 

function enemyDefeat() {
    let alert = document.querySelector(".alert")
    alert.style.opacity = "1";
    alert.style.transition = "opacity .5s linear";
    document.querySelector(".alert").innerHTML = "The " + enemy.enemyType + " has died.";
    let getEnemyHitPoints = document.querySelector(".enemy-hit-points");
    getEnemyHitPoints.innerHTML = 0;
    getAdventures.style.opacity = "1";
    getAdventures.style.transition = "opacity .5s linear";
    getAdventures.innerHTML = '<div><p class="defeated-enemy">You have struck a killing blow and have defeated the ' + enemy.enemyType + '.</p><p>Would you like to continue with your adventure?</p><button class="encounter-btn" id="encounter-btn-yes" onclick="RunGame.postEnemy()">Yes</button></div>'
    combatEnemyLog.style.opacity = "0";
    combatEnemyLog.style.transition = "opacity .5s linear";
    setTimeout(function(){
        enemyCombatMsg = "";
        combatEnemyLog.innerHTML = "";
        combatEnemyLog.style.opacity = "1";
        combatEnemyLog.style.transition = "opacity .5s linear";
    }, 1000)

}
