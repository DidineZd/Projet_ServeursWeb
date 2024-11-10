import express from "express";
import { body } from "express-validator";
import {
  getRoles,
  addRole,
  getRole,
  updateRole,
  deleteRole,
} from "../controllers/roleController.js";
//import { validate } from "../middlewares/validation.js";

const roleRouter = express.Router();

roleRouter.get("/", getRoles);
roleRouter.get("/:id", getRole);
roleRouter.post("/", body("nom").notEmpty(), addRole);
roleRouter.patch("/:id", body("nom").notEmpty(), updateRole);
roleRouter.delete("/:id", deleteRole);

export default roleRouter;
