$(function(){
	$(":checkbox").click(function(){
		if ($(this).prop("checked")) {

			
			$(this).parent().children(":text").fadeTo("slow" , 0, function() {
				$(this).prop("disabled", true);
    			// Animation complete.);
		});

		} else {
			$(this).parent().children(":text").prop("disabled", false);
			$(this).parent().children(":text").fadeTo("slow" , 1, function() {
    			// Animation complete.);

		});
		}
	});
});