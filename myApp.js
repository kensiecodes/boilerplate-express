let express = require("express");
let app = express();
require("dotenv").config();

//middleware that logs the method/path/ip for each request
app.use("/", function (req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
  //next prevents server from getting stuck infinitely on one request
});

//css
//express.static is middleware that handles static files like css, images, and js files
app.use("/public", express.static(__dirname + "/public"));

//api
app.use("/json", function (req, res) {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE == "uppercase") {
    message = message.toUpperCase();
  }
  res.json({ message: message });
});

//html file
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

//middleware first function
//handler second function
app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  }
);

module.exports = app;
