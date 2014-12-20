$(function() {

    $("#hpbar").progressbar({
        value: 0
    });

    /**
    TODO:
        - "Toggle array" ==> enum
        - Add actual mechanics

    **/
    // Global Vars

    $("#body").show();
    var mDefeated = 0;
    var mHP = 100;
    var currDmg = 0;
    var ticks = [10.2, 10.2, 10.2]
    var tog = [false, false, false]; // Array to keep track of which elements are toggled on/off. Could make this an enum/object.
    var resistance = [1, 1, 1];
    var checkint = setInterval(checkTog, 1000); // Game tickrate = 1000ms

    $("#btn1").click(function() { // Button "1" click
        if (tog[0]) {
            tog[0] = false; // trip toggle off
            $("#val1").text('Off');
            $("#val1").css({
                backgroundColor: "#b00" // red for off
            });

        }
        else {
            tog[0] = true; // trip toggle on
            $('#val1').text('On');
            $('#val1').css({
                backgroundColor: "#0b0" // green for on
            });
        }
    });

    $("#btn2").click(function() {
        if (tog[1]) {
            tog[1] = false;
            $("#val2").text('Off');
            $("#val2").css({
                backgroundColor: "#b00"
            });
        }
        else {
            tog[1] = true;
            $("#val2").text('On');
            $("#val2").css({
                backgroundColor: "#0b0"
            });
        }
    });
    $("#btn3").click(function() {
        if (tog[2]) {
            tog[2] = false;
            $("#val3").text('Off');
            $("#val3").css({
                backgroundColor: "#b00"
            });
        }
        else {
            tog[2] = true;
            $("#val3").text('On');
            $("#val3").css({
                backgroundColor: "#0b0"
            });
        }
    });

    function checkTog() {
        ticks.forEach(doDmg);
        if (currDmg <= mHP) {
            $("#dmg").text(currDmg.toFixed(0) + " / " + mHP.toFixed(0));
            $("#hpbar").progressbar({
                value: (currDmg / mHP) * 100
            });

        }
        else {
            $("#dmg").text(mHP.toFixed(0) + " / " + mHP.toFixed(0));
            $("#hpbar").progressbar({
                value: 100
            });
            mDefeated++;
            genMonster();
        }
    }

    function genMonster() {
        currDmg = 0;
        mHP += Math.random() * mHP
        $("#dmg").text(currDmg.toFixed(1) + " / " + mHP.toFixed(0));
        $("#hpbar").progressbar({
            value: 0
        });
    }

    function doDmg(tickDmg, i) {
        currDmg += (tickDmg * tog[i]) - resistance[i];
    }
});