//hides instructions div and button div so the articles div shows
$("#button").click(function () {
    $("#button").fadeOut("slow");
    $("#instructions").fadeOut("slow");

    $.getJSON("/articles", function (data) {
        console.log(data);
    });

});

//articles div are hidden so the instructions and button are brought back again
$("#logoImage").click(function () {
    $("#articles").fadeOut("slow");
    $("#button").fadeIn("slow");
    $("#instructions").fadeIn("slow");
});
