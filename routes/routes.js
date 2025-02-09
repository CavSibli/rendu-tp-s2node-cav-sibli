// Mes imports
import express from "express";
import HomeController from "../controllers/home.js";
import { registerUser, loginUser, logoutUser } from "../controllers/auth.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

// Création du router
const router = express.Router();

  // Routes générales
router.get("/", HomeController);
router.get("/dashboard", requireAuth, (req, res) => {
  res.render("dashboard");
});

  // Routes d'authentification
router.get("/login", (req, res) => res.render("login"));
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);



export default router;
