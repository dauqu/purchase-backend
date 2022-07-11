const express = require("express");
const router = express.Router();

const mssql = require("mssql");
const config = require("./../config/sql.js");

//Get all categories
router.get("/", async (req, res) => {
  try {
    const pool = await mssql.connect(config);
    const result = await pool
      .request()
      .query(
        `SELECT * FROM ItemCategory WHERE (nActive = 1) ORDER BY cCategory`
      );
    if (result.recordset.length === 0) {
      res.status(400).send("Number not registered");
    } else {
      res.send(result.recordset);
    }
  } catch (err) {
    console.log(err);
  }
});

//Add new Item
router.post("/", async (req, res) => {
  try {
    const pool = await mssql.connect(config);
    const result = await pool
      .request()
      .query(
        `INSERT INTO ItemCategory (cCategory, nBranchId, nActive) VALUES ('${req.body.cCategory}', 1, 1)`
      );

    return res.send(result.rowsAffected);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
