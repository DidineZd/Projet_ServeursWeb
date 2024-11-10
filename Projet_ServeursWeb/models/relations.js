import user from "./user,js";
import Departement from "./departement.js";
import role from "./role.js";
import medication from "./medication.js";
import rendezvous from "./rendez-vous.js";
import facture from "./facture.js";
import rapport from "./rapport.js";
import userRole from "./userRole.js";
import LaboTest from "./labotest.js";
//Creation des relations

user.belongsToMany(role, {
    through: userRole,
  });
  role.belongsToMany(user, {
    through: userRole,
  });
  
  Report.belongsTo(user, {
    foreignKey: "docteurId",
    as: "docteur",
  });
  User.hasMany(rapport, {
    foreignKey: "docteurId",
    as: "docteur_rapport",
  });
  
  rapport.belongsTo(user, {
    foreignKey: "patientId",
    as: "patient",
  });
  user.hasMany(Report, {
    foreignKey: "patientId",
    as: "patient_rapport",
  });
  
  rendezvous.belongsTo(user, {
    foreignKey: "docteurId",
    as: "docteur",
  });
  
  user.hasMany(rendezvous, {
    foreignKey: "docteurId",
    as: "docteur_rendez_vous",
  });
  
  rendezvous.belongsTo(user, {
    foreignKey: "patientId",
    as: "patient",
  });
  
  user.hasMany(rendezvous, {
    foreignKey: "patientId",
    as: "patients_rendez_vous",
  });
  
  facture.belongsTo(user, {
    foreignKey: "patientId",
    as: "patient",
  });
  
  user.hasMany(facture, {
    foreignKey: "patientId",
    as: "factures",
  });
  
  medication.belongsTo(user, {
    foreignKey: "patientId",
    as: "patient",
  });
  
  user.hasMany(medication, {
    foreignKey: "patientId",
    as: "medication",
  });
  
  LaboTest.belongsTo(user, {
    foreignKey: "patientId",
    as: "patient",
  });
  
  user.hasMany(LaboTest, {
    foreignKey: "patientId",
    as: "labo_tests",
  });

  export {user,userRole,Departement,LaboTest,medication,rapport,facture,role,rendezvous}