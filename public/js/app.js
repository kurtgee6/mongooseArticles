//hides instructions div and button div so the articles div shows
$("#button").click(function () {
    $("#button").fadeOut("slow");
    $("#instructions").fadeOut("slow");
    $("#articles").fadeIn("slow");

    $.getJSON("/articles", function (data) {

        if (typeof data !== 'undefined' && data.length === 0) {
            $("#articles").append("<div id=failed>" + "<h1>" + "Sorry, failed to grab the articles. Please click the running man and try again." + "</h1>" + "</div>")
        } else {

            Materialize.toast('To grab more articles, press on the running Man! ', 4000)

            for (var i = 0; i < data.length; i++) {
                $('#failed').remove();
                $('h1').empty();

                // Display the information on the page
                $("#articles").append(
                    "<div class=stories>" +
                    "<h2 id=headline>Headline " + "<br>" + "<br>" + data[i].headline + "</h2>" +
                    "<p id=summaries>" + data[i].summary + "</p>" +
                    "<p>" + data[i].author + "</p>" +
                    "</div>");
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
