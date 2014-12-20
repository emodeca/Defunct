$(document)
		.ready(
				function() {
					var maxBrkTot;
					$('#8Hr').click(function() {
						maxBrkTot = 30 * 60000;
						StartUp();
					});
					$('#10Hr').click(function() {
						maxBrkTot = 45 * 60000;
						StartUp();
					});

					function StartUp() {
						$("#btC").html('None, yet');
						$("#btT").html('All of it!');
						$('#8or10').slideUp(500);
						var strt = setTimeout(function() {
							$('#timer').slideDown(500);
						}, 500);
						$('#timeIn').prop("disabled", false)
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
						if (trackTotal > maxBrkTot || trackBrk > maxBrkCur) {
							$("body").css('background-color', "#d00");
						} else if ((maxBrkTot - trackTotal) < (10 * 60000)
								|| (maxBrkCur - trackBrk) < (5 * 60000)) {
							$("body").css('background-color', "#f90");
						} else {
							$("body").css('background-color', "#aaa");
						}
						$("#btC").html(millisecondsToStr(maxBrkCur - trackBrk));
						$("#btT").html(
								millisecondsToStr(maxBrkTot - trackTotal));
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

						$('#timeIn').prop("disabled", true);
						totalBrk = trackBrk = trackTotal = 0;
						$(".timeVal").css('color', 'black');
						$("#btC").html('None, yet');
						$("#btT").html('All of it!');
						$('#timer').slideUp(500);
						var strt = setTimeout(function() {
							$('#8or10').slideDown(500);
						}, 500);
					}

					function toBrk() {
						timeNow = Date.now();
						$('#resetT').hide();
						$('#timeIn').val('Come back from Break');
						onBrk = 1;
						$("#displayc").html("Current Break Time Remaining:");
						upInt = setInterval(update, 100);
						$('#working').html(breaking);
						$('#working').addClass('rainbow');

					}

					function fromBrk() {
						totalBrk = totalBrk + (Date.now() - timeNow);
						$('#resetT').show();
						$('#timeIn').val('Go on Break');
						onBrk = 0;
						$("#displayc").html("Last Break Time:");
						$("#btT").html(millisecondsToStr(maxBrkTot - totalBrk));
						$("#btC").html(millisecondsToStr(trackBrk));
						clearInterval(upInt);
						$('#working').html(working);
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
							minutes = Math.ceil((temp % 3600) / 60); // if
							// negative,
							// round
							// up
						} else {
							minutes = Math.floor((temp % 3600) / 60); // if
							// positive,
							// round
							// down
						}

						if (Math.abs(Math.floor(temp % 60)) < 10
								&& minutes === 0) {
							seconds = Math.floor(temp % 60);
						} else if (Math.abs(Math.floor(temp % 60)) < 10) { // if
							// minutes,
							// add
							// leading
							// zeroes
							seconds = '0' + Math.abs(Math.floor(temp % 60));
						} else {
							seconds = Math.floor(temp % 60);
						}

						if (minutes) {
							return minutes + ':' + seconds;
						} else {
							return seconds + ' second' + numberEnding(seconds);
						}
						return '0';
					}
				});