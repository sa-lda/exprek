const express = require("express");
const serverless = require("serverless-http");
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors({
  origin: '*'
}));
const router = express.Router();


  
const db = mysql.createConnection({
    host: "aws.connect.psdb.cloud",
    port: 3306,
    user: "jbhbvlo7mnmdkxdflfoa",
    password: "pscale_pw_AJvaq9u0WV1ThxQyypEQMA4CQ7mAoWlZdKH33syj2OK",
    database: "app",
    ssl: {
        rejectUnauthorized: true,
    },
})

db.connect((err) => {
  if (err) {
    return;
  }
});


router.get("/", (req, res) => {
 return new Promise((resolve, reject) => {
   
           db.query('SELECT * FROM contact_form LIMIT 30', [], (err, results, fields) => {
            if (!err) {
              res.json(results);
            } else {
              console.log(err)
            }
          });
});
});


router.get("/hey", (req, res) => {
  res.json({
    hello: "out!"
  });
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
