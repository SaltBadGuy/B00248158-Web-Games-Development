/**
 * Created by Callum on 02/03/2017.
 */
/**
 *
 * @return {number}
 * @constructor
 */
function GenerateQuality() {
    var RNG = randomIntInRange(1, 101);
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
function GeneratePassive(Quality){
    var PassiveArray = [
        "Lifesteal", "Critical", "Burn", "Parry"
    ];
    //
    var ChosenPassive = PassiveArray[Math.floor(Math.random() * PassiveArray.length)];
    console.log("The Passive rolled was " + ChosenPassive);
    return ChosenPassive;
}

/**
 *
 * @param ChosenPassive
 * @param Quality
 * @return {number}
 * @constructor
 */
function GeneratePassiveX(ChosenPassive, Quality){
    //(ChosenPassive.PassMod) *
    var ChosenPassiveX = (Quality * (Math.floor(Math.random()*5)) + 1);
    console.log("The PassiveX rolled was " + ChosenPassiveX);
    return ChosenPassiveX;
}

/**
 *
 * @return {string}
 * @constructor
 */
function GenerateType(){
    var TypeArr = [
        "Helmet", "ChestArmour", "Weapon"
    ];
    var ChosenType= TypeArr[Math.floor(Math.random() * TypeArr.length)];
    return ChosenType;
}