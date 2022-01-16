const express = require("express");
const config = require("config");
const mongo = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = config.get("port") || 5000;
app.use(express.json({ extended: true }));
app.use("/api/auth/", require("./routes/auth.route"));
app.use("/api/", require("./routes/admin.route"));
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

async function start() {
  try {
    await mongo.connect(config.get("mongoURI"));
    app.listen(PORT, () => console.log(`serv is run ${PORT}`));
  } catch (err) {
    console.log("server error", err.message);
    process.exit();
  }
}

start();
