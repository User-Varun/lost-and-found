const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./backend/config.env" });

const db = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

// Database
mongoose
  .connect(db)
  .then(() => {
    console.log("db successfully connected");
    console.log(process.env.NODE_ENV);
  })
  .catch((err) => console.error(err));

// Server
app.listen(process.env.PORT, () => {
  console.log("server listening at port ", process.env.PORT);
});
