/**
 * Created by Callum on 02/03/2017.
 */
function GenerateEnemy(game, xpos, ypos, EnemyArr, scalenum){

    var Quality = GenerateQuality();
    console.log("The Enemy Quality multiplier is " + Quality);
    var ENSTRStat = Quality * randomIntInRange(20,30);
    var ENPassive = GeneratePassive(Quality);
    var ENPassiveX = GeneratePassiveX(ENPassive, Quality);
    console.log("the rolled values for a new enemy were " +  Quality  + ", " +  ENSTRStat + ", " +  ENPassive + ", " +  ENPassiveX + ", " );
    var GeneratedEnemy = new EnemyProto(game, xpos, ypos, Quality, ENSTRStat, ENPassive, ENPassiveX, scalenum);
    console.log("the rolled values for a new enemy were " +  GeneratedEnemy.Quality + ", " +  GeneratedEnemy.ENSTRStat + ", " +  GeneratedEnemy.Passive1 + ", " +  GeneratedEnemy.Passive1X + ", " );
    EnemyArr.push(GeneratedEnemy);
}
