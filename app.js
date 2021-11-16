const express = require("express");
const config = require("config");
const mongo = require("mongoose");


const app = express();
const PORT = config.get("port") || 5000;
app.use(express.json({ extended: true }));
app.use("/api/auth/", require("./routes/auth.route"));
app.use("/api/", require("./routes/admin.route"));

async function start() {
  try {
    await mongo.connect(config.get("mongoURI"),);
    app.listen(PORT, () => console.log(`serv is run ${PORT}`));
  } catch (err) {
    console.log("server error", err.message);
    process.exit();
  }
}

start();
