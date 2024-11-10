import { DataTypes } from "sequelize";
import database from "../config/connexion.js";


const userRole = database.define(
    "user_role",
    {
      // id: {
      //   type: DataTypes.INTEGER,
      //   defaultValue: DataTypes.INTEGER,
      //   primaryKey: true,
      // },
    },
    {
      timestamps: true,
    }
  );
  
  export default userRole;
  