/**
 * Created by Callum on 05/03/2017.
 */

function HudInitialize(game, PC, gridwidthgap, gridheightgap, EnemyArr) {
    console.log(game);
    console.log(PC);
    var HUDWidth = gridwidthgap;
    var HUDHeight = gridheightgap;
    this.PCHPText = game.add.text((gridwidthgap/2), 30, "HP = " + PC.PCCURHP + "/" + PC.PCMAXHP + ".", {
        font: "24px alphabeta",
        fill: "#f8edff",
        align: "center"
    });
    this.PCHPText.anchor.setTo(0.5, 0.5);
    //Displays the player's strength
    this.PCSTRText = game.add.text((gridwidthgap/2), 60, "STR = " + PC.PCSTR + ".", {
        font: "24px alphabeta",
        fill: "#ff0019",
        align: "center"
    });
    this.PCSTRText.anchor.setTo(0.5, 0.5);

    //Displays the player's physical attack
    this.PCPATKText = game.add.text((gridwidthgap/2), 90, "ATK = " + PC.PCPATK + ".", {
        font: "24px alphabeta",
        fill: "#ff7000",
        align: "center"
    });
    this.PCPATKText.anchor.setTo(0.5, 0.5);
    //Displays the player's physical defence
    this.PCPDEFText = game.add.text((gridwidthgap/2), 120, "DEF = " + PC.PCPDEF + ".", {
        font: "24px alphabeta",
        fill: "#ffd100",
        align: "center"
    });
    this.PCPDEFText.anchor.setTo(0.5, 0.5);
    this.PCHPText.anchor.setTo(0.5, 0.5);
    this.PCPotsText = game.add.text((gridwidthgap/3), 150, "Potions: " + PC.PCPots, {
        font: "18px alphabeta",
        fill: "#00c116",
        align: "center"
    });
    this.PCPotsText.anchor.setTo(0.5, 0.5);

    this.PCPicksText = game.add.text((gridwidthgap/3) * 2, 150, "Picks: " + PC.PCPicks, {
        font: "18px alphabeta",
        fill: "#00c116",
        align: "center"
    });
    this.PCPicksText.anchor.setTo(0.5, 0.5);

    this.PCCursesText = game.add.text((gridwidthgap/2), 180, "Curses: " + PC.PCCurses, {
        font: "18px alphabeta",
        fill: "#00c116",
        align: "center"
    });
    this.PCCursesText.anchor.setTo(0.5, 0.5);
    //Displays the stats of the player's head equipment (if any). Defaults to not wearing anything
    this.PCHeadEquipText = game.add.text((gridwidthgap/2), 225, "You have no helmet equipped.", {
        font: "12px alphabeta",
        fill: "#b8ccae",
        align: "center",
        wordWrapWidth: gridwidthgap,
        wordWrap: true
    });
    this.PCHeadEquipText.anchor.setTo(0.5, 0.5);


    //Displays the stats of the player's chest equipment (if any). Defaults to not wearing anything
    this.PCChestEquipText = game.add.text((gridwidthgap/2), 275, "You have no chestplate equipped.", {
        font: "12px alphabeta",
        fill: "#B8CCAE",
        align: "center",
        wordWrapWidth: gridwidthgap,
        wordWrap: true
    });
    this.PCChestEquipText.anchor.setTo(0.5, 0.5);



    //Displays the stats of the player's weapon equipment (if any). Defaults to not wearing anything
    this.PCWeaponEquipText = game.add.text((gridwidthgap/2), 325, "You have no weapon equipped.", {
        font: "12px alphabeta",
        fill: "#B8CCAE",
        align: "center",
        wordWrapWidth: gridwidthgap,
        wordWrap: true
    });
    this.PCWeaponEquipText.anchor.setTo(0.5, 0.5);




    /**ENEMY STAT BLOCK */
    /**
    this.EnemyHP = game.add.text(400, 475, "Enemy HP is " + EnemyArr[0].ENHP, {
        font: "24px alphabeta",
        fill: "#02ff00",
        align: "center"
    });
    this.EnemyHP.anchor.setTo(0.5, 0.5);

    this.EnemyPassive = game.add.text(400, 450, "Enemy Passive is " + EnemyArr[0].ENPassive.Passive + " " + EnemyArr[0].ENPassive.Passive + "%", {
        font: "24px alphabeta",
        fill: "#02ff00",
        align: "center"
    });
    this.EnemyPassive.anchor.setTo(0.5, 0.5);

    this.EnemySTR = game.add.text(400, 500, "Enemy STR is " + EnemyArr.ENSTR, {
        font: "24px alphabeta",
        fill: "#02ff00",
        align: "center"
    });
    this.EnemySTR.anchor.setTo(0.5, 0.5);

    this.EnemyATK = game.add.text(400, 525, "Enemy ATK is " + EnemyArr.ENPATK, {
        font: "24px alphabeta",
        fill: "#02ff00",
        align: "center"
    });
    this.EnemyATK.anchor.setTo(0.5, 0.5);
    this.EnemyDEF = game.add.text(400, 550, "Enemy DEF is " + EnemyArr.ENPDEF, {
        font: "24px alphabeta",
        fill: "#02ff00",
        align: "center"
    });
    this.EnemyDEF.anchor.setTo(0.5, 0.5);

     TextElement2 = game.add.text(600, 300, "Element 2 is " + Element2, {
                font: "24px alphabeta",
                fill: "#7535ff",
                align: "center"
            });
     TextElement2.anchor.set(0.5);
     TextElement2.wordWrap = true;

     TextElement3 = game.add.text(700, 300, "Element 3 is " + Element3, {
                font: "24px alphabeta",
                fill: "#7535ff",
                align: "center"
            });
     TextElement3.anchor.set(0.5);
     TextElement3.wordWrap = true;

     TextElement4 = game.add.text(550, 200, "Element 4 is " + Element4, {
                font: "24px alphabeta",
                fill: "#7535ff",
                align: "center"
            });
     TextElement4.anchor.set(0.5);
     TextElement4.wordWrap = true;

     TextElement5 = game.add.text(650, 200, "Element 5 is " + Element5, {
                font: "24px alphabeta",
                fill: "#7535ff",
                align: "center"
            });
     TextElement5.anchor.set(0.5);
     TextElement5.wordWrap = true;

     */
}