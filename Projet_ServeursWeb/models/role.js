import database from "../config/connexion.js";
import {DataTypes } from 'sequelize'

const role = database.define("role", {
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
  });
  
  export default role;
  