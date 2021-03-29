var express = require("express");

var app = express();
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/" + "index.html");
});
app.get("/mapCreation.html", function (req, res) {
  res.sendFile(__dirname + "/" + "mapCreation.html");
});
app.use(express.static(__dirname + "/public")); //__dir and not _dir
var port = 8000;
app.listen(port);
console.log("server on" + port);
