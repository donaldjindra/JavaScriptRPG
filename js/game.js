let RunGame = {
    initGame: function(classType) {
        this.createPlayer(classType);
        this.createAdventure();
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Creates the player character based off of the Player Constructor. 

    createPlayer: function(classType) {
        switch(classType) {
            case "Warrior":
                player = new Player(classType, "Human", "Male", 2500, 20, 15, 10)
            break;

            case "Mage":
                player = new Player(classType, "Elf", "Female", 1250, 10, 12, 20)
            break;

            case "Rogue":
                player = new Player(classType, "Elf", "Male", 1750, 12, 20, 13)
            break;
        }

        // Replaces the character creation in the interface with a div populated with all of the information about that character.

        let selectHeader = document.querySelector("h1");
        selectHeader.style.display="none";
        let getInterface = document.querySelector(".interface");
        getInterface.innerHTML = '<div class="avatar-wrapper"><h3>' + classType + '</h3><div class="full-avatar"><div class="full-avatar-sides full-avatar-front"><img src="img/' + classType.toLowerCase() + '.jpg" alt=" ' + classType + ' " class="img-avatar"></img></div><div class="full-avatar-sides full-avatar-back"><div class="full-avatar-back-stats"><span class="no-break">Hit Points: ' + player.hitPoints + '</span> Strength: ' + player.strength + ' Agility: ' + player.agility + ' Intelligence: ' + player.intelligence + '</div></div></div><div class="character-info"><p> Race: ' + player.race + ' </p><p>Gender: ' + player.gender + ' </p><p>Hit Points: <span class="player-hit-points">' + player.hitPoints + '</span></p><p>Strength: ' + player.strength + '</p><p>Agility: ' + player.agility + ' </p><p>Intelligence: ' + player.intelligence + '</p></div></div> ';

        RunGame.characterInfoDisappear();

    }, 

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Code to hide the character-info div on mouseenter when the character images spins through css animations.

    characterInfoDisappear: function() {   
        var charInfo = document.querySelector(".character-info");
        var fullAvatarFront = document.querySelector(".full-avatar-front");
        var fullAvatarBack = document.querySelector(".full-avatar-back");
        var adventureLog = document.querySelector(".adventure-log");

        fullAvatarFront.addEventListener("mouseenter", vanish)
        function vanish(){
            charInfo.style.opacity="0";
            charInfo.style.transition="opacity .5s linear";
        }

        fullAvatarBack.addEventListener("mouseleave", comeBack);
        adventureLog.addEventListener("mouseenter", comeBack);
        charInfo.addEventListener("mouseenter", comeBack);

        function comeBack(){
            charInfo.style.opacity ="1"
            charInfo.style.transition = "opacity 1s linear";
        }
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Creates an enemy and randomly assigns one to the combat battle.

    createEnemy: function(){
        let enemy00 = new Enemy("Orc", 1500, 15, 13, 8);
        let enemy01 = new Enemy("Wraith", 2000, 14, 10, 15);
        let enemy02 = new Enemy("Harpy", 2500, 14, 10, 15);
        let randomEnemy = Math.floor(Math.random() * Math.floor(3));

        switch(randomEnemy) {
            case 0: 
                enemy = enemy00;
            break;

            case 1: 
                enemy = enemy01;
            break;

            case 2: 
            enemy = enemy02;
        break;
        }
    },
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Creates the player attack based on character class.
    
    playerAttack: function(){

        let playerClass = player.classType;
        if (playerClass == "Warrior") {
            warriorFight()
        } else if(playerClass == "Rogue") {
            rogueFight()
        } else if(playerClass == "Mage") {
            mageFight()
        }
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Creates the intoduction to the adventure section of the game.

    createAdventure: function() {
        getCharacterSelect = document.querySelector(".select");
        getCharacterSelect.style.display="none";
        getAdventures = document.querySelector(".adventure-log");
        getAdventures.style.opacity = "1";
        getAdventures.style.transition = "opacity .5s linear";
        getAdventures.innerHTML = '<div class="action">Lets go on an adventure.<br><a href="#" class="adventure" onclick="RunGame.startAdventure()"> Hit The Road!</a></div>';
    },

    //First question at a the door.

    startAdventure: function() {
        getAdventures = document.querySelector(".adventure-log");
        getAdventures.style.opacity = "1";
        getAdventures.style.transition = "opacity .5s linear";
        getAdventures.innerHTML = '<div class="action"><p>And we are off!</p><p>You come to a door, would you like to go in?</p><button class="encounter-btn" id="encounter-btn-yes" onclick="RunGame.encounterYes()">Yes</button><button class="encounter-btn" id="encounter-btn-no" onclick="RunGame.encounterNo()">No</button></div>';
    },

    //Player gets first attack against enemy.

    encounterYes: function() {
        getAdventures = document.querySelector(".adventure-log");
        getAdventures.style.opacity = "1";
        getAdventures.style.transition = "opacity .5s linear";
        getAdventures.innerHTML = '<div><p>You have encountered an enemy!</p><p>Would you like to attack?</p><button class="encounter-btn" id="encounter-btn-yes" onclick="RunGame.enemyFight()">Yes</button><button class="encounter-btn" id="encounter-btn-no" onclick="RunGame.encounterEnemyAttacksFirst()">No</button></div>'

    },
    
    //Player says no to encounter but is prompted with another chance to play game.

    encounterNo: function() {
        getAdventures = document.querySelector(".adventure-log");
        getAdventures.style.opacity = "1";
        getAdventures.style.transition = "opacity .5s linear";
        getAdventures.innerHTML = '<div class="action"><p>Are you sure, there is not much else to in this game yet!</p><button class="encounter-btn" id="encounter-btn-yes" onclick="RunGame.encounterEnd() ">Yes</button><button class="encounter-btn" id="encounter-btn-no" onclick="RunGame.encounterYes()">No</button></div>';
    },
    

    //Player chooses not to play and the game is over.

    encounterEnd: function() { 
        getAdventures.innerHTML = '<div class="action"><p>Please refresher your browser to start again!</p></div>';
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Function that runs the encounter where the player decides not to attack, and the enemy attack first instead.

    encounterEnemyAttacksFirst: function() {

        RunGame.createEnemy();
        RunGame.clearLog();

        getAdventures = document.querySelector(".adventure-log");
        getAdventures.style.opacity = "1";
        getAdventures.style.transition = "opacity .5s linear";
        getAdventures.innerHTML = '<div><p>The ' + enemy.enemyType + ' attacks you instead, prepare for damage.</p></div>'

        let getEnemy = document.querySelector(".enemy");
        getEnemy.style.display="flex";
        getEnemy.innerHTML = '<h3>' + enemy.enemyType + '</h3><p> Hit Points Remaining: <span class="enemy-hit-points">'  + enemy.hitPoints  + ' </span></p><img src="img/' + enemy.enemyType.toLowerCase() + '.jpg" alt=" ' + enemy.enemyType + ' " class="img-enemy-avatar"> ';

        setTimeout(function(){
            getAdventures.innerHTML = '<div><p>The ' + enemy.enemyType + ' attacks you for some damage</p></div>'
            enemyStrike(); 
            let alert = document.querySelector(".alert")
            setTimeout(function(){
                getAdventures.style.opacity = "0";
                getAdventures.style.transition = "opacity .5s linear";
                alert.style.opacity = "0";
                alert.style.transition = "opacity .5s linear";
            }, 1000);

            getCombatLog = document.querySelector(".enemy-combat");
            getCombatLog.style.display="flex";
    
            if(player.hitPoints > 0){
                setTimeout(function(){ 
                    attackBack()
                }, 2000)
            } else {
                setTimeout(function(){ 
                    playerDefeat()
                }, 2000)
            }
        }, 500) // - Whole encounter starts .5 second delay
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Function that begins when player attacks the enemy.

    enemyFight: function() {

        getAdventures = document.querySelector(".adventure-log");
        getAdventures.style.opacity = "0";
        getAdventures.style.transition = "opacity .5s linear";
        getCombatLog = document.querySelector(".enemy-combat");
        getCombatLog.style.display="flex";

        RunGame.createEnemy();
        RunGame.clearLog();

        let getEnemy = document.querySelector(".enemy");
        getEnemy.style.display="flex";
        getEnemy.innerHTML = '<h3>' + enemy.enemyType + '</h3><p> Hit Points Remaining: <span class="enemy-hit-points">'  + enemy.hitPoints  + ' </span></p><img src="img/' + enemy.enemyType.toLowerCase() + '.jpg" alt=" ' + enemy.enemyType + ' " class="img-enemy-avatar"> ';

        setTimeout(function(){
            getAdventures.style.opacity = "1";
            getAdventures.style.transition = "opacity .5s linear";
            getAdventures.innerHTML = '<div><p</p>You have struck the first attack for some damage</div>'
            RunGame.playerAttack();
            if(enemy.hitPoints > 0){
                setTimeout(function(){ 
                    enemyStrike();
                    getAdventures.style.opacity = "1";
                    getAdventures.style.transition = "opacity .5s linear";
                    getAdventures.innerHTML = '<div><p>The ' + enemy.enemyType + ' defends itself.</p></div>' 
                    let alert = document.querySelector(".alert")
                        setTimeout(function(){
                            getAdventures.style.opacity = "0";
                            getAdventures.style.transition = "opacity .5s linear";
                            alert.style.opacity = "0";
                            alert.style.transition = "opacity .5s linear";
                        }, 1000);
                }, 1000)

            } else {
                setTimeout(function(){
                    let alert = document.querySelector(".alert")
                    alert.style.display="block";
                    document.querySelector(".alert").innerHTML = "The " + enemy.enemyType + " has died.";
    
                    let getEnemyHitPoints = document.querySelector(".enemy-hit-points");
                    getEnemyHitPoints.innerHTML = 0;
                    getAdventures.innerHTML = '<div><p class="defeated-enemy">You have defeated the ' + enemy.enemyType + '.</p><p>Would you like to continue with your adventure?</p><button class="encounter-btn" id="encounter-btn-yes" onclick="continueGame">Yes</button></div>'
                }, 1000)
            }

            setTimeout(function(){
                if(player.hitPoints > 0){
                    if(enemy.hitPoints <= 0){
                        enemyDefeat()
                    } else if(enemy.hitPoints > 0) {
                       attackBack() 
                    }
                } else {
                    playerDefeat()
                }
            }, 3000)

        }, 500) // - Whole encounter starts .5 second delay
    },
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Function to start second attack rotation.

    secondAttack: function(){

        const getEnemy = document.querySelector(".enemy");
        getEnemy.style.display="flex";
        getEnemy.innerHTML = '<h3>' + enemy.enemyType + '</h3><p> Hit Points Remaining: <span class="enemy-hit-points">' + enemy.hitPoints  + ' </p><img src="img/' + enemy.enemyType.toLowerCase() + '.jpg" alt=" ' + enemy.enemyType + ' " class="img-enemy-avatar"> '; 

        setTimeout(function(){
            if(player.hitPoints > 0) {

                RunGame.playerAttack(); 
                getAdventures = document.querySelector(".adventure-log");
                getAdventures.style.opacity = "1";
                getAdventures.style.transition = "opacity .5s linear";
                getAdventures.innerHTML = '<div><p>You have struck an attack!</p></div>' 
                let alert = document.querySelector(".alert") 
                setTimeout(function(){
                    getAdventures.style.opacity = "0";
                    getAdventures.style.transition = "opacity .5s linear";

                    alert.style.opacity = "0";
                    alert.style.transition = "opacity .5s linear";
                }, 1000) 

                if(enemy.hitPoints > 0) {

                    setTimeout(function(){
                        enemyStrike();
                        getAdventures.style.opacity = "1";
                        getAdventures.innerHTML = '<div><p>The ' + enemy.enemyType + ' defends itself.</p></div>' 
                        let alert = document.querySelector(".alert")
                        setTimeout(function(){
                            getAdventures.style.opacity = "0";
                            getAdventures.style.transition = "opacity .5s linear";

                            alert.style.opacity = "0";
                            alert.style.transition = "opacity .5s linear";
                        }, 1000)
                        if(player.hitPoints > 0) {
                            setTimeout(function(){ 
                                attackBack() 
                            }, 2000)
                        } else if(player.hitPoints <= 0) {
                            setTimeout(function(){
                                playerDefeat()
                            }, 2000)
                        }
                    }, 1000)
        
                } else {
                    setTimeout(function(){
                        enemyDefeat()
                    }, 1500)
                }          

            } else if(player.hitPoints <= 0) {
                setTimeout(function(){
                    playerDefeat()
                }, 1500)
            }
        }, 500) // - Whole encounter starts .5 second delay
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // This is going to be a post encounter loot reward eventually.

    postEnemy: function() {
        combatPlayerLog.style.opacity = "0";
        combatPlayerLog.style.transition = "opacity .5s linear";
        setTimeout(function () {
            combatPlayerLog.innerHTML = "";
            combatPlayerLog.style.opacity = "1";
            combatPlayerLog.style.transition = "opacity .5s linear";
        }, 1000)
        getAdventures = document.querySelector(".adventure-log");
        getAdventures.style.opacity = "1";
        getAdventures.style.transition = "opacity .5s linear";
        getAdventures.innerHTML = '<div class="action"><p>You find at item after defeating your enemy.  You should pick it up! Would you like to pick it up?</p><button class="encounter-btn" id="encounter-btn-yes" onclick="RunGame.receiveItem()">Yes</button><button class="encounter-btn" id="encounter-btn-no" onclick="RunGame.continueGame()">No</button></div>';
    },

    receiveItem: function() {
        getAdventures = document.querySelector(".adventure-log");
        getAdventures.style.opacity = "1";
        getAdventures.style.transition = "opacity .5s linear";
        getAdventures.innerHTML = '<div class="action"><p>You add the new item to you inventory. Let us keep going.</p><button class="encounter-btn-continue" id="encounter-btn-yes" onclick="RunGame.continueGame()">Continue</button></div>';
    },

    // Prompts to drink a potion to reset hitpoints.

    continueGame: function() {
        getAdventures = document.querySelector(".adventure-log");
        getAdventures.style.opacity = "1";
        getAdventures.style.transition = "opacity .5s linear";
        getAdventures.innerHTML = '<div class="action"><p>First, you should drink a healing potion.  You may run into another enemy.</p><button class="encounter-btn-continue" id="encounter-btn-yes" onclick="RunGame.heal()">Drink Potion</button></div>';
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Resets the hitpoints back to their defaults for next encounter.

    heal: function(){
        let playerClass = player.classType;
        if (playerClass == "Warrior") {
            document.querySelector(".player-hit-points").innerHTML = 2500;
            player.hitPoints = 2500;
        } else if (playerClass == "Rogue") {
            document.querySelector(".player-hit-points").innerHTML = 1750;
            player.hitPoints = 1750;
        } else if (playerClass == "Mage") {
            document.querySelector(".player-hit-points").innerHTML = 1250
            player.hitPoints = 1250;
        }
        
        getAdventures = document.querySelector(".adventure-log");
        getAdventures.style.opacity = "1";
        getAdventures.style.transition = "opacity .5s linear";
        getAdventures.innerHTML = '<div class="action"><p>That was refreshing</p><button class="encounter-btn-continue" id="encounter-btn-yes" onclick="RunGame.encounterYes()">Continue</button></div>';
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


} 

