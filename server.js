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

//scraping articles from the New York Times sport section and saving to database
app.get("/articles", function (req, res) {

    var url = "https://www.nytimes.com/section/sports";

    request(url, function (err, res, html) {

        var $ = cheerio.load(html);


        //$(".headline .summary .byline").each(function (title, summary, author) {
        $("div.story-meta").each(function (i, element) {

            var articles = {}

            articles.headline = $(element).find('h2.headline').text();
            articles.summary = $(element).find('p.summary').text();
            articles.author = $(element).find('p.byline').text();


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

    Article.find({}, function (error, doc) {
        // Log any errors
        if (error) {
            console.log(error);
        }
        // Or send the doc to the browser as a json object
        else {
            res.json(doc);
        }
    });


});


// Listen on port 8000
app.listen(8000, function () {
    console.log("App running on port 8000!");
});
