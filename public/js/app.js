//hides instructions div and button div so the articles div shows
$("#button").click(function () {
    $("#button").fadeOut("slow");
    $("#instructions").fadeOut("slow");
    $("#articles").fadeIn("slow");

    $.getJSON("/articles", function (data) {

        if (typeof data !== 'undefined' && data.length === 0) {
            $("#articles").append("<h1>" + "Sorry, failed to grab data. Please go back and try again. Please click the running man" + "</h1>")
        } else {

            Materialize.toast('To grab more articles, press on the running Man! ', 3000)

            for (var i = 0; i < data.length; i++) {
                $('h1').empty();

                // Display the information on the page
                $("#articles").append("<p data-id='" + data[i].headline + "'>" + data[i].summary + "<br />" + data[i].author + "</p>");
            }

        }
    });

});

//articles div are hidden so the instructions and button are brought back again
$("#logoImage").click(function () {
    $("#articles").fadeOut("slow");
    $("#button").fadeIn("slow");
    $("#instructions").fadeIn("slow");
});
