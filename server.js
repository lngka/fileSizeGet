// init the app
const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.sendFile("./views/index.html");
})

app.listen(process.env.PORT, () => {
  console.log("Server listens on PORT: " + process.env.PORT);
});