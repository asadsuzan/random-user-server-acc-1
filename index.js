const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const userRouters = require("./routes/vi/users.route");
const errorHandler = require("./middlewares/errorHandler");

// use middleware
app.use(express.json());
app.use(cors());

// use routes
app.use("/user", userRouters);

// home route
app.get("/", (req, res) => {
  res.send("welcome to random user app server");
});

// 404 route
app.all("*", (req, res) => {
  res.send(`No route found for ${req.url}`);
});

// global error handler
app.use(errorHandler);

// run app
app.listen(port, (req, res) => {
  console.log("app is listening on port", port);
});

// uncontrolled error
process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});
