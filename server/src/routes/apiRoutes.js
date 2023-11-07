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
router.route("/fio").post(authMiddleware, connectFio);
router.route("/fio/rm").get(authMiddleware, disconnectFio);
router.route("/fio/up").get(authMiddleware, updateFio, connectFio);
router
  .route("/xtb")
  .post(authMiddleware, authorizeRoles("Pro", "Admin"), connectXtb, uploadXtb);
router
  .route("/xtb/rm")
  .get(authMiddleware, authorizeRoles("Pro", "Admin"), disconnectXtb);
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
router
  .route("/degiro")
  .post(
    authMiddleware,
    authorizeRoles("Pro", "Admin"),
    connectDegiroAPI,
    uploadDegiro
  );
router
  .route("/degiro/rm")
  .get(authMiddleware, authorizeRoles("Pro", "Admin"), disconnectDegiro);
router
  .route("/degiro/up")
  .get(
    authMiddleware,
    updateDegiro,
    disconnectDegiro,
    connectDegiroAPI,
    uploadDegiro
  );
module.exports = router;
