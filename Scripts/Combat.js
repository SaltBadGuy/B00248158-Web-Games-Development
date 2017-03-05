/**
 * Created by Callum on 24/02/2017.
 */
var CombatTurn = true;

function Combat(game, timerEvents, Player, Enemy) {
    PBurn = 0;
    EBurn = 0;
    console.log("At the start of combat, player HP was at " + Player.PCCURHP);
    console.log("At the start of combat, enemy HP was at " + Enemy.ENHP);
    //game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
    //timerEvents.push(game.time.events.loop(1000, WhoAttacks(Player, Enemy), this));
    timerEvents.push(game.time.events.loop(500, function () {
        WhoAttacks(game, timerEvents, Player, Enemy, game.Turn)
    }, this));
    //incombat =  game.time.repeat(Phaser.Timer.SECOND, WhoAttacks(Player, Enemy), this);
}

function WhoAttacks(game, timerEvents, Player, Enemy, Turn) {
    /**Determines which character has their turn.
     * true = player's turn
     * false = enemy's turn*/
    var CombatOngoing = true;
    if (Player.PCCURHP < 1 || Enemy.ENHP < 1) {
        console.log("Ending combat");
        game.time.events.remove(timerEvents[0]);
        CombatOngoing = false;
    }
    if (CombatOngoing) {
        if (CombatTurn) {
            console.log("Player's turn to attack!");
            CombatTurn = PlayerAttack(Player, Enemy, Turn);
        }
        else {
            console.log("Enemy's turn to attack!");
            CombatTurn = EnemyAttack(Player, Enemy, Turn);

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
function PlayerAttack(Player, Enemy, Turn) {
    var ReTurn = false;
    console.log("The turn is " + ReTurn);
    console.log("Player is about to attack!");
    console.log("Enemy HP was at " + Enemy.ENHP);
    var ActualDamage = 0;
    var EstBaseDamage = Player.PCPATK - Enemy.ENPDEF;
    for (var i = 0; i < Player.PCPassive.length || i < Enemy.ENPassive.length; i++) {
        ApplyPassive(EstBaseDamage, Player.PCPassive[i], Player.PCPassiveX[i], Enemy.ENPassive[i], Enemy.ENPassiveX[i], Turn);
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
    console.log("The turn is " + Turn);
    return ReTurn;
}

/**
 *
 * @param Player
 * @param Enemy
 * @param Turn
 * @return {boolean}
 * @constructor
 */
function EnemyAttack(Player, Enemy, Turn) {
    var ReTurn = true;
    console.log("The turn is " + ReTurn);
    console.log("Enemy is about to attack!");
    console.log("Player HP was at " + Player.PCCURHP);
    var ActualDamage = 0;
    var EstBaseDamage = Enemy.ENPATK - Player.PCPDEF;
    console.log("The enemy Passive length is " + Enemy.ENPassive.length + " and the player passive length is " + Player.PCPassive.length)
    for (var i = 0; i < Enemy.ENPassive.length || i < Player.PCPassive.length; i++) {
        ApplyPassive(Player, Enemy, EstBaseDamage, Player.PCPassive[i], Player.PCPassiveX[i], Enemy.ENPassive[i], Enemy.ENPassiveX[i], Turn);
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
    console.log("The turn is " + Turn);
    return ReTurn;
}

function ApplyPassive(PC, Enemy, EstBaseDamage, PPassive, PPassiveX, EPassive, EPassiveX, Turn) {
    //Calling RNG to check passives
    var RNG = randomIntInRange(0, 101);
    console.log("RNG Roll this round is " + RNG);
    /**When it's the player's turn*/
    if (Turn == true) {
        /**Passives belonging to the player that activate when the player is attacking*/
        if (PPassive == "Lifesteal") {
            console.log("Activating Lifesteal");
            PC.PCCURHP += EstBaseDamage * (PPassiveX / 100);
            console.log("Healed for " + EstBaseDamage * (PPassiveX / 100));
        }
        else if (PPassive == "Critical") {
            console.log("Attempting Critical");
            if (RNG < PPassiveX) {
                console.log("Activating Critical");
                PlayerAttack.ActualDamage = EstBaseDamage * 2;
            }
            else {
                console.log("Critical Failed");
            }

        }
        else if (PPassive == "Burn") {
            PBurn += PPassiveX;
            console.log("Burn Applied! Currently " + PBurn)
        }
        /**Passives belonging to the enemy that activate when the player is attacking*/
        else if (EPassive == "Parry") {
            console.log("Gettig attacked, attempting Parry");
            if (RNG < EPassiveX) {
                console.log("Activating Parry");
                PlayerAttack.ActualDamage = -1;
            }
            else {
                console.log("Parry Failed");
            }
        }

    }
    /**When it's the enemy's turn*/
    else {
        if (EPassive == "Lifesteal") {
            console.log("Activating Lifesteal");
            Enemy.ENHP += EstBaseDamage * (EPassiveX / 100);
            console.log("Healed for " + EstBaseDamage * (EPassiveX / 100));
        }
        else if (EPassive == "Critical") {
            console.log("Attempting Critical");
            if (RNG < EPassiveX) {
                console.log("Activating Critical");
                EnemyAttack.ActualDamage = EstBaseDamage * 2;
            }
            else {
                console.log("Critical Failed");
            }

        }
        else if (EPassive == "Burn") {
            PBurn += EPassiveX;
            console.log("Burn Applied! Currently " + EBurn)
        }
        else if (PPassive == "Parry") {
            console.log("Gettig attacked, attempting Parry");
            if (RNG < PPassiveX) {
                console.log("Activating Parry");
                PlayerAttack.ActualDamage = -1;
            }
            else {
                console.log("Parry Failed");
            }
        }

    }
}