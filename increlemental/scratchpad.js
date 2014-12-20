//tuptup


var currDmg = 10;
var mHP = 100
var Monster = new Object()

function genMonster() {
    currDmg = 0;
    mHP += Math.random() * mHP;
    $("#dmg").text(currDmg.toFixed(1) + " / " + mHP.toFixed(0));
    $("#hpbar").progressbar({
        value: 0
    });
}