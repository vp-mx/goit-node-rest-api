import express from "express";
import morgan from "morgan";
import cors from "cors";

import { sequelize } from "./db/sequelize.js";

import contactsRouter from "./routes/contactsRouter.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

sequelize
  .authenticate()
  .then(async () => {
    console.log("Database connection successful");
    await sequelize.sync(); // Force sync of the database tables { force: true } - drop tables and create them again { alter: true } - update tables
    app.listen(3000, () => {
      console.log("Server is running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
