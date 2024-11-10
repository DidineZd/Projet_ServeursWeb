import { DataTypes } from "sequelize";
import database from "../config/connexion.js";

const Departement = database.define(
    "departement",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.INTEGER,
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
  
  export default Departement;
  