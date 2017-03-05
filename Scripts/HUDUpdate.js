/**
 * Created by Callum on 24/02/2017.
 */
function UpdateHudElements(game, HudText, setText, PC, enemy) {
    HudText.PCHPText.setText("HP = " + PC.PCCURHP + "/" + PC.PCMAXHP);

    HudText.PCCURHP.setText("HP = " + PC.PCCURHP + "/" + PC.PCMAXHP);

    game.PCSTRText.setText("STR = " + PC.PCSTR);

    game.PCPATKText.setText("ATK = " + PC.PCPATK);

    game.PCPDEFText.setText("DEF = " + PC.PCPDEF);

    game.EnemyHP.setText("Enemy HP is " + enemy.ENHP);

    HudText.PCHPText.setText("aaa");

    HudText.PCHPText = "aaa";
}