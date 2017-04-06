/**
 * Created by Callum on 24/02/2017.
 */


function Combat(game, combatEvent, textEvents, Player, Enemy, InCombat) {
    console.log("Starting Combat!");
    console.log(InCombat);
    console.log(Player);

    var CombatTurn = {
        Turn: true
    };

    var Burn = {
        PBurn: 0,
        EBurn: 0
    }
    console.log("At the start of combat, player HP was at " + Player.PCCURHP);
    console.log("At the start of combat, enemy HP was at " + Enemy.ENHP);
    combatEvent.push(game.time.events.loop(1000, function () {
        WhoAttacks(game, combatEvent, textEvents, Player, Enemy, CombatTurn, Burn, InCombat)
    }, this));
    console.log(combatEvent);
}

/**
 *
 * @param game
 * @param combatEvent
 * @param Player
 * @param Enemy
 * @param Turn
 * @param InCombat
 * @constructor
 */
function WhoAttacks(game, combatEvent, textEvents, Player, Enemy, Turn, Burn, InCombat) {
    /**Determines which character has their turn.
     * true = player's turn
     * false = enemy's turn*/
    console.log(combatEvent);
    console.log(textEvents);
    console.log(Player);
    console.log(Player.PCCURHP);
    console.log(Enemy);
    console.log(Enemy.ENHP);
    console.log(Turn.Turn);
    console.log("STARTING A NEW WHOATTACKS");

    var PassiveEffects = {
        Parry: 1,
        Lifesteal: 0,
        Critical: 1
    };


    if (Player.PCCURHP < 1 || Enemy.ENHP < 1 || Player.CursesActive === true) {
        console.log("Ending combat");
        if (Player.PCCURHP <= 0) {
            console.log("Destroying Player");
            Player.pcsprite.destroy();
            game.time.events.removeAll(combatEvent);
            InCombat.InCombat = false;
        }
        if (Enemy.ENHP <= 0) {
            console.log("Destroying Enemy");
            Enemy.enemysprite.destroy();
            game.time.events.removeAll(combatEvent);
            InCombat.InCombat = false;

        }
        if (Player.CursesActive) {
            console.log("Cursed the enemy! Insta-kill!");
            Enemy.enemysprite.destroy();
            game.time.events.removeAll(combatEvent);
            InCombat.InCombat = false;
            Player.CursesActive = false;
            new CombatTextGen(game, Enemy.enemysprite.x + 32, Enemy.enemysprite.y, "Cursed! Insta-kill!", "", Turn, textEvents);

        }
    }
    if (InCombat.InCombat){
        if (Turn.Turn === true) {
            if (Player.PCCURHP > 0 || Enemy.ENHP > 0) {
                console.log("Player's turn to attack!");
                PlayerAttack(game, Player, Enemy, Turn, PassiveEffects, Burn, combatEvent, textEvents);
            }
        }
        else {
            if (Player.PCCURHP > 0 || Enemy.ENHP > 0) {
                console.log("Enemy's turn to attack!");
                EnemyAttack(game, Player, Enemy, Turn, PassiveEffects, Burn, combatEvent, textEvents);
            }
        }
    }
}

function DealDamage(game, P, A, D, AATK, DDEF, Burn, Turn, combatEvents, textEvents){
    var ActualDamage;
    ActualDamage = P.Parry * (P.Critical * (AATK - DDEF));
    console.log("The actual damage is " + ActualDamage);
    console.log("Player Burn is " + Burn.PBurn);
    console.log("Enemy Burn is " + Burn.EBurn);
    console.log("The Turn when trying damage is " + Turn.Turn);
    console.log(textEvents);

    if (Turn.Turn) {
        A.PCCURHP += ((ActualDamage / 100) * P.Lifesteal);
        if (P.Lifesteal > 0 ) {
            new CombatTextGen(game, A.pcsprite.x, A.pcsprite.y, "Healed for ", (ActualDamage / 100) * P.Lifesteal, Turn, textEvents);
        }
        D.ENHP -= ActualDamage;
        new CombatTextGen(game, D.enemysprite.x + 32, D.enemysprite.y, "", ActualDamage, Turn, textEvents);
        D.ENHP -= Burn.EBurn;
    }
    else{
        A.ENHP += ((ActualDamage / 100) * P.Lifesteal);
        if (P.Lifesteal > 0 ) {
            new CombatTextGen(game, A.enemysprite.x, A.enemysprite.y, "Healed for ", (ActualDamage / 100) * P.Lifesteal, Turn, textEvents);
        }
        D.PCCURHP -= ActualDamage;
        new CombatTextGen(game, D.pcsprite.x, D.pcsprite.y, "", ActualDamage, Turn, textEvents);
        D.PCCURHP -= Burn.PBurn;
    }
}

function CombatTextGen(game, x, y, message, number, Turn, textEvents){
    var combatTextFont = "25px Alphabeta";
    if (Turn.Turn){
        var Color = "#39d179";
    }
    else{
        Color = "#d1000c";
    }
    var value;
    if (isNaN(number)){
        value = "";
    }
    else{
        Math.round(number);
    }
    var combatText = game.add.text(x, y - 32, message + number, {font: combatTextFont, fill: Color, stroke: "#ffffff", strokeThickness: 2});
    combatText.anchor.setTo(0.5, 0);
    combatText.align = 'center';
    console.log(textEvents);
    game.add.tween(combatText).to( { x: '-300', y: '-300' }, 1500, Phaser.Easing.Quadratic.InOut, true);
    textEvents.push(game.time.events.add(1500, function (){
        DestroyText(combatText)
    }, this));
}

function DestroyText(combatText){
    console.log("Destroying Text");
    combatText.destroy();
}


/**
 *
 * @param game
 * @param Player
 * @param Enemy
 * @param Turn
 * @param PassiveEffects
 * @param Burn
 * @constructor
 */
function PlayerAttack(game, Player, Enemy, Turn, PassiveEffects, Burn, combatEvents, textEvents) {

    console.log("The turn is " + Turn.Turn);
    console.log("The enemy Passive length is " + Enemy.ENPassive.length + " and the player passive length is " + Player.PCPassive.length);
    console.log(textEvents);
    for (var i = 0; i < Player.PCPassive.length || i < Enemy.ENPassive.length; i++) {
        ApplyPassive(game, Player, Enemy, Player.PCPassive[i], Enemy.ENPassive[i], PassiveEffects, Burn, Turn);
    }
    DealDamage(game, PassiveEffects, Player, Enemy, Player.PCPATK, Enemy.ENPDEF, Burn, Turn, combatEvents, textEvents);
    console.log("Now Enemy HP is " + Enemy.ENHP);
    Turn.Turn = false;
}

/**
 *
 * @param game
 * @param Player
 * @param Enemy
 * @param Turn
 * @param PassiveEffects
 * @param Burn
 * @constructor
 */
function EnemyAttack(game, Player, Enemy, Turn, PassiveEffects, Burn, combatEvents, textEvents) {
    console.log("The turn is " + Turn.Turn);console.log("Player HP was at " + Player.PCCURHP);
    console.log("The enemy Passive length is " + Enemy.ENPassive.length + " and the player passive length is " + Player.PCPassive.length);
    console.log(textEvents);
    for (var i = 0; i < Enemy.ENPassive.length || i < Player.PCPassive.length; i++) {
        ApplyPassive(game, Player, Enemy, Player.PCPassive[i], Enemy.ENPassive[i], PassiveEffects, Burn, Turn);
    }
    DealDamage(game, PassiveEffects, Enemy, Player, Enemy.ENPATK, Player.PCPDEF, Burn, Turn, combatEvents, textEvents);
    console.log("Now Player HP is " + Player.PCCURHP);
    Turn.Turn = true;
}

function ApplyPassive(game, PC, Enemy, PPassive, EPassive, PassiveEffects, Burn, Turn, textEvents) {
    /*When it's the player's turn*/
     if (typeof PPassive === "undefined"){
         console.log("No passive in this player slot.");
         PPassive = {
             ID: "GETRIDOFME",
             Passive: "N/A",
             PassiveX: "N/A"
         };
     }
     if (typeof EPassive === "undefined") {
         console.log("No passive in this enemy slot.");
         EPassive = {
             ID: "GETRIDOFME",
             Passive: "N/A",
             PassiveX: "N/A"
         };
     }
    //Calling RNG to check passives
    var RNG = parseInt((Math.random() *  100), 10);
    console.log(Turn.Turn);
    console.log("RNG Roll this round is " + RNG);
    if (Turn.Turn === true) {
        /**Passives belonging to the player that activate when the player is attacking*/
        if (PPassive.Passive === "Lifesteal") {
            console.log("Activating Player's Lifesteal");
            PassiveEffects.Lifesteal = PPassive.PassiveX;
        }
    }
    else if (PPassive.Passive === "Critical") {
        console.log("Attempting Player's Critical");
        if (RNG < PPassive.PassiveX) {
            console.log("Activating Player's Critical");
            new CombatTextGen(game, Enemy.enemysprite.x, Enemy.enemysprite.y, "Critical Hit!", "", Turn, textEvents);
            PassiveEffects.Critical = 2;
        }
        else {
            console.log("Critical Failed");
        }
    }
    else if (PPassive.Passive === "Burn") {
        Burn.PBurn += PPassive.PassiveX;
        new CombatTextGen(game, Enemy.enemysprite.x, Enemy.enemysprite.y, "Burning for ", Burn.PBurn, Turn, textEvents);
        console.log("Player's Burn Applied! Currently " + Burn.PBurn)
    }
    /**Passives belonging to the enemy that activate when the player is attacking*/
    else if (EPassive.Passive === "Parry") {
        console.log("Getting attacked, attempting Enemy's Parry");
        if (RNG < EPassive.PassiveX) {
            console.log("Activating Enemy's Parry");
            new CombatTextGen(game, PC.pcsprite.x, PC.pcsprite.y, "Parried!", "", Turn, textEvents);
            PassiveEffects.Parry = 0;
        }
        else {
            console.log("Parry Player's Failed");
        }
    }
    /**When it's the enemy's turn*/
    else {
        if (EPassive.Passive === "Lifesteal") {
            console.log("Activating Enemy's Lifesteal");
            PassiveEffects.Lifesteal = EPassive.PassiveX;
        }
        else if (EPassive.Passive === "Critical") {
            console.log("Attempting Enemy's  Critical");
            if (RNG < EPassive.PassiveX ) {
                console.log("Activating Enemy's  Critical");
                PassiveEffects.Critical = 2;
                new CombatTextGen(game, PC.pcsprite.x, PC.pcsprite.y, "Critical Hit!", "", Turn, textEvents);
            }
            else {
                console.log("Enemy's Critical Failed");
            }

        }
        else if (EPassive.Passive === "Burn") {
            new CombatTextGen(game, PC.pcsprite.x, PC.pcsprite.y, "Burning for ", Burn.EBurn, Turn, textEvents);
            Burn.EBurn += EPassive.PassiveX;
            console.log("Enemy's Burn Applied! Currently " + Burn.EBurn)
        }
        else if (PPassive.Passive === "Parry") {
            console.log("Getting attacked, attempting Player's  Parry");
            if (RNG < PPassive.PassiveX) {
                console.log("Activating Players's Parry");
                new CombatTextGen(game, Enemy.enemysprite.x, Enemy.enemysprite.y, "Parried!", "", Turn, textEvents);
                PassiveEffects.Parry = 0;
            }
            else {
                console.log("Player's Parry Failed");
            }
        }
    }
}