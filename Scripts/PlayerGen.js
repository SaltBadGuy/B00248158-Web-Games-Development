/**
 * Created by Callum on 02/03/2017.
 */

function SpawnPlayer(game, height, width, GridArr, scalenum) {
    for (i = 0; i < (height); i++) {
        for (j = 0; j < (width); j++) {
            if (GridArr[i][j].TileType === 5) {
                var GeneratedPlayer = GeneratePlayer(game, GridArr, GridArr[i][j].TileXPos, GridArr[i][j].TileYPos, i, j, scalenum);
                console.log(GeneratedPlayer);
                return GeneratedPlayer;
            }
        }
    }
}

function GeneratePlayer(game, GridArr, xpos, ypos, GridX, GridY, scalenum) {
    this.PCGen = new PCCharProto(game, GridArr, xpos, ypos, GridX, GridY, scalenum);
    this.PCGen.pcsprite.scale.setTo(scalenum, scalenum);
    console.log(this.PCGen);
    return this.PCGen;
}