const pg = require("pg");
require("dotenv").config();
const client = new pg.Client(process.env.PSQL_KEY);
client.connect(() => {
  console.log("database is connected");
});
module.exports = client;
