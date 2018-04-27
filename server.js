// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//THIS IS MY TEST COMMENT!
// Variables to store table and waitlist information
var tables= [];
var waitlist = [];


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});


app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});

app.get("/api/tables", (req, res) =>{
  return res.json(tables);
})

app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var reservation = req.body;
  if (tables.length === 5) {
    waitlist.push(reservation);
    res.json(waitlist);
  }
  else {
  console.log(reservation);

  tables.push(reservation);
  res.json(tables);
};
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
