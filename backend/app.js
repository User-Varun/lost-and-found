const express = require("express");
const cors = require("cors");
const app = express();
const AppError = require("./utills/AppError");
const globalErrorHandler = require("./controllers/errorControllers");

require("dotenv").config({ path: "./config.env" });

// Routers
const studentRouter = require("./routes/studentRoutes");
const collegeRouter = require("./routes/collegeRoutes");
const itemRouter = require("./routes/itemRoutes");

//  middlewares will go here

// Allow frontend URL
app.use(
  cors({
    origin: "https://lost-and-found-livid.vercel.app", // Your Vercel frontend URL
    credentials: true, // if you use cookies / auth headers (optional, but recommended)
  })
);

// body parser middleware
app.use(express.json());

// routes will go here
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/colleges", collegeRouter);
app.use("/api/v1/items", itemRouter);

// for any other route
app.all("*", (req, res, next) => {
  next(
    new AppError(
      `cant find the given route ${req.originalUrl} on this server`,
      404
    )
  );
});

app.use(globalErrorHandler);

module.exports = app;
