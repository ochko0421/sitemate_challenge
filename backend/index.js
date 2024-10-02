const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');


const url = "mongodb+srv://ochko:pwtKM8HtWBo8JeR6@cluster0.y9udncp.mongodb.net/sitemate"

mongoose
  .connect(url)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
const port = 8080;



app.use(cors());
app.use(express.json());

const issueRoutes = require('./routes/mainRoute');
app.use('/api/issues', issueRoutes);

app.listen(port, () => {
  console.log("Server is running on " + port);
});