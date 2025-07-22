const AppDataSource = require("../data-source");
const { v4: uuidv4 } = require("uuid"); 
const Users = require("../entity");

const registerUser = async (req, res) => {
  try {
    const { email, name, mobileNo, githubUsername, rollNo, accessCode } = req.body;

    if (!email || !name || !mobileNo || !rollNo || !githubUsername) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const userRepository = AppDataSource.getRepository(Users);

    const existingUser = await userRepository.findOne({
      where: [{ rollNo }, { email }, { githubUsername }],
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already registered" });
    }

    const clientID = uuidv4();
    const clientSecret = uuidv4();

    const newUser = userRepository.create({
      email,
      name,
      mobileNo,
      githubUsername,
      rollNo,
      accessCode,
      clientID,
      clientSecret,
    });

    await userRepository.save(newUser);

    return res.status(201).json({
      email,
      name,
      githubUsername,
      rollNo,
      accessCode,
      clientID,
      clientSecret,
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { registerUser };
