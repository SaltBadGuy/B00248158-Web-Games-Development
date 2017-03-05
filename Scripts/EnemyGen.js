/**
 * Created by Callum on 02/03/2017.
 */
function GenerateEnemy(game, EnemyID, xpos, ypos, EnemyArr, scalenum){
    EnemyID++;
    var Quality = GenerateQuality();
    console.log("The Enemy Quality multiplier is " + Quality);
    var ENSTRStat = Quality * randomIntInRange(20,30);
    var ENPassive = GeneratePassive(Quality);
    //var ENPassiveX = GeneratePassiveX(ENPassive, Quality);
    console.log("the rolled values for a new enemy were " +  Quality  + ", " +  ENSTRStat + ", " +  ENPassive + ", ");
    var GeneratedEnemy = new EnemyProto(game, xpos, ypos, EnemyID, Quality, ENSTRStat, ENPassive, scalenum);
    console.log("the rolled values for a new enemy were " +  GeneratedEnemy.Quality + ", " +  GeneratedEnemy.ENSTRStat + ", " +  GeneratedEnemy.ENPassive);
    EnemyArr.push(GeneratedEnemy);
}
