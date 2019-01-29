const router = require("express").Router();
const itemRoutes = require("./items");

router.get("/", (req, res) => res.send("Sanity check"));
// items routes
router.use("/items", itemRoutes);

module.exports = router;
