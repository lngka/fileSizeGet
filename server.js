// init the app
const express = require("express");
const multer = require("multer");
const app = express();

// init multer, I wanna save uploaded files with their name intact
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  }
});

const uploadMiddleware = multer({ "storage": multerStorage });

// init public folder
app.use(express.static(__dirname + "/public"));

// serve homepage
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
})

// accept file via POST
app.post("/upload", uploadMiddleware.single("someFile"), function(req, res) {
  var answer = {
    "originalname": req.file.originalname,
    "byteSize": req.file.size,
    "mimetype": req.file.mimetype,
    "encoding": req.file.encoding
  };
  res.status(200).json(answer);
});

app.listen(process.env.PORT, () => {
  console.log("Server listens on PORT: " + process.env.PORT);
});