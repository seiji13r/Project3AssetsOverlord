const router = require("express").Router();
const bookRoutes = require("./books");

router.get("/", (req, res) => res.send("Sanity check"));
// Book routes
router.use("/books", bookRoutes);

module.exports = router;
