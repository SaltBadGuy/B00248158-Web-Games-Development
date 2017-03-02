/**
 * Created by Callum on 24/02/2017.
 */
/**
 *
 * @param game
 * @constructor
 */
function PCCharProto(game) {
    this.pcsprite = game.add.sprite(game.world.centerX, game.world.centerY, 'DHPC'),

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
    this.PCMAXHP = 100 + (0.5 * this.PCSTR);
    console.log("PCCURHP at the start of creation is " + this.PCCURHP);
    this.PCCURHP = this.PCMAXHP;
    this.PCPassive = ["N/A", "N/A", "N/A"];
    this.PCPassiveX = ["N/A", "N/A", "N/A"];

}

/**
 *
 * @param QualityParam
 * @param GotEquipParam
 * @param PCSTRStatParam
 * @param Passive1Param
 * @param Passive1XParam
 * @constructor
 */
function PCEquipProto(game, TypeParam, QualityParam, GotEquipParam, PCSTRStatParam, Passive1Param, Passive1XParam) {

        this.Type = TypeParam;
        this.Quality = QualityParam,
        this.GotEquip = GotEquipParam,
        this.PCSTRStat = PCSTRStatParam,
        this.Passive1 = Passive1Param,
        this.Passive1X = Passive1XParam;
}
/**
 *
 * @param QualityParam
 * @param ENSTRStatParam
 * @param Passive1Param
 * @param Passive1XParam
 * @constructor
 */
function EnemyProto(game, xpos, ypos, QualityParam, ENSTRStatParam, Passive1Param, Passive1XParam, scalenum) {
        this.enemysprite = game.add.sprite(xpos, ypos, 'DHEnemy');
        this.enemysprite.scale.setTo(scalenum, scalenum);
        this.Quality = QualityParam;
        this.ENSTRStat = ENSTRStatParam;
        this.Passive1 = Passive1Param;
        this.Passive1X = Passive1XParam;
        this.ENHP = 100 + this.ENSTRStat;
        this.ENPATK = 5 + this.ENSTRStat;
        this.ENPDEF = 5 + (0.1 * this.ENSTRStat);
        this.ENSTR = this.ENSTRStat;
        this.ENPassive = [Passive1Param, "N/A", "N/A"];
        this.ENPassiveX = [Passive1XParam, "N/A", "N/A"];
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
        this.BaseTile.scale.setTo(scalenum, scalenum)
        //this.BaseTile.scale.setTo(scalenum, scalenum);
        //this.Tilesprite = new MakeObject(game, this, xpos, ypos, spritenamezero, spritenameone);
        //this.TileSprite.scale.setTo(scalenum, scalenum);
}

function MakeObject(game, obj, xpos, ypos, spritenamezero, spritenameone, spritenametwo, spritenamethree, spritenamefour, spritenamefive, spritenamesix, scalenum, EnemyArr, ChestArr) {
        console.log("The Tiletype is " + obj.TileType);
        if (obj.TileType == 0) {
            obj.TileSprite = game.add.sprite(obj.TileXPos, obj.TileYPos, spritenamezero);
            obj.TileSprite.scale.setTo(scalenum, scalenum);
        }
        else if (obj.TileType == 1) {
            obj.TileSprite = game.add.sprite(obj.TileXPos, obj.TileYPos, spritenameone);
            obj.TileSprite.scale.setTo(scalenum, scalenum);
        }
        else if (obj.TileType == 2) {
            obj.TileSprite = game.add.sprite(obj.TileXPos, obj.TileYPos, spritenametwo);
            obj.TileSprite.scale.setTo(scalenum, scalenum);
        }
        else if (obj.TileType == 3) {
            obj.TileSprite = game.add.sprite(obj.TileXPos, obj.TileYPos, spritenamethree);
            obj.TileSprite.scale.setTo(scalenum, scalenum);
        }
        else if (obj.TileType == 4) {
            //obj.TileSprite = game.add.sprite(obj.TileXPos, obj.TileYPos, spritenamefour);
            GenerateEnemy(game, xpos, ypos, EnemyArr, scalenum);
            //obj.ThingSpawn.scale.setTo(scalenum, scalenum);
        }
        else if (obj.TileType == 5) {
            //game.add.sprite(obj.TileXPos, obj.TileYPos, spritenamezero).scale.setTo(scalenum,scalenum);
            obj.TileSprite = game.add.sprite(obj.TileXPos, obj.TileYPos, spritenamefive);
            obj.TileSprite.scale.setTo(scalenum, scalenum);
        }
        else if (obj.TileType == 6) {
            obj.TileSprite = game.add.sprite(obj.TileXPos, obj.TileYPos, spritenamesix);
            obj.TileSprite.scale.setTo(scalenum, scalenum);
        }
}

function ChestProto(game){
    this.Loot = GenerateLoot();

}