/**
 * Created by Callum on 24/02/2017.
 */


function Combat(game, combatEvent, Player, Enemy, InCombat) {
    console.log("Starting Combat!");
    console.log(InCombat);
    console.log(Player);
    PBurn = 0;
    EBurn = 0;
    var CombatTurn = {
        Turn: true
    };
    console.log("At the start of combat, player HP was at " + Player.PCCURHP);
    console.log("At the start of combat, enemy HP was at " + Enemy.ENHP);
    //game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
    //combatEvent.push(game.time.events.loop(1000, WhoAttacks(Player, Enemy), this));
    combatEvent.push(game.time.events.loop(1000, function () {
        WhoAttacks(game, combatEvent, Player, Enemy, CombatTurn, InCombat)
    }, this));
    console.log(combatEvent);
    //incombat =  game.time.repeat(Phaser.Timer.SECOND, WhoAttacks(Player, Enemy), this);
}

/**
 *
 * @param game
 * @param combatEvent
 * @param Player
 * @param Enemy
 * @param Turn
 * @param InCombat
 * @return {boolean}
 * @constructor
 */
function WhoAttacks(game, combatEvent, Player, Enemy, Turn, InCombat) {
    /**Determines which character has their turn.
     * true = player's turn
     * false = enemy's turn*/
    console.log(combatEvent);
    console.log(Player);
    console.log(Player.PCCURHP);
    console.log(Enemy);
    console.log(Enemy.ENHP);
    console.log(Turn.Turn);

    if (Player.PCCURHP < 1 || Enemy.ENHP < 1){
        console.log("Ending combat");
        if (Player.PCCURHP <= 0){
            console.log("Destroying Player");
            Player.pcsprite.destroy();
        }
        if (Enemy.ENHP <= 0){
            console.log("Destroying Enemy");
            Enemy.enemysprite.destroy();
        }
        game.time.events.removeAll(combatEvent);
    }
        if (Turn.Turn == true) {
            console.log("Player's turn to attack!");
            PlayerAttack(game, Player, Enemy, Turn);
        }
        else {
            console.log("Enemy's turn to attack!");
            EnemyAttack(game, Player, Enemy, Turn);

        }
}

/**
 *
 * @param
 * @param Player
 * @param Enemy
 * @param Turn
 * @return {boolean}
 * @constructor
 */
function PlayerAttack(game, Player, Enemy, Turn) {

    console.log("The turn is " + Turn.Turn);
    console.log("Player is about to attack!");
    console.log("Enemy HP was at " + Enemy.ENHP);
    var ActualDamage = 0;
    var EstBaseDamage = Player.PCPATK - Enemy.ENPDEF;

    console.log("The enemy Passive length is " + Enemy.ENPassive.length + " and the player passive length is " + Player.PCPassive.length);
    for (var i = 0; i < Player.PCPassive.length || i < Enemy.ENPassive.length; i++) {
        ApplyPassive(game, Player, Enemy, EstBaseDamage, Player.PCPassive[i], Enemy.ENPassive[i], Turn);
    }
    if (ActualDamage > 0) {
        if (ActualDamge > EstBaseDamage) {
            Enemy.ENHP -= (ActualDamage + PBurn);
        }
        else {
            Enemy.ENHP -= (EstBaseDamage + PBurn);
        }
    }
    else if (ActualDamage < 0) {
        console.log("Must've been parried!")
    }
    else {
        Enemy.ENHP -= (EstBaseDamage + EBurn);
    }
    console.log("Estimated damage is " + EstBaseDamage);
    console.log("Now Enemy HP is " + Enemy.ENHP);
    Turn.Turn = false;
    console.log("The turn is " + Turn.Turn);
}

/**
 * @param game
 * @param Player
 * @param Enemy
 * @param Turn
 * @return {boolean}
 * @constructor
 */
function EnemyAttack(game, Player, Enemy, Turn) {

    console.log("The turn is " + Turn.Turn);
    console.log("Enemy is about to attack!");
    console.log("Player HP was at " + Player.PCCURHP);
    var ActualDamage = 0;
    var EstBaseDamage = Enemy.ENPATK - Player.PCPDEF;

    console.log("The enemy Passive length is " + Enemy.ENPassive.length + " and the player passive length is " + Player.PCPassive.length);
    for (var i = 0; i < Enemy.ENPassive.length || i < Player.PCPassive.length; i++) {

        ApplyPassive(game, Player, Enemy, EstBaseDamage, Player.PCPassive[i], Enemy.ENPassive[i], Turn);
    }
    if (ActualDamage > 0) {
        if (ActualDamge > EstBaseDamage) {
            Player.PCCURHP -= (ActualDamage + EBurn);
        }
        else {
            Player.PCCURHP -= (EstBaseDamage + EBurn);
        }
    }
    else if (ActualDamage < 0) {
        console.log("Must've been parried!")
    }
    else {
        Player.PCCURHP -= (EstBaseDamage + EBurn);
    }
    console.log("Estimated damage is " + EstBaseDamage);
    console.log("Now Player HP is " + Player.PCCURHP);
    Turn.Turn = true;
    console.log("The turn is " + Turn.Turn);
}

function ApplyPassive(game, PC, Enemy, EstBaseDamage, PPassive, EPassive, Turn) {
    //Calling RNG to check passives
    var RNG = 1; // parseInt((Math.random() *  100), 10);
    console.log(Turn.Turn);
    console.log("RNG Roll this round is " + RNG);
    /**When it's the player's turn*/
    if (typeof PPassive == "undefined"){
        console.log("No passive in this player slot.");
        PPassive = {
            ID: "GETRIDOFME",
            Passive: "N/A",
            PassiveX: "N/A"
        };
    }
    if (typeof EPassive == "undefined"){
        console.log("No passive in this enemy slot.");
        EPassive = {
            ID: "GETRIDOFME",
            Passive: "N/A",
            PassiveX: "N/A"
        };
    }
    if (Turn.Turn == true) {
        /**Passives belonging to the player that activate when the player is attacking*/
        if (PPassive.Passive == "Lifesteal") {
            console.log("Activating Player's Lifesteal");
            var text = game.make.text(200, 200, "LIFESTEAL!", { font: "bold 32px alphabeta", fill: "#ff0044" });
            text.setText("LIFESTEAL!!");
            text.anchor.set(0.5);
            PC.PCCURHP += EstBaseDamage * (PPassive.PassiveX / 100);
            console.log("Healed for " + EstBaseDamage * (PPassive.PassiveX / 100));
        }
    }
        else if (PPassive.Passive == "Critical") {
            console.log("Attempting Player's Critical");
            if (RNG < PPassive.PassiveX) {
                console.log("Activating Player's Critical");
                game.make.text(PC.pcsprite.x, PC.pcsprite.y, "CRIT!!!",{ font: "bold 32px alphabeta", fill: "#f9ff00" });
                PlayerAttack.ActualDamage = EstBaseDamage * 2;
            }
            else {
                console.log("Critical Failed");
            }
        }
        else if (PPassive.Passive == "Burn") {
            PBurn += PPassive.PassiveX;
            console.log("Player's Burn Applied! Currently " + PBurn)
        }
        /**Passives belonging to the enemy that activate when the player is attacking*/
        else if (EPassive.Passive == "Parry") {
            console.log("Getting attacked, attempting Player's Parry");
            if (RNG < EPassiveX) {
                console.log("Activating Player's Parry");
                PlayerAttack.ActualDamage = -1;
            }
            else {
                console.log("Parry Player's Failed");
            }
        }
    /**When it's the enemy's turn*/
    else {
        if (EPassive.Passive == "Lifesteal") {
            console.log("Activating Enemy's Lifesteal");
            Enemy.ENHP += EstBaseDamage * (EPassiveX / 100);
            console.log("Healed for " + EstBaseDamage * (EPassive.PassiveX / 100));
        }
        else if (EPassive.Passive == "Critical") {
            console.log("Attempting Enemy's  Critical");
            if (RNG < EPassive.PassiveX ) {
                console.log("Activating Enemy's  Critical");
                EnemyAttack.ActualDamage = EstBaseDamage * 2;
            }
            else {
                console.log("Enemy's Critical Failed");
            }

        }
        else if (EPassive.Passive == "Burn") {
            EBurn += EPassive.PassiveX;
            console.log("Enemy's  Burn Applied! Currently " + EBurn)
        }
        else if (PPassive.Passive == "Parry") {
            console.log("Gettig attacked, attempting Enemy's  Parry");
            if (RNG < PPassive.PassiveX) {
                console.log("Activating Enemy's Parry");
                PlayerAttack.ActualDamage = -1;
            }
            else {
                console.log("Enemy's  Parry Failed");
            }
        }
    }
}