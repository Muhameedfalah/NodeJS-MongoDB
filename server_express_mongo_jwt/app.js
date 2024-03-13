require('dotenv').config();
const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const tasksRoutes = require("./routes/tasksRouters");
const categorieRoutes = require("./routes/categoryRoutes");
const queryRoutes = require("./routes/qureyRoutes");
const mongoose = require('mongoose');

app.use(express.json());
app.use("/users", authRoutes);
app.use("/tasks", tasksRoutes);
app.use("/categories", categorieRoutes);
app.use("/query", queryRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URI).then(function(){
  console.log('Connected to database, starting server...');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}, function(err) {
    console.log(err);
});

module.exports = app;


