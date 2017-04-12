/**
 * Created by Callum on 05/03/2017.
 */

/**
 * Heavily based on Alistair McMonnies' random maze generator given in university labs, was the inspiration for this whole game in fact.
 * Generates the floor tiles in a grid of i x j dimensions. Tiles are intended to be 32x32.
 * @constructor
 */
function GenerateFloor(game, height, width, cellsize, gridwidth, gridheight, gridwidthgap, gridheightgap, GridArr, EnemyArr, ChestArr, scalenum, PC, StairObject, CurrentFloor) {
    /** cellsize -Used to determine the size (in pixels) of the cells
     * gridwidth -Used to determine the width of the grid, later used to orientate the grid to the top and right of the screen*/

    console.log("Grid size is " + gridwidth);
    console.log("Grid width gap is " + gridwidthgap);
    console.log("Grid height gap is " + gridheightgap);

    var i;
    var j;
    var GridReturn;

    /*GridArr = [
        [1, 2],
        [3, 4],
        [5, 6],
        [7, 8],
        [9, 10],
        [11, 12],
        [13, 14],
        [15, 16],
        [17, 18],
        [19, 20],
        [21, 22],
        [23, 24],
        [25, 26],
        [27, 28],
        [29, 30],
        [31, 32],
        [33, 34],
        [35, 36],
        [37, 38]
    ];*/

    EnemyArr.length = 0;
    ChestArr.length = 0;

    for (i = width; i >= 0; i--) {
        for (j = height; j >= 0; j--) {

            //GridArr[i][j] = game.add.sprite(16 * i ,16 * j, 'DHFloor');
            console.log(i + ", " + j);
            GridArr[i][j] = new TileProto(game, gridwidthgap + (cellsize * i), (cellsize * j), 'DHFloor', scalenum);
            //console.log("GridArr[" + i + "][" + j + "] is " + GridArr[i][j]);
            //var go = game.add.sprite(160 + (32 * i), 32 * j, 'DHFloor');
            //GridArr[i][j].TileSprite.scale.setTo(2, 2);
        }
    }
    for (i = width; i >= 0; i--) {
        for (j = height; j >= 0; j--) {
            GridArr[0][j].TileType = 1;
            //GridArr[0][j].TileSprite = MakeObject(game, GridArr[i][j], GridArr[i][j].TileXPos, GridArr[i][j].TileYPos, 'DHFloor', 'DHBedrock', 'DHWall', 'DHChest', 'DHEnemy', 'DHPC', 'DHStairs', scalenum);
            GridArr[i][0].TileType = 1;
            //GridArr[i][0].TileSprite = MakeObject(game, GridArr[i][j], GridArr[i][j].TileXPos, GridArr[i][j].TileYPos, 'DHFloor', 'DHBedrock', 'DHWall', 'DHChest', 'DHEnemy', 'DHPC', 'DHStairs',  scalenum);
            GridArr[width][j].TileType = 1;
            //GridArr[14][j].TileSprite = MakeObject(game, GridArr[i][j], GridArr[i][j].TileXPos, GridArr[i][j].TileYPos, 'DHFloor', 'DHBedrock', 'DHWall', 'DHChest', 'DHEnemy', 'DHPC', 'DHStairs', scalenum);
            GridArr[i][height].TileType = 1;
            //GridArr[i][14].TileSprite = MakeObject(game, GridArr[i][j], GridArr[i][j].TileXPos, GridArr[i][j].TileYPos, 'DHFloor', 'DHBedrock', 'DHWall', 'DHChest', 'DHEnemy', 'DHPC', 'DHStairs', scalenum);
            //GridArr[i][j].TileSprite = MakeObject(game, GridArr[i][j], GridArr[i][j].TileXPos, GridArr[i][j].TileYPos, 'DHFloor', 'DHBedrock', 'DHWall', scalenum);
        }
    }

    // Generate a 'grid' of walls with floor tile_image (cells) between them...
    for (i = 1; i < (height - 1); i += 2) {
        for (j = 1; j < (width - 1); j += 2) {
            console.log(i + ", " + j);
            GridArr[i][j].TileType = 0;
        }
    }

    // First open up cells - every other row/column is FLOOR...
    //this.generateCells(height, width);
    // Now follow the Binary Tree algorithm to generate the paths between cells...
    for (i = 1; i < height - 1; i += 2) {
        for (j = 1; j < width - 1; j += 2) {
            if (Math.random() < 0.5) {
                GridArr[i][j + 1].TileType = 0;
            } else {
                GridArr[i + 1][j].TileType = 0;
            }
        }
    }
    // Finally need to clear a path at the bottom and right...
    for (j = 2; j < width - 2; j += 2) {
        GridArr[height - 2][j].TileType = 0;
    }
    for (i = 2; i < height - 2; i += 2) {
        GridArr[i][width - 2].TileType = 0;
    }
    // And define the ways in and out...
    var PlayerSpawned = false;
    var StairsSpawned = false;
    do {
        i = 2 * parseInt((Math.random() * width / 3), 10) + 1;
        console.log(parseInt((Math.random() * width / 3), 10));
        j = 2 * parseInt((Math.random() * width / 3), 10) + 1;
        //Generate Player Spawn Tile if it doesn't exist
        if (PlayerSpawned === false){
            if (GridArr[i][j].TileType === 0) {
                console.log("Spawning Player");
                GridArr[i][j].TileType = 5;
                PlayerSpawned = true;
            }
        }
        //Generate Staircase tile
        if (StairsSpawned === false){
            if (GridArr[i][j].TileType === 0) {
                console.log("Spawning Staircase");
                GridArr[i][j].TileType = 6;
                StairsSpawned = true;
            }
        }
    }while (PlayerSpawned === false || StairsSpawned === false);

    console.log("Escaped the loop with PlayerSpawned " + PlayerSpawned + " and StairsSpawned " + StairsSpawned);

    var ChestPool = parseInt((Math.random() *  2), 10) + 3;
    var EnemyPool = parseInt((Math.random() *  5), 10) + 3;
    do {
        i = parseInt((Math.random() *  width - 1), 10);
        j = parseInt((Math.random() *  width - 1), 10);

        if (GridArr[i][j].TileType === 0) {
            GridArr[i][j].TileType = 3;
            ChestPool--;
        }
        if (ChestPool === 0){
            break;
        }
    } while (ChestPool > 0);

    do {
        i = parseInt((Math.random() *  height - 1), 10);
        j = parseInt((Math.random() *  height - 1), 10);

        if (GridArr[i][j].TileType === 0) {
            GridArr[i][j].TileType = 4;
            EnemyPool--;
        }
        if (EnemyPool === 0){
            break;
        }
    } while (EnemyPool > 0);




    for (i = width; i >= 0; i--) {
        for (j = height; j >= 0; j--) {
            //GridArr[i][j].TileSprite =
            GridReturn = MakeObject(game, GridArr[i][j], i, j, GridArr[i][j].TileXPos, GridArr[i][j].TileYPos, 'DHFloor', 'DHBedrock', 'DHWall', 'DHChest', 'DHEnemy', 'DHPC', 'DHStairs', scalenum, PC, EnemyArr, ChestArr, StairObject);
        }
    }
}