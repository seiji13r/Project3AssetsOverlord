const path = require("path");
const router = require("express").Router();
const authRoutes = require("./auth");
const readerRoutes = require("./apiReaderRoutes");
const productRoutes = require("./apiProductRoutes");

// API Routes
router.use("/auth", authRoutes);
router.use("/", readerRoutes);
router.use("/", productRoutes);

// If no API routes are hit, send the React app
router.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;