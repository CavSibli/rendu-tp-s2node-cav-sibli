
export function requireAuth(req, res, next) {
    if (!req.session.userId) {
      req.flash("error", "Vous devez être connecté pour accéder à cette page.");
      return res.redirect("/login");
    }
    next();
  }
  