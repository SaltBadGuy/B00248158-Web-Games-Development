/**
 * Created by Callum on 02/03/2017.
 */
/**
 *
 * @return {number}
 * @constructor
 */
function GenerateQuality() {
    var RNG = randomIntInRange(1, 100);
    console.log("RNG for quality was rolled as " + RNG);
    if (RNG == 1) {
        return 3;
    }
    else if (RNG > 1 && RNG < 11) {
        return 2;
    }
    else if (RNG > 10 && RNG < 51) {
        return 1.5;
    }
    else {
        return 1;
    }
}

/**
 *
 * @param Quality
 * @return {string}
 * @constructor
 */
function GeneratePassive(IDParam, Quality){
    var ChosenPassives = [];
    console.log(ChosenPassives);
    var GeneratedPassive = {
        ID: IDParam,
        Passive: "AAA",
        PassiveX: "AAA"
    };
    console.log(GeneratedPassive);
    var PassiveAmount;
    var PassiveArray = [
        "Lifesteal", "Critical", "Burn", "Parry"
    ];
    if (Quality == 1){
        PassiveAmount = 0;
    }
    else if (Quality == 1.5){
        PassiveAmount = 1;
    }
    else if (Quality == 2){
        PassiveAmount = 2;
    }
    else if (Quality == 3){
        PassiveAmount = 3;
    }

    for (var i = 0; i < PassiveAmount; i++){
        console.log(ChosenPassives);
        GeneratedPassive.Passive = PassiveArray[Math.floor(Math.random() * PassiveArray.length)];
        GeneratedPassive.PassiveX = Quality * (Math.floor(Math.random()*5)) + 1;
        console.log("Rolled " + GeneratedPassive.Passive + " " + GeneratedPassive.PassiveX + "%");
        ChosenPassives.push(GeneratedPassive);
        console.log(ChosenPassives);
    }
    for (i = 0; i < ChosenPassives.length; i++) {
        console.log("The Passives rolled were " + ChosenPassives[i].Passive + ChosenPassives[i].PassiveX);
    }
    return ChosenPassives;
}

/**
 *
 * @param ChosenPassive
 * @param Quality
 * @return {number}
 * @constructor
 */
/*function GeneratePassiveX(ChosenPassive, Quality){
    var ChosenPassivesX = [];
    if (Quality == 1){
        PassiveAmount = 0;
    }
    else if (Quality == 1.5){
        PassiveAmount = 1;
    }
    else if (Quality == 2){
        PassiveAmount = 2;
    }
    else if (Quality == 3){
        PassiveAmount = 3;
    }
    ChosenPassivesX.push(Quality * (Math.floor(Math.random()*5)) + 1);

    return ChosenPassivesX;
}
*/

/**
 *
 * @return {string}
 * @constructor
 */
function GenerateType(){
    var TypeArr = [
        "Helmet", "ChestArmour", "Weapon"
    ];
    var ChosenType = TypeArr[Math.floor(Math.random() * TypeArr.length)];
    return ChosenType;
}