const path = require("path");
const router = require("express").Router();
const authRoutes = require("./auth");
const epcEventsRoutes = require("./apiEPCEvents");
const productRoutes = require("./apiProductRoutes");
const readerRoutes = require("./apiReaderRoutes");

// API Routes
router.use("/auth", authRoutes);
router.use("/", productRoutes);
router.use("/", readerRoutes);
router.use("/epc-events", epcEventsRoutes);

// If no API routes are hit, send the React app
router.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
