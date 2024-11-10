import express from "express";
import { body } from "express-validator";
import {
  getBillings,
  addBilling,
  getBilling,
  deleteBilling,
  updateBilling,
} from "../controllers/factureController.js";
//import { validate } from "../middlewares/validation.js";

const factureRouter = express.Router();

factureRouter.get("/", getBillings);
factureRouter.get("/:id", getBilling);
factureRouter.post(
  "/",
  body("patientId").notEmpty(),
  body("date").notEmpty(),
  body("montant").notEmpty(),
  
  addBilling
);
factureRouter.patch(
  "/:id",
  body("montant").notEmpty(),
  body("date").notEmpty(),
  
  updateBilling
);
factureRouter.delete("/:id", deleteBilling);

export default factureRouter;
