import express from "express";
import { body } from "express-validator";
import {
  getDepartments,
  addDepartment,
  getDepartment,
  deleteDepartment,
  addDocteur,
  updateDepartment,
} from "../controllers/departementController.js";
//import { validate } from "../middlewares/validation.js";

const departementRouter = express.Router();

departementRouter.get("/", getDepartments);
departementRouter.get("/:id", getDepartment);
departementRouter.post(
  "/",
  body("nom").notEmpty(),
  body("description").notEmpty(),
  
  addDepartment
);
departementRouter.post("/:id/addDocteur", body("docteurId").notEmpty(), addDocteur);
departementRouter.patch(
  "/:id",
  body("nom").notEmpty(),
  body("description").notEmpty(),
  
  updateDepartment
);
departementRouter.delete("/:id", deleteDepartment);

export default departementRouter;
