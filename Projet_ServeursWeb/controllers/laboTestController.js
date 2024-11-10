// getLaboTests,
//   addLaboTest,
//   getLaboTest,
//   deleteLaboTest,
//   updateLaboTest,

import LaboTest from "../models/labotest.js";
import user from "../models/user.js";
import role from "../models/role.js";

export const getLaboTests = async (req, res) => {
  try {
    const laboTests = await laboTest.findAll();

    res.status(200).json(laboTests);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

export const getLaboTest = async (req, res) => {
  const { id } = req.params;

  try {
    const laboTest = await LaboTest.findByPk(id);

    if (!laboTest) {
      return res.status(404).json({ message: "LaboTest non trouver" });
    }

    res.status(200).json(laboTest);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

export const addLaboTest = async (req, res) => {
  const { nom, description, patientId, docteurId } = req.body;

  try {
    const isPatient = await user.findByPk(patientId, {
      include: {
        model: role,
        attributes: ["nom"],
      },
    });

    if (
      !isPatient ||
      !isPatient.roles.map((role) => role.nom).includes("patient")
    ) {
      return res.status(404).json({ message: "Patient non trouver" });
    }

    const isDocteur = await user.findByPk(docteurId, {
      include: {
        model: role,
        attributes: ["nom"],
      },
    });

    if (
      !isDocteur ||
      !isDocteur.roles.map((role) => role.nom).includes("docteur")
    ) {
      return res.status(404).json({ message: "Docteur non trouver" });
    }

    const laboTest = await LaboTest.create({
      nom,
      description,
      patientId,
      docteurId,
    });

    res.status(201).json(laboTest);
  } catch (err) {
    console.log(err);
    res.status(409).json({ message: err.message });
  }
};

export const updateLaboTest = async (req, res) => {
  const { id } = req.params;
  const { nom, description, patientId, docteurId } = req.body;

  try {
    const laboTest = await LaboTest.findByPk(id);

    if (!laboTest) {
      return res.status(404).json({ message: "LaboTest non trouver" });
    }

    const isPatient = await user.findByPk(patientId, {
      include: {
        model: role,
        attributes: ["nom"],
      },
    });

    if (
      !isPatient ||
      !isPatient.roles.map((role) => role.nom).includes("patient")
    ) {
      return res.status(404).json({ message: "Patient non trouver" });
    }

    const isDocteur = await user.findByPk(docteurId, {
      include: {
        model: role,
        attributes: ["nom"],
      },
    });

    if (
      !isDocteur ||
      !isDocteir.roles.map((role) => role.nom).includes("docteur")
    ) {
      return res.status(404).json({ message: "Docteur non trouver" });
    }

    await laboTest.update({
      nom,
      description,
      patientId,
      docteurId,
    });

    res.status(200).json(laboTest);
  } catch (err) {
    console.log(err);
    res.status(409).json({ message: err.message });
  }
};

export const deleteLaboTest = async (req, res) => {
  const { id } = req.params;

  try {
    const laboTest = await LaboTest.findByPk(id);

    if (!laboTest) {
      return res.status(404).json({ message: "LaboTest non trouver" });
    }

    await laboTest.destroy();

    res.status(200).json({ message: "LaboTest supptimer avec succes" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};
