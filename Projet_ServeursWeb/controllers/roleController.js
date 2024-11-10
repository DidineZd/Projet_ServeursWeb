import role from "../models/role.js";
import { validationResult } from "express-validator";

export const getRoles = async (req, res) => {
  try {
    const roles = await role.findAll();
    res.status(200).json(roles);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

export const getRole = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await role.findByPk(id);
    res.status(200).json(role);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

export const addRole = async (req, res) => {
  const { nom } = req.body;
  try {
    const existingRole = await role.findOne({ where: { nom } });

    if (existingRole) {
      return res.status(400).json({ message: "Role already exists" });
    }

    const role = await role.create({ nom });
    res.status(201).json(role);
  } catch (err) {
    console.log(err);
    res.status(409).json({ message: err.message });
  }
};

export const updateRole = async (req, res) => {
  const { id } = req.params;
  const { nom } = req.body;

  if (!nom) {
    return res.status(400).json({ message: "Nom est obligatoire" });
  }

  try {
    const role = await role.findByPk(id);

    if (!role) {
      return res.status(400).json({ message: "Role non trouver" });
    }
    const existingRole = await Role.findOne({ where: { nom } });

    if (existingRole) {
      return res.status(400).json({ message: "Role existe deja" });
    }

    await role.update({ nom });
    res.status(200).json(role);
  } catch (err) {
    console.log(err);
    res.status(409).json({ message: err.message });
  }
};

export const deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await role.findByPk(id);

    if (!role) {
      return res.status(400).json({ message: "Role non trouver" });
    }

    await role.destroy();
    res.status(200).json({ message: "Role supprimer avec succes" });
  } catch (err) {
    console.log(err);
    res.status(409).json({ message: err.message });
  }
};
