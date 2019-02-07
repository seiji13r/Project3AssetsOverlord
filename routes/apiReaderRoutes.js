const db = require("../models");
// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all the registered readers
  app.get("/api/readers/", function(req, res) {
    db.Reader.findAll({}).then(function(dbReader) {
      res.json(dbReader);
    });
  });

  // Get route for retrieving a specific reader
  app.get("/api/readers/:id", function(req, res) {
    db.Reader.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbReader) {
      res.json(dbReader);
    });
  });

  // POST route for registering a new reader
  app.post("/api/readers/", function(req, res) {
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
  app.delete("/api/readers/:id", function(req, res) {
    db.Reader.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbReader) {
      res.json(dbReader);
    });
  });

  // PUT route for updating reader information
  app.put("/api/readers", function(req, res) {
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
};
