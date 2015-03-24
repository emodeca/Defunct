$(document).ready(

	function() {
		$("#timer").hide();
					// Global Vars
					var vars = {
						totalBrk : 0,
						timeNow : 0,
						onBrk : 0,
						trackBrk : 0,
						trackTotal : 0,
						maxBrkCur : 15 * 60000,
						maxBrkTot : 0
					};
					var upInt;
					var working = 'Working...';
					var breaking = "ON BREAK!";
					if (localStorage.length) {
						var tempvars = JSON.parse(localStorage.getItem('vars'));
						console.log(tempvars);
						$('#8or10').hide();
						$('#timer').show();
						vars = tempvars;
						if (vars.onBrk) {
							toBrk();
						} else {
							$("#displayc").html("Last Break Time:");
							$("#btT").html(
									millisecondsToStr(vars.maxBrkTot
											- vars.totalBrk));
							$("#btC").html(millisecondsToStr(vars.trackBrk));
						}
					}

					// Functions

					function update() {
						vars.trackBrk = (Date.now() - vars.timeNow);
						vars.trackTotal = vars.totalBrk + vars.trackBrk;
						$("#btC").html(
								millisecondsToStr(vars.maxBrkCur
										- vars.trackBrk));
						$("#btT").html(
								millisecondsToStr(vars.maxBrkTot
										- vars.trackTotal));
						localStorage.setItem('vars', JSON.stringify(vars));

					}

					function StartUp() {
						$("#btC").html('None, yet');
						$("#btT").html('All of it!');
						$('#8or10').slideUp(500);
						setTimeout(function(){	$('#timer').slideDown(500);},500);
						$('#timeIn').prop("disabled", false);
					}

					function toBrk() {
						vars.onBrk = 1;
						$('#resetT').hide();
						$('#timeIn').val('Come back from Break');
						$("#displayc").html("Current Break Time Remaining:");
						$('#working').html(breaking);
						$('#working').addClass('rainbow');
						localStorage.setItem('vars', JSON.stringify(vars));
						update();
						upInt = setInterval(update, 200);
					}

					function fromBrk() {
						vars.totalBrk = vars.totalBrk
								+ (Date.now() - vars.timeNow);
						$('#resetT').show();
						$('#timeIn').val('Go on Break');
						vars.onBrk = 0;
						$("#displayc").html("Last Break Time:");
						$("#btT").html(
								millisecondsToStr(vars.maxBrkTot
										- vars.totalBrk));
						$("#btC").html(millisecondsToStr(vars.trackBrk));
						clearInterval(upInt);
						$('#working').html(working);
						$('#working').removeClass('rainbow');
						localStorage.setItem('vars', JSON.stringify(vars));

					}

					function millisecondsToStr(milliseconds) {
						function numberEnding(number) {
							return (Math.abs(number) > 1) ? 's' : '';
						}
						var temp = milliseconds / 1000;
						var minutes = 0;
						var seconds = 0;
						if (temp < 0) {
							minutes = Math.ceil((temp % 3600) / 60);
							seconds = Math.ceil(temp % 60);
						} else {
							minutes = Math.floor((temp % 3600) / 60);
							seconds = Math.floor(temp % 60);
						}
						if (!minutes) {
							return seconds + ' second' + numberEnding(seconds);
						} else if (seconds < 10) {
							seconds = Math.abs(seconds.toString())
							return minutes + ':0' + seconds;
						} else {
							return minutes + ':' + Math.abs(seconds);
						}
					}

					function reset() {

						vars = {
							totalBrk : 0,
							timeNow : 0,
							onBrk : 0,
							trackBrk : 0,
							trackTotal : 0,
							maxBrkCur : 15 * 60000,
							maxBrkTot : 0
						};
						$('#timeIn').prop("disabled", true);
						vars.totalBrk = vars.trackBrk = vars.trackTotal = 0;
						$("#btC").html('None, yet');
						$("#btT").html('All of it!');
						$('#timer').slideUp(500);
						var strt = setTimeout(function() {
							$('#8or10').slideDown(500);
						}, 500);
						clearInterval(upInt)
						delete localStorage.vars;
					}

					// Interaction

					$('#8Hr').click(function() {
						vars.maxBrkTot = 30 * 60000;
						StartUp();
					});

					$('#10Hr').click(function() {
						vars.maxBrkTot = 45 * 60000;
						StartUp();
					});

					$('#timeIn').click(function() {
						if (!vars.onBrk) {
							vars.timeNow = Date.now();
							toBrk();
						} else {
							fromBrk();
						}
					});
					$('#resetT').click(function() {
						reset();
					});
				});