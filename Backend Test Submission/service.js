require("dotenv").config();
require("reflect-metadata");

const AppDataSource = require("./data-source");

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()); 
app.use(cookieParser());

const register = require("./routes/register");
const auth = require("./routes/auth");

app.use("/evaluation-service", register);
app.use("/evaluation-service", auth);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected!");
    if (process.env.NODE_ENV === "production") {
      AppDataSource.runMigrations().then(() => {
        console.log("Migrations applied!");
      });
    } else {
      console.log("Synchronization enabled (Dev mode)!");
    }
  })
  .catch((error) => console.error(" Error:", error));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

process.on("SIGTERM", () => {
  AppDataSource.destroy().then(() => {
    console.log("PostgreSQL connection closed.");
    process.exit(0);
  });
});
