const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required." });

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email))
    return res.status(400).json({ message: "Invalid email." });

  if (password.length < 6)
    return res.status(400).json({ message: "Password too short (min 6)." });

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email & Password required." });

  next();
};

module.exports = { validateRegister, validateLogin };
