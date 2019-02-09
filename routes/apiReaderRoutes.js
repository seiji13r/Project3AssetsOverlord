const express = require("express");
const router = express.Router();
const db = require("../models");

// Routes
// =============================================================

// GET route for getting all of the readers
router.get("/api/readers/", function(req, res) {
  db.Reader.findAll({}).then(function(dbReader) {
    res.json(dbReader);
  });
});

// Get route for returning readers of a specific category
router.get("/api/readers/category/:category", function(req, res) {
  db.Poduct.findAll({
    where: {
      category: req.params.category
    }
  }).then(function(dbReader) {
    res.json(dbReader);
  });
});

// Get route for retrieving a single reader
router.get("/api/readers/:id", function(req, res) {
  db.Reader.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(dbReader) {
    res.json(dbReader);
  });
});

// POST route for saving a new reader
router.post("/api/readers/", function(req, res) {
  db.Reader.create({
    name: req.body.name,
    mac: req.body.mac,
    ip: req.body.ip,
    firmware: req.body.firmware,
    antenna_port: req.body.antenna_port,
    brand: req.body.brand,
    model: req.body.model,
    location: req.body.location,
    notes: req.body.notes
  }).then(function(dbReader) {
    res.json(dbReader);
  });
});

// DELETE route for deleting readers
router.delete("/api/readers/:id", function(req, res) {
  db.Reader.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dbReader) {
    res.json(dbReader);
  });
});

// PUT route for updating readers
router.put("/api/readers", function(req, res) {
  db.Reader.update(
    {
      name: req.body.name,
      mac: req.body.mac,
      ip: req.body.ip,
      firmware: req.body.firmware,
      antenna_port: req.body.antenna_port,
      brand: req.body.brand,
      model: req.body.model,
      location: req.body.location,
      notes: req.body.notes
    },
    {
      where: {
        id: req.body.id
      }
    }
  ).then(function(dbReader) {
    res.json(dbReader);
  });
});

module.exports = router;
