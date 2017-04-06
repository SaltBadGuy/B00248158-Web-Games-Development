/**
 * Created by Callum on 06/04/2017.
 */

function ActivatePotion(PC){
    if (PC.PCPots > 0){
        PC.PCCURHP += (PC.PCMAXHP / 4);
        PC.PCPots--;
    }
}

function ActivatePick(PC){
    if (PC.PCPicks > 0){
        if (!PC.PicksActive) {
            PC.PicksActive = true;
            PC.PCPicks--;
        }
    }
}

function ActivateCurse(PC){
    if (PC.PCCurses > 0){
        if (!PC.CursesActive) {
            PC.CursesActive = true;
            PC.PCCurses--;
        }
    }
}