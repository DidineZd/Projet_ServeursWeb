import express from "express";
import { body } from "express-validator";
import {
  getAppointments,
  addAppointment,
  getAppointment,
  deleteAppointment,
  updateAppointment,
} from "../controllers/rendezvousController.js";
//import { validate } from "../middlewares/validation.js";

const rendezvousRouter = express.Router();

rendezvousRouter.get("/", getAppointments);
rendezvousRouter.get("/:id", getAppointment);
rendezvousRouter.post(
  "/",
  body("patientId").notEmpty(),
  body("docteurId").notEmpty(),
  body("date").notEmpty(),
  
  addAppointment
);
rendezvousRouter.patch("/:id", body("date").notEmpty(), updateAppointment);
rendezvousRouter.delete("/:id", deleteAppointment);

export default rendezvousRouter;
