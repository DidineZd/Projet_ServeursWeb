import express from "express";
import { body } from "express-validator";
import {
  getReports,
  addReport,
  getReport,
  deleteReport,
  updateReport,
} from "../controllers/rapportController.js";
//import { validate } from "../middlewares/validation.js";

const rapportRouter = express.Router();

rapportRouter.get("/", getReports);
rapportRouter.get("/:id", getReport);
rapportRouter.post(
  "/",
  body("patientId").notEmpty(),
  body("doctorId").notEmpty(),
  body("date").notEmpty(),
  body("content").notEmpty(),
 
  addReport
);
rapportRouter.patch(
  "/:id",
  body("date").notEmpty(),

  body("content").notEmpty(),
  
  updateReport
);
rapportRouter.delete("/:id", deleteReport);

export default rapportRouter;
