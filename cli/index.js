// '6571a0547b8b487a81b5ebf51b913b12';

(function() {
 "use strict";

 var id = process.argv[2];
 var url = "https://api.instagram.com/v1/media/popular?client_id=" + id;
 var https = require("https");
 var concatChunks = "";
 var fs = require("fs");


 https.get(url, function(res) {
   res.on("data", function(chunk) {
     concatChunks += chunk;
   });

   res.on("end", function() {
     var stringRes = JSON.parse(concatChunks.toString());
     stringRes.data.forEach(function(data) {
       var image = data.images.standard_resolution.url;
       fs.appendFile("./images.txt", image + '\n', function(err) {
         if (err) {
          console.log("error: ", err);
        }
      });
     });
   });
 });
}());