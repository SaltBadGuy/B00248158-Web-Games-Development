/**
 * Created by Callum on 24/02/2017.
 */
var CombatTurn = true;

function Combat(game, timerEvents, Player, Enemy, Turn, InCombat) {
    console.log("Starting Combat!");
    PBurn = 0;
    EBurn = 0;
    console.log("At the start of combat, player HP was at " + Player.PCCURHP);
    console.log("At the start of combat, enemy HP was at " + Enemy.ENHP);
    //game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
    //timerEvents.push(game.time.events.loop(1000, WhoAttacks(Player, Enemy), this));
    timerEvents.push(game.time.events.loop(500, function () {
        WhoAttacks(game, timerEvents, Player, Enemy, CombatTurn, InCombat)
    }, this));
    //incombat =  game.time.repeat(Phaser.Timer.SECOND, WhoAttacks(Player, Enemy), this);
}

/**
 *
 * @param game
 * @param timerEvents
 * @param Player
 * @param Enemy
 * @param Turn
 * @param InCombat
 * @return {boolean}
 * @constructor
 */
function WhoAttacks(game, timerEvents, Player, Enemy, Turn, InCombat) {
    /**Determines which character has their turn.
     * true = player's turn
     * false = enemy's turn*/
    var apply = 0;
    if (Player.PCCURHP < 1 || Enemy.ENHP < 1) {
        console.log("Ending combat");
        game.time.events.remove(timerEvents[0]);
        return false;
    }
    if (InCombat) {
        if (CombatTurn) {
            console.log("Player's turn to attack!");
            CombatTurn = PlayerAttack(game, Player, Enemy, Turn);
        }
        else {
            console.log("Enemy's turn to attack!");
            CombatTurn = EnemyAttack(game, Player, Enemy, Turn);

        }
    }
}

/**
 *
 * @param Player
 * @param Enemy
 * @param Turn
 * @return {boolean}
 * @constructor
 */
function PlayerAttack(game, Player, Enemy, Turn) {

    console.log("The turn is " + Turn);
    console.log("Player is about to attack!");
    console.log("Enemy HP was at " + Enemy.ENHP);
    var ActualDamage = 0;
    var EstBaseDamage = Player.PCPATK - Enemy.ENPDEF;
    var apply = 0;

    console.log("The enemy Passive length is " + Enemy.ENPassive.length + " and the player passive length is " + Player.PCPassive.length);
    for (var i = 0; i < Player.PCPassive.length || i < Enemy.ENPassive.length; i++) {
        ApplyPassive(game, EstBaseDamage, Player.PCPassive[i], Enemy.ENPassive[i], Turn);
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
    Turn = false;
    console.log("The turn is " + Turn);
    return Turn;
}

/**
 *
 * @param Player
 * @param Enemy
 * @param Turn
 * @return {boolean}
 * @constructor
 */
function EnemyAttack(game, Player, Enemy, Turn) {

    console.log("The turn is " + Turn);
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
    Turn = true;
    console.log("The turn is " + Turn);
    return Turn;
}

function ApplyPassive(game, PC, Enemy, EstBaseDamage, PPassive, EPassive, Turn) {
    //Calling RNG to check passives
    var RNG = randomIntInRange(0, 101);
    console.log("RNG Roll this round is " + RNG);
    /**When it's the player's turn*/
    if (typeof PPassive == "undefined"){
        console.log("No passive in this player slot.");
        PPassive.Passive = {
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
    if (Turn == true) {
        /**Passives belonging to the player that activate when the player is attacking*/
        if (PPassive.Passive == "Lifesteal") {
            console.log("Activating Player's Lifesteal");
            PC.PCCURHP += EstBaseDamage * (PPassive.PassiveX / 100);
            console.log("Healed for " + EstBaseDamage * (PPassive.PassiveX / 100));
        }
    }
        else if (PPassive.Passive == "Critical") {
            console.log("Attempting Player's Critical");
            if (RNG < PPassive.PassiveX) {
                console.log("Activating Player's Critical");
                game.make.text(PC.pcsprite.x, PC.pcsprite.y, "CRIT!!!",{ font: "bold 32px Arial", fill: "#f9ff00" });
                PlayerAttack.ActualDamage = EstBaseDamage * 2;
            }
            else {
                console.log("Critical Failed");
            }
        }
        else if (PPassive.Passive == "Burn") {
            PBurn += PPassive;
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
            PBurn += EPassiveX;
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