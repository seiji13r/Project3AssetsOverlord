// Require Express and Express Router
const express = require("express");
const router = express.Router();
// Sequelize Models
const db = require("../models");
// MongoJS
const mongojs = require("mongojs");
// MongoDB Configuration
const databaseUrl = process.env.MONGODB_URI || "mongodb://localhost/assets_overlords";
const collections = ["epc_events"];
// Use mongojs to hook the database to the db variable
const dbMongo = mongojs(databaseUrl, collections);
// This makes sure that any errors are logged if mongodb runs into an issue
dbMongo.on("error", function(error) {
  console.log("Database Error:", error);
});

// Routes
// =============================================================
// All the jsons stored in Mongo will be retrieved
router.get("/", (req, res) => {
  // Query: In our database, go to the animals collection, then "find" everything
  dbMongo.epc_events.find({}, (error, found) => {
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
    }
  });
});

// json object in the body will be saved in the database
router.post("/", (req, res) => {
  // console.log(req.body);
  dbMongo.epc_events.insert(req.body, (error, found) => {
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
    }
  });
});

router.get("/delete", (req, res) => {
  // Query: In our database, go to the animals collection, then "find" everything
  dbMongo.epc_events.remove({}, (error, result) => {
    if (error) {
      console.log(error);
    }
    else {
      res.json(result);
    }
  });
});

module.exports = router