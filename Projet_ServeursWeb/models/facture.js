import { DataTypes } from "sequelize";
import database from "../config/connexion.js";

const facture = database.define(
    "facture",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.INTEGER,
      },
      patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      montant: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
  
  export default facture;
  