const express = require("express");
const router = express.Router();
const {
  connectFio,
  disconnectFio,
  updateFio,
} = require("../controllers/apis/fioController");
const {
  connectXtb,
  disconnectXtb,
  updateXtb,
  uploadXtb,
} = require("../controllers/apis/xtbController");
const {
  connectDegiroAPI,
  uploadDegiro,
  disconnectDegiro,
  updateDegiro,
} = require("../controllers/apis/degiroController");
const {
  authMiddleware,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// Route to connect to Fio API
router.route("/fio").post(authMiddleware, connectFio);

// Route to disconnect from Fio API
router.route("/fio/rm").get(authMiddleware, disconnectFio);

// Route to update Fio API data and reconnect
router.route("/fio/up").get(authMiddleware, updateFio, connectFio);

// Route to connect to XTB API and upload data
router
  .route("/xtb")
  .post(authMiddleware, authorizeRoles("Pro", "Admin"), connectXtb, uploadXtb);

// Route to disconnect from XTB API
router
  .route("/xtb/rm")
  .get(authMiddleware, authorizeRoles("Pro", "Admin"), disconnectXtb);

// Route to update XTB API data, disconnect, reconnect, and upload
router
  .route("/xtb/up")
  .get(
    authMiddleware,
    authorizeRoles("Pro", "Admin"),
    updateXtb,
    disconnectXtb,
    connectXtb,
    uploadXtb
  );

// Route to connect to DeGiro API and upload data
router
  .route("/degiro")
  .post(
    authMiddleware,
    authorizeRoles("Pro", "Admin"),
    connectDegiroAPI,
    uploadDegiro
  );

// Route to disconnect from DeGiro API
router
  .route("/degiro/rm")
  .get(authMiddleware, authorizeRoles("Pro", "Admin"), disconnectDegiro);

// Route to update DeGiro API data, disconnect, reconnect, and upload
router
  .route("/degiro/up")
  .get(
    authMiddleware,
    updateDegiro,
    disconnectDegiro,
    connectDegiroAPI,
    uploadDegiro
  );

// Export the router for use in other modules
module.exports = router;
