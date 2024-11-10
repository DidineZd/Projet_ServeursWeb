import express from "express";
import { body } from "express-validator";
import {
  getUsers,
  addUser,
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";
//import { validate } from "../middlewares/validation.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post(
  "/",
  body("nom").notEmpty(),
  body("prenom").notEmpty(),
  body("photo").notEmpty(),
  body("telephone").notEmpty(),
  body("naissance").notEmpty(),
  body("email").isEmail().notEmpty(),
  body("mot_de_passe").notEmpty(),
  body("role_nom").notEmpty(),
 // validate,
  addUser
);
router.patch(
  "/:id",
  body("nom").notEmpty(),
  body("prenom").notEmpty(),
  body("photo").notEmpty(),
  body("naissance").notEmpty(),

  body("telephone").notEmpty(),
  body("email").isEmail().notEmpty(),
  body("mot_de_passe").notEmpty(),
  body("role_nom").notEmpty(),
 // validate,
  updateUser
);
router.delete("/:id", deleteUser);

export default router;
