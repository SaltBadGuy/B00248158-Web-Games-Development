/**
 * Created by Callum on 02/03/2017.
 */
function GeneratePlayer(game, xpos, ypos, scalenum) {
    this.PCGen = new PCCharProto(game, xpos, ypos, scalenum);
    //console.log(this.PCGen.PCPassive.length);
    this.PCGen.pcsprite.scale.setTo(scalenum, scalenum);
    return this.PCGen;
}