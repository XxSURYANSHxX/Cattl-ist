// controllers/authController.js
exports.getHome = (req, res) => {
  if (req.user) {   //add link to frontend file
    res.send(`<h1>Welcome ${req.user.displayName}</h1>
              <p>Email: ${req.user.email}</p>
              <a href="/auth/logout">Logout</a>`);
  } else {
    res.send(`<h1>Home</h1><a href="/auth/google">Login with Google</a>`);
  }
};

exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
};
