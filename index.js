const express = require("express");
const app = express();
const TasksRoutes = require("./routes/tasks");
const connectDb = require("./config/db");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/tasks", TasksRoutes);

app.use(notFound);

app.use(errorHandler);

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
