import UserModel from "../models/User.js";

export async function registerUser(req, res) {
  const { firstName, lastName, email, password, password_confirm } = req.body;


  if (!firstName || !lastName || !email || !password || !password_confirm) {
    req.flash("error", "Tous les champs sont requis.");
    return res.redirect("/");
  }



  if (password !== password_confirm) {
    req.flash("error", "Les mots de passe ne correspondent pas.");
    return res.redirect("/");
  }


  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    req.flash("error", "Cet utilisateur existe déjà.");
    return res.redirect("/");
  }


  const hashedPassword = UserModel.hashPassword(password);


  const newUser = new UserModel({
    firstName,
    lastName,
    email,
    password: hashedPassword
  });

  await newUser.save();
  req.flash("success", "Inscription réussie. Veuillez vous connecter.");
  res.redirect("/login");
}

export async function loginUser(req, res) {
  const { email, password } = req.body;
  
  if (!email || !password) {
    req.flash("error", "Email et mot de passe requis.");
    return res.redirect("/login");
  }

  const user = await UserModel.findOne({ email });
  if (!user || user.password !== UserModel.hashPassword(password)) {
    req.flash("error", "Email ou mot de passe incorrect.");
    return res.redirect("/login");
  }

  req.session.userId = user._id;
  res.redirect("/dashboard");
}

export function logoutUser(req, res) {
  req.session.destroy(() => {
    res.redirect("/login");
  });
}
