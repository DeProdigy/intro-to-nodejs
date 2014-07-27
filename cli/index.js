// '6571a0547b8b487a81b5ebf51b913b12';

(function() {
  "use strict";

  var https = require("https"),
  fs = require("fs"),
  id = process.argv[2],
  url = "https://api.instagram.com/v1/media/popular?client_id=" + id,
  chunkHolder = "";

  var App = {
    concatChunks: function(chunk) {
      return chunkHolder += chunk;
    },
    parsedChunks: function() {
      return JSON.parse(chunkHolder.toString()).data;
    },
    deleteFile: function() {
      if (fs.exists('./images.txt')) {
        fs.unlinkSync('./images.txt');
      }
    },
    addToFile: function(image) {
      fs.appendFile("./images.txt", image + '\n', function(err) {
        if (err) {
          console.log("error: ", err);
        }
      });
    },
    extractImage: function(post) {
      return post.images.standard_resolution.url;
    },
    parseAndAdd: function(post) {
      var image = this.extractImage(post);
      this.addToFile(image);
    }
  };

  https.get(url, function(res) {

    res.on("data", function(chunk) {
      App.concatChunks(chunk);
    });

    res.on("end", function() {
      App.deleteFile();
      App.parsedChunks().forEach(function(post) {
        App.parseAndAdd(post);
      });
    });

  });
}());



