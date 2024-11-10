//Importer la base de données pour créer les modèles ()
import database from "../config/connexion.js";
import {DataTypes } from 'sequelize'

const user = database.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      prenom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      naissance: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      telephone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      mot_de_passe: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      departementId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: true,
    }
  );
  
  export default user;
  