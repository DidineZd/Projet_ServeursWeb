import medication from "../models/medication.js";
import user from "../models/user.js";
import role from "../models/role.js";

export const getMedications = async (req, res) => {
  try {
    const medications = await medication.findAll();
    res.status(200).json(medications);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getMedication = async (req, res) => {
  const { id } = req.params;

  try {
    const medication = await medication.findByPk(id);

    if (!medication) {
      return res.status(404).json({ message: "Medication non trouver" });
    }

    res.status(200).json(medication);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addMedication = async (req, res) => {
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

    const createdMedication = await medication.create({
      nom,
      description,
      patientId,
      docteurId,
    });

    res.status(201).json(createdMedication);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateMedication = async (req, res) => {
  const { id } = req.params;
  const { nom, description, patientId, docteurId } = req.body;

  try {
    const medication = await medication.findByPk(id);

    if (!medication) {
      return res.status(404).json({ message: "Medication non trouver" });
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
      !isDocteur.roles.map((role) => role.nom).includes("docteur")
    ) {
      return res.status(404).json({ message: "Docteur non trouver" });
    }

    await medication.update({
      nom,
      description,
      patientId,
      docteurId,
    });

    res.status(200).json(medication);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteMedication = async (req, res) => {
  const { id } = req.params;

  try {
    const medication = await medication.findByPk(id);

    if (!medication) {
      return res.status(404).json({ message: "Medication non trouver" });
    }

    await medication.destroy();

    res.status(200).json({ message: "Medication supprimer avec succes" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
