//hides instructions div and button div so the articles div shows
$("#button").click(function () {
    $("#button").fadeOut("slow");
    $("#instructions").fadeOut("slow");
    $("#savedArticles").empty();
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
                    "<p>" + data[i].author + "</p>" + "<div>" + "<button class=remove>Remove" + "</button>" +
                    "<button class=comment>Comment" + "</button>" + 
                    "<button class=savedArticle data-id='" + data[i]._id + "'>Save Article" + "</button>" + 
                    "</div>" +
                    "</div>");
                
            }
        }
    });

});

//removing a certain article
$("#articles").on("click", "button.remove", function () {
    console.log("remove");
});


//adding comments to a certain article
$("#articles").on("click", "button.comment", function () {
    console.log("comment");
});


//saving articles
$("#articles").on("click", "button.savedArticle", function () {
    
var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  }).done(function(data) {
      console.log(data);
      
      $('.appNewArt').remove();

      $(".nav-wrapper").append("<div class=appNewArt>" + "<button class=savedAppArt " + "style=float:" + "right; " + "  >Saved Articles!"  + "</button>" + "</div>");
    
      $("#articles").fadeOut("slow");
      $("#savedArticles").fadeIn("slow");
      
        // Display the information on the page
       $("#savedArticles").append(
            "<div class=stories>" +
            "<h2 id=headline>Headline " + "<br>" + "<br>" + data.headline + "</h2>" +
            "<p id=summaries>" + data.summary + "</p>" +
            "<p>" + data.author + "</p>" + 
            "<div>" );
                
    
      
    });
    
    Materialize.toast('You saved an article!', 3000)
});


//articles div are hidden so the instructions and button are brought back again
$("#logoImage").click(function () {
    $("#articles").fadeOut("slow");
    $("#button").fadeIn("slow");
    $("#instructions").fadeIn("slow");
});
