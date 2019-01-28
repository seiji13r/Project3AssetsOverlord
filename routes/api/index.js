const router = require("express").Router();
const bookRoutes = require("./items");

router.get("/", (req, res) => res.send("Sanity check"));
// items routes
router.use("/items", itemRoutes);

module.exports = router;
