import rapport from "../models/rapport.js";
import role from "../models/role.js";
import user from "../models/user.js";

export const getReports = async (req, res) => {
  try {
    const reports = await rapport.findAll({});

    res.status(200).json(reports);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

export const getReport = async (req, res) => {
  const { id } = req.params;
  try {
    const report = await Report.findByPk(id, {});

    if (!report) {
      return res.status(404).json({ message: "rapport non trouver" });
    }

    res.status(200).json(report);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

export const addReport = async (req, res) => {
  const { patientId, docteurId, content, date } = req.body;
  try {
    const patient = await user.findByPk(patientId, {
      include: {
        model: role,
        attributes: ["nom"],
      },
      attributes: {
        exclude: ["mot_de_passe"],
      },
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const docteur = await user.findByPk(docteurId, {
      include: {
        model: role,
        attributes: ["nom"],
      },
      attributes: {
        exclude: ["mot_de_passe"],
      },
    });

    if (!docteur) {
      return res.status(404).json({ message: "Docteur non trouver" });
    }

    const report = await Report.create({
      patientId,
      docteurId,
      date,
      content,
    });

    res.status(201).json(report);
  } catch (err) {
    console.log(err);
    res.status(409).json({ message: err.message });
  }
};

export const updateReport = async (req, res) => {
  const { id } = req.params;

  const { date, content } = req.body;

  try {
    const report = await rapport.findByPk(id);

    if (!report) {
      return res.status(404).json({ message: "rapport non trouver" });
    }

    await report.update({
      date,
      content,
    });

    res.status(200).json(report);
  } catch (err) {
    console.log(err);
    res.status(409).json({ message: err.message });
  }
};

export const deleteReport = async (req, res) => {
  const { id } = req.params;
  try {
    const report = await rapport.findByPk(id);

    if (!report) {
      return res.status(404).json({ message: "rapport non trouver" });
    }

    await report.destroy();

    res.status(200).json({ message: "rapport supprimer avec succes" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};
