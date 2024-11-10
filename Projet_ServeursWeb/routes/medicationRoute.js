import express from "express";
import { body } from "express-validator";
import {
  getMedications,
  addMedication,
  getMedication,
  updateMedication,
  deleteMedication,
} from "../controllers/medicationController.js";
//import { validate } from "../middlewares/validation.js";

const medicationRouter = express.Router();

medicationRouter .get("/", getMedications);
medicationRouter .get("/:id", getMedication);
medicationRouter .post(
  "/",
  body("nom").notEmpty(),
  body("description").notEmpty(),
  body("patientId").notEmpty(),
  body("docteurId").notEmpty(),
  
  addMedication
);
medicationRouter .patch(
  "/:id",
  body("nom").notEmpty(),
  body("description").notEmpty(),
  body("patientId").notEmpty(),
  body("docteurId").notEmpty(),
  
  updateMedication
);
medicationRouter .delete("/:id", deleteMedication);

export default medicationRouter;
