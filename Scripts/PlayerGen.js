/**
 * Created by Callum on 02/03/2017.
 */

function SpawnPlayer(game, height, width, GridArr, scalenum) {
    for (i = 0; i < (height); i++) {
        for (j = 0; j < (width); j++) {
            if (GridArr[i][j].TileType == 5) {
                var GeneratedPlayer = GeneratePlayer(game, GridArr[i][j].TileXPos, GridArr[i][j].TileYPos, scalenum);
                console.log(GeneratedPlayer);
                return GeneratedPlayer;
            }
        }
    }
}

function GeneratePlayer(game, xpos, ypos, scalenum) {
    this.PCGen = new PCCharProto(game, xpos, ypos, scalenum);
    //console.log(this.PCGen.PCPassive.length);
    this.PCGen.pcsprite.scale.setTo(scalenum, scalenum);
    console.log(this.PCGen);
    return this.PCGen;
}