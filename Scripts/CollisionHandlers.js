/**
 * Created by Callum on 07/03/2017.
 */


function CheckChest(PC, ChestArr){
    console.log(PC);
    console.log(ChestArr);
    console.log(ChestArr.ChestLoot);
    console.log(ChestArr.Looted);
    console.log("Chest Collision");
    /**This checks the chest's content and automatically add items to the player's collection.
     * For Equipment,  */
    if (ChestArr.ChestLoot == "Potion" && ChestArr.Looted == false){
        console.log("Looted a potion!");
        PC.PCPots++;
        ChestArr.Looted = true;
        console.log(PC.PCPots);
    }
    else if (ChestArr.ChestLoot == "Pick" && ChestArr.Looted == false){
        console.log("Looted a pick!");
        PC.PCPicks++;
        ChestArr.Looted = true;
    }
     else if (ChestArr.ChestLoot == "Curse" && ChestArr.Looted == false){
        console.log("Looted a curse!");
        PC.PCCursess++;
        ChestArr.Looted = true;
    }
    else if (ChestArr.ChestLoot instanceof PCEquipProto && ChestArr.Looted == false){
        if(ChestArr.ChestLoot.Type == "Helmet"){
            console.log("Looted a helmet!");
            console.log (PC.PCHeadEquip);
            PC.PCHeadEquip = ChestArr.ChestLoot;
            console.log (PC.PCHeadEquip);
            ChestArr.Looted = true;
        }
        if(ChestArr.ChestLoot.Type == "ChestPlate"){
            console.log("Looted a ChestPlate!");
            console.log (PC.PCChestEquip);
            PC.PCChestEquip = ChestArr.ChestLoot;
            console.log (PC.PCChestEquip);
            ChestArr.Looted = true;
        }
        if(ChestArr.ChestLoot.Type == "Weapon"){
            console.log("Looted a Weapon!");
            console.log (PC.PCWeaponEquip);
            PC.PCWeaponEquip = ChestArr.ChestLoot;
            console.log (PC.PCWeaponEquip);
            ChestArr.Looted = true;
        }
    }

    console.log("BYEP");

    //console.log(obj2.ChestLoot);

    Element5 = "SIMPLYEPIC";
    //Element5 = obj2.ChestLoot;
}

function ColliderEnemy(game, timerEvents, PC, Enemy, InCombat, Turn) {
    console.log(InCombat.InCombat);
    if (InCombat.InCombat == false) {
        console.log("Enemy Collision!");
        InCombat.InCombat = true;
        Combat(game, timerEvents, PC, Enemy, InCombat, Turn);
    }
    else{
        console.log("In combat, not happening");
    }
}


