const Appication = require("./app/server");

// const DB_URL = "mongodb://localhost:27017/taskmanagerDb";
const DB_URL = "mongodb://localhost:27017/ProjectManagerDB";
require("dotenv").config();
new Appication(3000, DB_URL);
