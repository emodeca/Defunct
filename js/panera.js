var allInputs;
var toAppend = [
    "Store #:",
    "Caller's Name:",
    "iPad Identifier:",
    "Verifone Sled Serial #:",
    "\nSituation/Issue for Initial Contact:",
    "Screen Cracked:",
    "Other recent physical damage or trauma:",
    "Experiencing charging issues:",
    "\nVerified iPad Connected to Panera WiFi Network:",
    "Power-cycled Device and Re-launched Kiosk Application:",
    "Verified MDM Enrolled and Connected:",
    "Verified Credit Card Reader Functionality:",
    "Verified Kiosk Identifier and Verifone Sled Serial Number Match Between Physical Hardware and Control Asset ( ie: Devices Are Married):",
    "Actions Taken to Resolve Issue:",
    "\nResolution:"
];

$('document').ready(function() {
    $("#output").hide();
	$("#identifier").mask("9?9", {placeholder:" "});
	$("#verifoneserial").mask("999-999-999",{placeholder:"#"});

    $("#output").children("textarea").focus(function() {
        var $this = $(this);
        $this.select();

        // Work around Chrome's little problem
        $this.mouseup(function() {
            // Prevent further mouseup intervention
            $this.unbind("mouseup");
            return false;
        });
    });


    $(":checkbox").click(
        function() {
            if (this.checked) {
                $(this).parent().children(":text").fadeTo("fast", 0, function() {
                    $(this).parent().children(":text").prop("enabled", false)
                });

            } else {
                $(this).parent().children(":text").fadeTo("fast", 1, function() {
                    $(this).parent().children(":text").prop("enabled", true)
                });
            }
        });


    $("#submit").click(function() {
        var j = 0;
        var lawg = '';
        allInputs = $(":input");
        for (i = 0; i < toAppend.length; i++) {
            if (allInputs[j].type != "checkbox") {
                lawg += toAppend[i] + " " + allInputs[j].value + "\n";
            } else if (allInputs[j].checked && allInputs[j + 1].id == "why") {
                j++
                lawg += toAppend[i] + " Yes" + "\n";
            } else if (allInputs[j].checked) {
                lawg += toAppend[i] + " Yes" + "\n";
            } else if (!allInputs[j].checked && allInputs[j + 1].id == "why") {
                j++;
                lawg += toAppend[i] + " No. " + allInputs[j].value + "\n";
            } else {
                lawg += toAppend[i] + " No." + "\n";
            }
            j++;
        }
        $("#panera").hide();
        $("#output").children("textarea").val(lawg)
        $("#output").fadeIn("fast");

    });
    $("#edit").click(function() {
        $("#output").hide();
        $("#panera").fadeIn("fast");
    })
});
