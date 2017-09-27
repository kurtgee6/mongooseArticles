/* Showing Mongoose's "Populated" Method
 * =============================================== */

// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");

//connecting the Article schema
var Article = require("./models/articles.js");


// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;


// Initialize Express
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Make public a static dir
app.use(express.static("public"));

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/sportsArticles");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function (error) {
    console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function () {
    console.log("Mongoose connection successful.");
});

//scraping articles from the New York Times sport section
app.get("/articles", function (req, res) {

    var url = "https://www.nytimes.com/section/sports";

    request(url, function (err, res, html) {

        var $ = cheerio.load(html);


        //$(".headline .summary .byline").each(function (title, summary, author) {
        $("div.story-meta").each(function (i, element) {

            var title = $(element).find('h2.headline').text();
            var summary = $(element).find('p.summary').text();
            var author = $(element).find('p.byline').text();


            var articles = []

            articles.push({
                headline: title,
                summary: summary,
                author: author
            });

            var entry = new Article(articles);

            // save entry to the db
            entry.save(function (err, doc) {
                // Log  errors
                if (err) {
                    console.log(err);
                }
                // Or log doc
                else {
                    console.log(doc);
                }
            });
        })

    })

    res.send("You've scraped the items");


});


// Listen on port 8000
app.listen(8000, function () {
    console.log("App running on port 8000!");
});
