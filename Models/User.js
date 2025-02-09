// Mes imports
import mongoose from "mongoose";
import crypto from "crypto";


// Schéma de l'utilisateur
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// HASS du mot de passe  via la clé secrète HASH_SECRET en sha256
userSchema.statics.hashPassword = function (password) {
  return crypto.createHmac("sha256", process.env.HASH_SECRET).update(password).digest("hex");
};

// Création du modèle
const UserModel = mongoose.model("User", userSchema);
export default UserModel;
