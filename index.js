const Appication = require("./app/server");

// const DB_URL = "mongodb://localhost:27017/taskmanagerDb";
const DB_URL = "mongodb://localhost:27017/ProjectManagerDB";

new Appication(3500, DB_URL);
