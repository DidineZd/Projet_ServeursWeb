import rendezvous from "../models/rendez-vous.js";

export const getAppointments = async (req, res) => {
  try {
    const appointments = await rendezvous.findAll();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAppointment = async (req, res) => {
  try {
    const appointment = await rendezvous.findByPk(req.params.id);

    if (!appointment) {
      return res.status(404).json({ error: "rendez vous non trouver" });
    }

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addAppointment = async (req, res) => {
  try {
    const { doctorId, patientId, date } = req.body;

    const appointment = await rendezvous.create({
      doctorId,
      patientId,
      date,
    });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const { date } = req.body;
    const appointment = await rendezvous.findByPk(req.params.id);

    if (!appointment) {
      return res.status(404).json({ error: "rendez vous non trouver" });
    }

    await appointment.update({
      date,
    });

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await rendezvous.findByPk(req.params.id);

    if (!appointment) {
      return res.status(404).json({ error: "Rendez vous non trouver" });
    }

    await appointment.destroy();

    res.json({ message: "rendez vous a ete supprimer avec succes" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
