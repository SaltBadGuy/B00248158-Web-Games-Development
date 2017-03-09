/**
 * Created by Callum on 05/03/2017.
 */

/** Simple movement */
function PCMoveUp(PC){
    PC.pcsprite.y -= 32;

}

function PCMoveDown(PC){
    PC.pcsprite.y += 32;

}

function PCMoveLeft(PC){
    PC.pcsprite.x -= 32;


}

function PCMoveRight(PC){
    PC.pcsprite.x += 32;

}