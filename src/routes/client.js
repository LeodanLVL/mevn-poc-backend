// Path: api/client

// Imports
const { param, body } = require("express-validator");
const { Router } = require("express");

const { checkForErrors } = require("../middlewares/checkForErrors");

const {
  getClients,
  getClientById,
  insertClient,
  updateClient,
  deleteClient,
} = require("../controllers/client");

// Router object
const router = new Router();

// Routes
router.get("/", [], getClients);
router.get(
  "/:id",
  [param("id", "Not a valid mongo ID").isMongoId(), checkForErrors],
  getClientById
);
router.post(
  "/new",
  [
    body("name", "Name is required").notEmpty(),
    body("name", "Name should be a String").isString(),

    body("email", "Email is required").notEmpty(),
    body("email", "Email should be a String").isString(),

    body("phone", "Phone is required").notEmpty(),
    body("phone", "Phone should be a String").isString(),

    // body('providers','Providers is required').notEmpty(),
    body("providers", "Providers should be a String").isArray(),

    checkForErrors,
  ],
  insertClient
);
router.put(
  "/update/:id",
  [
    param("id", "Not a valid mongo ID").isMongoId(),
    body("name", "Name is required").notEmpty(),
    body("name", "Name should be a String").isString(),

    body("email", "Email is required").notEmpty(),
    body("email", "Email should be a String").isString(),

    body("phone", "Phone is required").notEmpty(),
    body("phone", "Phone should be a String").isString(),

    // body("providers", "Providers is required").notEmpty(),
    body("providers", "Providers should be a String").isArray(),

    checkForErrors,
  ],
  updateClient
);
router.delete(
  "/delete/:id",
  [param("id", "Not a valid mongo ID").isMongoId(), checkForErrors],
  deleteClient
);

module.exports = router;
