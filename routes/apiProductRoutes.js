
const db = require("../models");


// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the products
  app.get("/api/products/", function(req, res) {
    db.Product.findAll({})
      .then(function(dbProduct) {
        res.json(dbProduct);
      });
  });

  // Get route for returning products of a specific category
  app.get("/api/products/category/:category", function(req, res) {
    db.Poduct.findAll({
      where: {
        category: req.params.category
      }
    })
      .then(function(dbProduct) {
        res.json(dbProduct);
      });
  });

  // Get route for retrieving a single product
  app.get("/api/products/:id", function(req, res) {
    db.Product.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbProduct) {
        res.json(dbProduct);
      });
  });

  // POST route for saving a new product
  app.post("/api/products/", function(req, res) {
    // console.log(req.body);
    db.Product.create({
      name: req.body.name,
      sku: req.body.sku,
      category: req.body.category,
      epc: req.body.epc,
      created_at: req.body.created_at,
      updated_at: req.boyd.updated_at
    })
      .then(function(dbProduct) {
        res.json(dbProduct);
      });
  });

  // DELETE route for deleting products
  app.delete("/api/products/:id", function(req, res) {
    db.Product.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbProduct) {
        res.json(dbProduct);
      });
  });

  // PUT route for updating products
  app.put("/api/products", function(req, res) {
    db.Product.update({
        name: req.body.name,
      sku: req.body.sku,
      category: req.body.category,
      upc: req.body.upc,
      updated_at: req.boyd.updated_at
    },
      {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbProduct) {
        res.json(dbProduct);
      });
  });
};