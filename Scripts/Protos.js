/**
 * Created by Callum on 24/02/2017.
 */

/**
 *
 * @param game
 * @param xpos
 * @param ypos
 * @param GridX
 * @param GridY
 * @param scalenum
 * @constructor
 */
function PCCharProto(game, GridArr, xpos, ypos, GridX, GridY, scalenum) {
    this.GridX = GridX;
    this.GridY = GridY;

    console.log("GridX is " + GridX);
    console.log("GridY is " + GridY);
    this.pcsprite = game.add.sprite(xpos, ypos, 'DHPC');

    //Refers to the player's maximum health. Is increased by Strength in the current prototype. Can be further increased by items
    this.PCMAXHP = 100;// + (0.5 * PCSTR);
    //Refers to the player's current HP. Starts off the same as Max HP.
    this.PCCURHP = this.PCMAXHP;

    console.log("PCMAXHP at the start of creation is " + this.PCMAXHP);
    //Refers to the player's STR. Is used to increase health attack and armour in this build. Can be further increased by items
    this.BasePCSTR = 30;
    this.PCSTR = this.BasePCSTR;
    //Refers to the player's physical attack. Is increased by Strength in the current prototype and has a base value of 20.
    this.PCPATK = 20 + (0.2 * this.PCSTR);
    this.PCPDEF = 5 + (0.1 * this.PCSTR);

    //Once all stats have been set (mainly STR in this build) recalculate max HP and set current HP to match.
    this.BaseMaxHP = 300
    this.PCMAXHP = this.BaseMaxHP + (0.5 * this.PCSTR);
    console.log("PCCURHP at the start of creation is " + this.PCCURHP);
    this.PCCURHP = this.PCMAXHP;
    this.PCPassive = [];
    console.debug("PCPassive length is " + this.PCPassive.length);
    this.PCPots = 1;
    this.PCPicks = 1;
    this.PCCurses = 1;
    this.PicksActive = false;
    this.CursesActive = false;
    this.PCHeadEquip = Object;
    this.PCChestEquip = Object;
    this.PCWeaponEquip = Object;
    game.physics.enable(this.pcsprite, Phaser.Physics.ARCADE);


}

/**
 *
 * @param QualityParam
 * @param GotEquipParam
 * @param PCSTRStatParam
 * @param PassiveParam
 * @constructor
 */
function PCEquipProto(game, IDParam, TypeParam, QualityParam, GotEquipParam, PCSTRStatParam, PassiveParam) {

    this.ID = IDParam;
    this.Type = TypeParam;
    this.Quality = QualityParam;
    this.GotEquip = GotEquipParam;
    this.PCSTRStat = PCSTRStatParam;
    this.EquipPassive = PassiveParam;
}
/**
 *
 * @param game
 * @param xpos
 * @param ypos
 * @param IDParam
 * @param QualityParam
 * @param ENSTRStatParam
 * @param PassiveParam
 * @param scalenum
 * @constructor
 */
function EnemyProto(game, xpos, ypos, IDParam, QualityParam, ENSTRStatParam, PassiveParam, scalenum) {
    this.enemysprite = game.add.sprite(xpos, ypos, 'DHEnemy');
    console.log(this.enemysprite);
    this.enemysprite.scale.setTo(scalenum, scalenum);
    this.Quality = QualityParam;
    this.ENSTRStat = ENSTRStatParam;
    this.ENHP = 100 + this.ENSTRStat;
    this.ENPATK = 5 + this.ENSTRStat;
    this.ENPDEF = 5 + (0.1 * this.ENSTRStat);
    this.ENSTR = this.ENSTRStat;
    console.log(PassiveParam);
    this.ENPassive = PassiveParam;
    /*this.ENPassive = {
     ID: IDParam,
     Passive: PassiveParam,
     PassiveX:PassiveXParam
     };*/
    game.physics.enable(this.enemysprite, Phaser.Physics.ARCADE);
    this.enemysprite.inputEnabled = true;

}

/**
 *
 * @param game
 * @param xpos
 * @param ypos
 * @param basetile
 * @param scalenum
 * @constructor
 */
function TileProto(game, xpos, ypos, basetile, scalenum){
    this.TileXPos = xpos;
    this.TileYPos = ypos;
    this.TileType = 2;
    this.BaseTile = game.add.sprite(xpos, ypos, basetile);
    this.BaseTile.scale.setTo(scalenum, scalenum);
    game.physics.enable(this.BaseTile, Phaser.Physics.ARCADE);

    //this.BaseTile.scale.setTo(scalenum, scalenum);
    //this.Tilesprite = new MakeObject(game, this, xpos, ypos, spritenamezero, spritenameone);
    //this.TileSprite.scale.setTo(scalenum, scalenum);
}

function ChestProto(game, IDParam, xpos, ypos, loot, scalenum){
    this.ID = IDParam;
    this.Looted = false;
    this.chestsprite = game.add.sprite(xpos, ypos, 'DHChest');
    this.chestsprite.scale.setTo(scalenum, scalenum);
    this.ChestLoot = loot;
    console.log(this.ChestLoot);
    game.physics.enable(this.chestsprite, Phaser.Physics.ARCADE);

}

function MakeObject(game, obj, xpos, ypos, spritenamezero, spritenameone, spritenametwo, spritenamethree, spritenamefour, spritenamefive, spritenamesix, scalenum, PCParam, EnemyArr, ChestArr) {
    console.log("The Tiletype is " + obj.TileType);

    if (obj.TileType === 0) {
        obj.TileSprite = game.add.sprite(obj.TileXPos, obj.TileYPos, spritenamezero);
        obj.TileSprite.scale.setTo(scalenum, scalenum);
    }
    else if (obj.TileType === 1) {
        obj.TileSprite = game.add.sprite(obj.TileXPos, obj.TileYPos, spritenameone);
        obj.TileSprite.scale.setTo(scalenum, scalenum);
    }
    else if (obj.TileType === 2) {
        obj.TileSprite = game.add.sprite(obj.TileXPos, obj.TileYPos, spritenametwo);
        obj.TileSprite.scale.setTo(scalenum, scalenum);
    }
    else if (obj.TileType === 3) {
    }
    else if (obj.TileType === 4) {
    }
    else if (obj.TileType === 5) {
        console.debug("Generating player");
    }
    else if (obj.TileType === 6) {
        obj.TileSprite = game.add.sprite(obj.TileXPos, obj.TileYPos, spritenamesix);
        obj.TileSprite.scale.setTo(scalenum, scalenum);
    }
}
