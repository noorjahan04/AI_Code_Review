const express = require("express");
const router = require("./routes/Ai.routes");
require("dotenv").config();
const cors = require("cors")

const PORT = process.env.PORT;
const app = express();
app.use(cors({
    
  origin: 
  "http://localhost:5173",
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API working........");
});

app.use("/ai", router);

app.listen(PORT, () => {
  console.log(`Server started ....${PORT}`);
});