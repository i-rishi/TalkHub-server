import express from "express";
import DBconnect from "./database/db.js";
import dotenv from "dotenv";
import Routes from "./routes/routes.js";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
0.3;
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Routes);

DBconnect();

//Server Listning at PORT
app.listen(PORT, () => {
  console.log("Server started successfully at PORT ", PORT);
});
