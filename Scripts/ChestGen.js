/**
 * Created by Callum on 02/03/2017.
 */

function GenerateLoot(){
    GenerateEquip();
}

function GenerateEquip(){

    var EquipType = GenerateType();
    var Quality = GenerateQuality();
    console.log("The Quality multiplier is " + Quality);
    var GotEquip = true;
    var PCSTRStat = Quality * randomIntInRange(5,15);
    var Passive1 = GeneratePassive(Quality);
    var Passive1X = GeneratePassiveX(Passive1, Quality);
    console.log("the rolled values for a new helmet were " +  Quality + ", " +  GotEquip + ", " +  PCSTRStat + ", " +  Passive1 + ", " +  Passive1X + ", " );
    Equip = new PCEquipProto(game, EquipType, Quality, GotEquip, PCSTRStat, Passive1, Passive1X);
    //PCPassives[0];
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