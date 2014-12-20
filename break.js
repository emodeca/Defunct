$(window).load(function() {
    $(rdy);
    var maxBrkTot;

    function rdy() {
        $('#8or10').fadeIn(1000);
        reset();
    }

    $('#8Hr').click(function() {
        maxBrkTot = 30 * 60000;
        StartUp();
    });
    $('#10Hr').click(function() {
        maxBrkTot = 45 * 60000;
        StartUp();
    });

    function StartUp() {
        $('#8or10').fadeOut(1000);
		var strt = setInterval(function(){$('#timer').fadeIn(2000);}, 1000);
    }


    var working = 'Working<span class="one">.</span><span class="two">.</span><span class="three">.</span>';
    var breaking = "ON BREAK!";

    var totalBrk = 0;
    var timeNow = 0;
    var onBrk = 0;
    var upInt;
    var trackBrk = 0;
    var trackTotal = 0;
    var maxBrkCur = 15 * 60000;

    function update() {
        trackBrk = (Date.now() - timeNow);
        trackTotal = totalBrk + trackBrk;
        if (trackTotal > maxBrkTot) {
            document.getElementById("btT").style.color = "#d00";
        } else if ((maxBrkTot - trackTotal) < (10 * 60000)) {
            document.getElementById("btT").style.color = "#f90";
        } else {
            document.getElementById("btT").style.color = "#000";
        }

        if (trackBrk > maxBrkCur) {
            document.getElementById("btC").style.color = "#d00";
        } else if ((maxBrkCur - trackBrk) < (5 * 60000)) {
            document.getElementById("btC").style.color = "#f90";
        } else {
            document.getElementById("btC").style.color = "#000";
        }
        document.getElementById("btC").innerHTML = millisecondsToStr(maxBrkCur - trackBrk);
        document.getElementById("btT").innerHTML = millisecondsToStr(maxBrkTot - trackTotal);
    }

    $('#timeIn').click(function() {
        if (!onBrk) {
            toBrk();
        } else {
            fromBrk();
        }
    });
    $('#resetT').click(function() {
        reset();
    });

    function reset() {

        totalBrk = 0;
        trackBrk = 0;
        trackTotal = 0;
        document.getElementById("btT").style.color = "#000";
        document.getElementById("btC").innerHTML = 'None, yet';
        document.getElementById("btT").innerHTML = 'All of it!';
    }

    function toBrk() {
        timeNow = Date.now();
        $('#resetT').hide();
        $('#timeIn').val('Come back from Break');
        onBrk = 1;
        document.getElementById("displayc").innerHTML = "Current Break Time Remaining:";
        upInt = setInterval(update, 100);
        $('body').addClass('fadechange');
        document.getElementById('working').innerHTML = breaking;
        $('#working').addClass('rainbow');

    }

    function fromBrk() {
        totalBrk = totalBrk + (Date.now() - timeNow);
        $('#resetT').show();
        $('#timeIn').val('Go on Break');
        onBrk = 0;
        document.getElementById("displayc").innerHTML = "Last Break Time:";
        document.getElementById("btT").innerHTML = millisecondsToStr(maxBrkTot - totalBrk);
        document.getElementById("btC").innerHTML = millisecondsToStr(trackBrk);
        clearInterval(upInt);
        $('body').removeClass('fadechange');
        document.getElementById('working').innerHTML = working;
        $('#working').removeClass('rainbow');

    }

    function millisecondsToStr(milliseconds) {
        function numberEnding(number) {
            return (Math.abs(number) > 1) ? 's' : '';
        }
        var temp = milliseconds / 1000;
        var minutes = 0;
        var seconds = 0;
        if (temp < 0) {
            minutes = Math.ceil((temp % 3600) / 60); // if negative, round up
        } else {
            minutes = Math.floor((temp % 3600) / 60); // if positive, round down
        }

        if (Math.abs(Math.floor(temp % 60)) < 10 && minutes === 0) { // if only seconds, no leading 0's
            seconds = Math.floor(temp % 60);
        } else if (Math.abs(Math.floor(temp % 60)) < 10) { // if minutes, add leading zeroes
            seconds = '0' + Math.abs(Math.floor(temp % 60));
        } else {
            seconds = Math.floor(temp % 60);
        }

        if (minutes) {
            return minutes + ':' + seconds;
        } else {
            return seconds + ' second' + numberEnding(seconds);
        }
        return '0'; //'just now' //or other string you like;
    }
});