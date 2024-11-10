import Departement from "../models/departement.js";
import user from "../models/user.js";
import role from "../models/role.js";

export const getDepartments = async (req, res) => {
  try {
    const departments = await Departement.findAll();
    res.status(200).json(departments);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

export const getDepartment = async (req, res) => {
  const { id } = req.params;

  try {
    const department = await Departement.findByPk(id);
    res.status(200).json(department);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

export const addDepartment = async (req, res) => {
  const { nom, description } = req.body;
  try {
    const exists = await Departement.findOne({ where: { nom } });

    if (exists) {
      return res.status(409).json({ message: "Department existe deja" });
    }

    const department = await Departement.create({
      nom,
      description,
    });

    res.status(201).json(department);
  } catch (err) {
    console.log(err);
    res.status(409).json({ message: err.message });
  }
};

export const addDocteur = async (req, res) => {
  const { id } = req.params;
  const { docteurId } = req.body;

  try {
    const department = await Departement.findByPk(id);

    if (!department) {
      return res.status(404).json({ message: "Department non trouver" });
    }

    const docteur = await user.findByPk(docteurId, {
      include: {
        model: role,
        attributes: ["nom"],
      },
    });

    if (!docteur || !docteur.roles.map((role) => role.nom).includes("docteur")) {
      return res.status(404).json({ message: "Docteur non trouver" });
    }

    await docteur.update({
      departementId: id,
    });

    res.status(200).json({ message: "Docteur a ete ajouter avec succes" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

export const updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { nom, description } = req.body;
  try {
    const department = await Departement.findByPk(id);

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    const exists = await Departement.findOne({ where: { nom } });

    if (exists) {
      return res.status(409).json({ message: "Department already exists" });
    }

    await department.update({
      nom,
      description,
    });

    res.status(200).json(department);
  } catch (err) {
    console.log(err);
    res.status(409).json({ message: err.message });
  }
};

export const deleteDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    const department = await Departement.findByPk(id);

    if (!department) {
      return res.status(404).json({ message: "Department non trouver" });
    }

    await department.destroy();

    res.status(200).json({ message: "Department supprimer svec succes" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};
