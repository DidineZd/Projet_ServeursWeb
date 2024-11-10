import express from "express";



import {
  getLaboTests,
  addLaboTest,
  getLaboTest,
  deleteLaboTest,
  updateLaboTest,
} from "../controllers/laboTestController.js";
//import { validate } from "../middlewares/validation.js";
import { body } from "express-validator";

const laboRouter = express.Router();

laboRouter.get("/", getLaboTests);
laboRouter.get("/:id", getLaboTest);
laboRouter.post(
  "/",
  body("nom").notEmpty(),
  body("description").notEmpty(),
  body("patientId").notEmpty(),
  body("docteurId").notEmpty(),
 
  addLaboTest
);
laboRouter.patch(
  "/:id",
  body("nom").notEmpty(),
  body("description").notEmpty(),
  body("patientId").notEmpty(),
  body("docteurId").notEmpty(),
  
  updateLaboTest
);
laboRouter.delete("/:id", deleteLaboTest);

export default laboRouter;
