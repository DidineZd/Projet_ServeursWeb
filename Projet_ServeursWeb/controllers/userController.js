import bcryptjs from "bcryptjs"
import role from "../models/role.js";
import  user  from "../models/user.js";

export const getUsers = async (req, res) => {
  try {
    const users = await user.findAll({
      include: {
        model: role,
        attributes: ["nom"],
      },
      attributes: {
        exclude: ["mot_de_passe"],
      },
    });
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

export const addUser = async (req, res) => {
  const {
    nom,
    prenom,
    email,
    telephone,
    photo,
    mot_de_passe,
    role_nom,
    naissance,
  } = req.body;

  try {
    const role = await role.findOne({ where: { nom: role_nom } });

    if (!role) {
      return res.status(400).json({ message: "Role n'existe pas" });
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(mot_de_passe, salt);

    const user = await user.create({
      nom,
      prenom,
      email,
      telephone,
      photo,
      naissance,
      mot_de_passe: hashedPassword,
    });

    await user.addRoles([role]);

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(409).json({ message: err.message });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await user.findByPk(id, {
      include: [
        {
          model: Role,
          attributes: ["nom"],
        },
      ],
      attributes: {
        exclude: ["mot_de_passe"],
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await user.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "L'utilisateur non trouver" });
    }

    await user.destroy();

    res.status(200).json({ message: "utilisateur supprimer avec succes" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  const {
    nom,
    prenom,
    email,
    telephone,
    photo,
    mot_de_passe,
    role_nom,
    naissance,
  } = req.body;

  try {
    const user = await user.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "utilisateur non trouver" });
    }

    const role = await role.findOne({ where: { nom: role_nom } });

    if (!role) {
      return res.status(400).json({ message: "role n'existe pas" });
    }

    // const role_id = role.id;

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(mot_de_passe, salt);

    await user.update({
      nom,
      prenom,
      email,

      naissance,
      telephone,
      photo,
      mot_de_passe: hashedPassword,
      // role_id,
    });

    await user.setRoles([role]);

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};
