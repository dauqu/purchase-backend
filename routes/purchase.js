const express = require("express");
const router = express.Router();

const mssql = require("mssql");
const config = require("./../config/sql.js");

//Get all astrologers
router.get("/", async (req, res) => {
  try {
    const pool = await mssql.connect(config);
    const result = await pool
      .request()
      .query(`SELECT * FROM Purchasemaster`);
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
        `INSERT INTO Purchasemaster (nCategory, cItem, nBranchId, nActive) VALUES (${req.body.nCategory}, '${req.body.cItem}', 1, 1)`
      );
    if (result.rowsAffected.length === 0) {
      res.status(400).send("Number not registered");
    } else {
      res.send(result.rowsAffected);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
