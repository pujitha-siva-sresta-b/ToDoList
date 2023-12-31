const mongoose = require('mongoose');
// Connecting to database
mongoose.connect('mongodb://127.0.0.1/todo_db');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("DB Connected successfully !!");
});