const AppDataSource = require("../data-source");
const Users = require("../entity");
const jwt = require("jsonwebtoken");

const auth = async (req, res) => {
  try {
    const { email, accessCode } = req.body;

    if (!email || !accessCode) {
      return res.status(400).json({ error: "Missing email or accessCode" });
    }

    const userRepository = AppDataSource.getRepository(Users);

    const user = await userRepository.findOne({
      where: { email, accessCode },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const payload = {
      email: user.email,
      name: user.name,
      rollNo: user.rollNo,
      accessCode: user.accessCode,
      clientID: user.clientID,
      clientSecret: user.clientSecret,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({
      token_type: "Bearer",
      access_token: token,
      expires_in: 3600,
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { auth };
