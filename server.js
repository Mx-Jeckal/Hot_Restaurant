// Dependencies
// =============================================================
var express = require("express");

var path = require("path");


var Reservation = require("./lib/reservation");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Reservations (DATA)
// =============================================================
var reservations = []

var waitList = []


// Pages routes -----------------------------------

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "reservations.html"));
});

// API routes -----------------------------

// Displays all characters
app.get("/api/reservations", function(req, res) {
    return res.json(reservations);
});

app.get("/api/waitList", function(req, res) {
    return res.json(waitList);
});

// Displays a single character, or shows "No character found"
app.get("/api/reservations/:id", function(req, res) {
    // Grab the selected parameter
    var id = req.params.id;

    // Filter to show only the selected character
    for (var i = 0; i < reservations.length; i++) {
        if (id === reservations[i].id) {
            return res.json(reservations[i]);
        }
    }

    // Otherwise display "No character found"
    return res.send("No person found!");
});
app.post("/api/reservations", function(req, res) {
    reservations.push(req.body)
    res.json(reservations)
})

// Listener
// ===========================================================
app.listen(PORT, function() {
    console.log("App listening on PORT http://localhost:" + PORT);
})