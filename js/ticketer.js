var allInputs;
var toAppend = ["Store #:", "Caller's Name:", "iPad Identifier:", "Verifone Sled Serial #:"];

$(function(){

	$(":checkbox").click(function(){
		if ($(this).prop("checked")) {
			$(this).parent().children(":text").fadeTo("slow", 0, function(){$(this).prop("disabled", true);});
		} else {
			$(this).parent().children(":text").prop("disabled", false);
			$(this).parent().children(":text").fadeTo("slow", 1, function(){});
		}
	});
	$("#submit").click(function(){
		var lawg = '';
		allInputs = $( ":input" );
		for (i = 0; i < 4; i++){
			lawg += toAppend[i] + " " +allInputs[i].value + "\n";
		}
		console.log(lawg);

	});
});