const express = require("express");
const app = express();


//Allow JSON
app.use(express.json());

// const connectDB = require("./config/database");
// connectDB();



app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/register", require("./routes/register"));
app.use("/api/v1/login", require("./routes/login"));
app.use("/api/v1/profile", require("./routes/profile"));
app.use("/api/v1/posts", require("./routes/posts"));
app.use("/api/v1/categories", require("./routes/categories"));

app.listen(4000, () => {
  console.log("Example app listening on port http://localhost:4000");
});
