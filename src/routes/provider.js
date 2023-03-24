// Path: api/provider

const { param, body } = require("express-validator");

// Controllers
const {
  getProviders,
  getProviderById,
  insertProvider,
  updateProvider,
  deleteProvider,
} = require("../controllers/provider");

const { Router } = require("express");

// Router object
const router = new Router();
const { checkForErrors } = require("../middlewares/checkForErrors");
// Routes
router.get("/", [], getProviders);
router.get(
  "/:id",
  [param("id", "Not a valid mongo id").isMongoId(), checkForErrors],
  getProviderById
);
router.post(
  "/new",
  [
    body("name", "The name is required").notEmpty(),
    body("name", "The name should be a String").isString(),
    checkForErrors,
  ],
  insertProvider
);
router.put(
  "/update/:id",
  [
    param("id", "Not a valid mongo id").isMongoId(),
    body("name", "The name is required").notEmpty(),
    body("name", "The name should be a String").isString(),
    checkForErrors,
  ],
  updateProvider
);
router.delete(
  "/delete/:id",
  [param("id", `Invalid value `).isMongoId(), checkForErrors],
  deleteProvider
);

module.exports = router;
