import express from "express";
const router = express.Router();

// Home page (registration page)
router.get("/", (req, res) => {
    res.render('home');
});

// Login page
router.get("/login", (req, res) => {
    res.render('login');
});

// Dashboard page
router.get("/dashboard", (req, res) => {
    res.render('dashboard');
});

export default router;
