const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const db = require("../models");

// Routes
// =============================================================

// GET route for getting all of the products
router.get("/api/products/", function(req, res) {
  db.Product.findAll({}).then(function(dbProduct) {
    res.json(dbProduct);
  });
});

router.get("/api/products/categories", function(req, res) {
  db.Product.findAll({
    attributes: [[Sequelize.literal("DISTINCT `category`"), "category"]]
  }).then(function(dbProduct) {
    res.json(dbProduct);
  });
});

// Get route for returning products of a specific category
router.get("/api/products/category/:category", function(req, res) {
  db.Poduct.findAll({
    where: {
      category: req.params.category
    }
  }).then(function(dbProduct) {
    res.json(dbProduct);
  });
});

// Get route for retrieving a single product
router.get("/api/products/:id", function(req, res) {
  db.Product.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(dbProduct) {
    res.json(dbProduct);
  });
});

// POST route for saving a new product
router.post("/api/products/", function(req, res) {
  // console.log(req.body);
  db.Product.create({
    name: req.body.name,
    sku: req.body.sku,
    category: req.body.category,
    epc: req.body.epc
  }).then(function(dbProduct) {
    res.json(dbProduct);
  });
});

// DELETE route for deleting products
router.delete("/api/products/:id", function(req, res) {
  db.Product.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dbProduct) {
    res.json(dbProduct);
  });
});

// PUT route for updating products
router.put("/api/products", function(req, res) {
  db.Product.update(
    {
      name: req.body.name,
      sku: req.body.sku,
      category: req.body.category,
      epc: req.body.epc
    },
    {
      where: {
        id: req.body.id
      }
    }
  ).then(function(dbProduct) {
    res.json(dbProduct);
  });
});

module.exports = router;
