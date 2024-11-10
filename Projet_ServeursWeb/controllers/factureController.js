import facture from "../models/facture.js";
import user from "../models/user.js";

export const getBillings = async (req, res) => {
  try {
    const billings = await facture.findAll();
    res.status(200).json(billings);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getBilling = async (req, res) => {
  const { id } = req.params;
  try {
    const billing = await facture.findByPk(id);

    if (!billing) {
      return res.status(404).json({ message: "Facture non trouver" });
    }

    res.status(200).json(billing);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addBilling = async (req, res) => {
  const { patientId, amount, date } = req.body;

  try {
    const patient = await user.findByPk(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Patient non trouver" });
    }

    const newBilling = await facture.create({
      patientId,
      date,
      amount,
    });

    res.status(201).json(newBilling);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateBilling = async (req, res) => {
  const { id } = req.params;
  const { amount, date } = req.body;

  try {
    const billing = await facture.findByPk(id);

    if (!billing) {
      return res.status(404).json({ message: "Facture non trouver" });
    }

    await billing.update({
      date,
      amount,
    });

    res.status(200).json(billing);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteBilling = async (req, res) => {
  const { id } = req.params;

  try {
    const billing = await facture.findByPk(id);

    if (!billing) {
      return res.status(404).json({ message: "Facture non trouver" });
    }

    await billing.destroy();

    res.status(200).json({ message: "Facture a ete supprimer avec succes" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
