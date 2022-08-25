const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect.js");
require("dotenv").config();
const notFound = require("./middleware/not-found.js");
const errorHandlerMiddleware = require("./middleware/error-handler.js");

// middleware
app.use(express.json());

// routes
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

// port
const port = process.env.PORT || 3000;

// start server and load database
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
