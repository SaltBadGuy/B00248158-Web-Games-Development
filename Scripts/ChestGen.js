/**
 * Created by Callum on 02/03/2017.
 */

function GenerateChest(game, ChestID, EquipID, xpos, ypos, ChestArr, scalenum, PC){
    console.log(PC); //Shows PCProto, as intended
    var loot = GenerateLoot(game, EquipID, PC);
    console.log(loot); //Shows GenerateLoot
    var GeneratedChest = new ChestProto(game, ChestID, xpos, ypos, loot, scalenum);
    console.log("Generated Chest is " + GeneratedChest.ChestLoot);
    ChestArr.push(GeneratedChest);
    console.log("JOBS DONE");
    for (var i = 0; i < ChestArr.length; i++){
        console.log(ChestArr[i]);
    }
}

function GenerateLoot(game, EquipID, PC){
    console.log(PC); //Shows Undefined
    var Loot;
    var RNG = randomIntInRange(0,1);

    console.log ("RNG for loot gen is " + RNG);
    if (RNG == 0) {
        Loot = GenerateEquip(game, EquipID, PC);
        console.log(Loot);
        return Loot;
    }
    else {
        Loot = GenerateItem(game,PC);
        console.log(Loot);
        return Loot;
    }
}

/**
 *
 * @param game
 * @param PC
 * @return {PCEquipProto}
 * @constructor
 */
function GenerateEquip(game, EquipID, PC){
    var EquipType = GenerateType();
    var Quality = GenerateQuality();
    console.log("The Quality multiplier is " + Quality);
    var GotEquip = true;
    var PCSTRStat = Quality * randomIntInRange(5,15);
    var Passive = GeneratePassive(Quality);
    //var Passive1X = GeneratePassiveX(Passive1, Quality);
    console.log("the rolled values for a new helmet were " +  Quality + ", " +  GotEquip + ", " +  PCSTRStat + ", " +  Passive);
    Equip = new PCEquipProto(game, EquipID, EquipType, Quality, GotEquip, PCSTRStat, Passive);
    return Equip;
    //PCPassives[0];
}

/**
 *
 * @param game
 * @param PC
 * @return {*}
 * @constructor
 */
function GenerateItem(game, PC){
    console.log(PC);
    var string = "AAAAAAA";
    console.log(string);
    var RNG = randomIntInRange(0,10);
    console.log ("RNG for item gen is " + RNG);
    if (RNG <= 6) {
        console.log ("Generated a Potion");
        string = "Potion";
       //PC.PCPots++;
    }
    else if (RNG > 6 || RNG <= 9){
        console.log ("Generated a Pick");
        string = "Pick";
        //PC.PCPicks++;
    }
    else{
        console.log ("Generated a Curse");
        string = "Curse";
        //PC.PCCurses++;
    }
    console.log(string);
    return string;
}

function aaaaEquipTestChestPlate(){
    var Quality = GenerateQuality();
    console.log("The Quality multiplier is " + Quality);
    var GotEquip = true;
    var PCSTRStat = Quality * randomIntInRange(15,25);
    var Passive1 = GeneratePassive(Quality);
    var Passive1X = GeneratePassiveX(Passive1, Quality);
    console.log("the rolled values for a new chestplate were " +  Quality + ", " +  GotEquip + ", " +  PCSTRStat + ", " +  Passive1 + ", " +  Passive1X + ", " );
    PCChestEquip = new PCEquipProto(game, Quality, GotEquip, PCSTRStat, Passive1, Passive1X);
}

function aaaaEquipTestWeapon(){
    var Quality = GenerateQuality();
    console.log("The Quality multiplier is " + Quality);
    var GotEquip = true;
    var PCSTRStat = Quality * randomIntInRange(25,30);
    var Passive1 = GeneratePassive(Quality);
    var Passive1X = GeneratePassiveX(Passive1, Quality);
    console.log("the rolled values for a new weapon were " +  Quality + ", " +  GotEquip + ", " +  PCSTRStat + ", " +  Passive1 + ", " +  Passive1X + ", " );
    PCWeaponEquip = new PCEquipProto(game, Quality, GotEquip, PCSTRStat, Passive1, Passive1X);
}