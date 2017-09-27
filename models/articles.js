var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    headline: {
        type: String,
        required: true,
    },

    summary: {
        type: String
    },

    author: {
        type: String
    }
})


var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
