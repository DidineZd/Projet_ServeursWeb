import { DataTypes } from "sequelize";
import database from "../config/connexion.js";
const rendezvous = database.define(
    "rendezvous",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.INTEGER,
      },
      docteurId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
  
  export default rendezvous;
  