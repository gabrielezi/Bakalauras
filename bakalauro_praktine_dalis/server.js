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
// --------------------------------------------------------------------------------------
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "/public/images");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname);
  },
});

var morgan = require("morgan");
const upload = multer({ dest: "uploads/" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.post("/upload", upload.single("file"), (req, res) => {
  var img = fs.readFileSync(req.file.path);
  if (!req.body.file) {
    console.log("No file received");
    return res.send({
      success: false,
    });
  } else {
    console.log("file received");
    return res.send({
      success: true,
    });
  }
});
