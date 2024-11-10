import express from "express";
import cors from "cors"
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";
import dotenv from 'dotenv'

import database from "./config/connexion.js";

//Importer les controllers

import userRoute from "./routes/userRoute.js";
import roleRouter from "./routes/roleRoute.js";
import rendezvousRouter from "./routes/rendezvousRoute.js";
import rapportRouter from "./routes/rapportRoute.js";
import medicationRouter from "./routes/medicationRoute.js";
import laboRouter from "./routes/laboTestRoute.js";
import factureRouter from "./routes/factureRoute.js";
import departementRouter from "./routes/departementRoute.js";

//Creation du serveur

const app = express()

//Utiliser les librairies
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Creation de toutes les tables 
database.sync({ alter: true })

app.use('/api/users', userRoute)
app.use('/api/role', roleRouter)
app.use('/api/rendez_vous', rendezvousRouter)
app.use('/api/rapport', rapportRouter)
app.use('/api/medication', medicationRouter)
app.use('/api/labotest', laboRouter)
app.use('/api/facture', factureRouter)
app.use('/api/departement', departementRouter)

import connexion from './config/connexion.js';

connexion.authenticate()
  .then(() => console.log('Connexion réussie à la base de données !'))
  .catch(error => console.error('Erreur de connexion à la base de données :', error));


//Demarrer les serveur
const PORT = dotenv.config().parsed.PORT

app.listen(PORT, () => console.log(`Le serveur tourne sur le port ${PORT}`))