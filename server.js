// Mes Imports
import dotenv from "dotenv";
import express from "express";
import path from "path";
import session from "express-session";
import flash from "connect-flash";
import { fileURLToPath } from "url";
import connectDB from './config/database.js';
import routes from "./routes/routes.js";

// Appel à .env
dotenv.config();
const { APP_HOSTNAME, APP_PORT, MONGO_URI, SECRET_KEY } = process.env;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Appel à config/database.js
connectDB();

// Configuration de l'application
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Configuration de la session
app.use(session({
  secret: SECRET_KEY,
  resave: false,
  saveUninitialized: false
}));

// Configuration de flash (bonus)
app.use(flash());

app.use((req, res, next) => {
  res.locals.messages = {
    error: req.flash("error"),
    success: req.flash("success")
  };
  next();
});


// Appel à routes/routes.js 
app.use("/", routes);

// Démarrage du serveur
app.listen(APP_PORT, () => {
  console.log(`App démarrée sur http://${APP_HOSTNAME}:${APP_PORT}`);
});
