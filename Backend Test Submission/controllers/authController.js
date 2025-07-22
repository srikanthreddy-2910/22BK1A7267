const AppDataSource = require("../data-source");
const Users = require("../entity");
const jwt = require("jsonwebtoken");

const auth = async (req, res) => {
  try {
    const {
      email,
      name,
      githubUsername,
      rollNo,
      accessCode,
      clientID,
      clientSecret,
    } = req.body;

    if (
      !email ||
      !name ||
      !githubUsername ||
      !rollNo ||
      !accessCode ||
      !clientID ||
      !clientSecret
    ) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Missing required authentication fields",
      });
    }

    const userRepository = AppDataSource.getRepository(Users);

    const user = await userRepository.findOne({
      where: {
        email,
        name,
        githubUsername,
        rollNo,
        accessCode,
        clientID,
        clientSecret,
      },
    });

    if (!user) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: "Invalid authentication credentials",
      });
    }

    const payload = {
      email: user.email,
      name: user.name,
      githubUsername: user.githubUsername,
      rollNo: user.rollNo,
      accessCode: user.accessCode,
      clientID: user.clientID,
      clientSecret: user.clientSecret,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Authentication successful",
      token_type: "Bearer",
      access_token: token,
      expires_in: 1800,
    });
  } catch (error) {
    console.error("Error in auth:", error);

    return res.status(500).json({
      status: 500,
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { auth };
