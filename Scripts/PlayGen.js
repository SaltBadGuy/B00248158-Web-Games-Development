/**
 * Created by Callum on 07/04/2017.
 */
function PlayGen(game, height, width, cellsize, gridwidth, gridheight, gridwidthgap, gridheightgap, GridArr, EnemyArr, ChestArr, scalenum, PC, StairObject, EnemyID, ChestID, EquipID, CurrentFloor) {

    console.log(GridArr);
    console.log(PC);
    console.log(StairObject);

    console.log("Creating a new floor!");

    var NewStair;

    GenerateFloor(game, height, width, cellsize, gridwidth, gridheight, gridwidthgap, gridheightgap, GridArr, EnemyArr, ChestArr, scalenum, PC, StairObject, CurrentFloor);

    console.log(GridArr);

    PC = SpawnPlayer(game, PC, height, width, GridArr, scalenum);
    console.debug(PC);

    GenerateThings(game, height, width, GridArr, EnemyArr, EnemyID, ChestArr, ChestID, EquipID, scalenum, PC, CurrentFloor);

    for (var i = 0; i < width - 1; i++){
        for (var j = 0; j < height - 1; j++){
            if (GridArr[i][j].TileType === 6){
                console.log("Found Stairs");
                NewStair = GridArr[i][j];
                console.log(NewStair);
            }
        }
    }


    console.log(CurrentFloor);
    console.log(GridArr);
    console.log(PC);
    console.log(StairObject);

    CurrentFloor++;

    var ReturnStuff={};

    ReturnStuff.GridArr = GridArr;
    ReturnStuff.PC = PC;
    ReturnStuff.StairObject = NewStair;
    ReturnStuff.CurrentFloor = CurrentFloor;

    console.log(ReturnStuff);

    return ReturnStuff;

}