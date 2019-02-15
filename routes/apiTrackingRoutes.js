const express = require("express");
const router = express.Router();
const db = require("../models");

// GET route for getting all of the readers
router.get("/api/tracking/", function(req, res) {
  const queryEtriesAndExits = [
    "SELECT ",
    "P.epc,",
    "R.antenna_port,",
    "P.name,",
    "P.category,",
    "R.location",
    "FROM Trackings AS T INNER JOIN	Products AS P ON T.epc = P.epc INNER JOIN	Readers AS R ON T.antenna_port = R.antenna_port;"
  ].join("\n");

  const queryCategories = [
    "SELECT RT.antenna_port, count(RT.category) as count, RT.category",
    "FROM",
    "(SELECT ",
    "P.epc,",
    "R.antenna_port,",
    "P.name AS PName,",
    "P.category,",
    "R.name,",
    "R.location",
    "FROM Trackings AS T INNER JOIN	Products AS P ON T.epc = P.epc INNER JOIN	Readers AS R ON T.antenna_port = R.antenna_port",
    "ORDER BY antenna_port ASC, P.category ASC) AS RT",
    "GROUP BY RT.antenna_port, RT.category ",
    "ORDER BY RT.antenna_port ASC;"
  ].join("\n");

  db.sequelize
    .query(queryEtriesAndExits)
    .then(result1 => {
      const tablesInfo = result1[0];
      db.sequelize
        .query(queryCategories)
        .then(result2 => {
          const summary = result2[0];
          res.json({
            tablesInfo,
            summary
          });
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
});

// SELECT * FROM project3_db.Trackings AS T INNER JOIN	project3_db.Products AS P ON T.epc = P.epc

// SELECT
// P.epc,
// R.antenna_port,
// P.name,
// P.category,
// R.name,
// R.location
// FROM project3_db.Trackings AS T INNER JOIN	project3_db.Products AS P ON T.epc = P.epc INNER JOIN	project3_db.Readers AS R ON T.antenna_port = R.antenna_port;

module.exports = router;
