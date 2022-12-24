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
      .query(`SELECT * FROM ItemMaster WHERE  (nActive = 1) ORDER BY cItem`);
    if (result.recordset.length === 0) {
      res.status(400).send("Number not registered");
    } else {
      res.send(result.recordset);
    }
  } catch (err) {
    console.log(err);
  }
});

//Get by subcategory
router.get("/by-category/:id", async (req, res) => {
  try {
    const pool = await mssql.connect(config);
    const result = await pool
      .request()
      .query(`SELECT * FROM ItemMaster WHERE (nCategory = ${req.params.id}) AND (nActive = 1) ORDER BY cItem`
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
router.post("/", Validate, async (req, res) => {
  console.log(req.body);
  try {
    const pool = await mssql.connect(config);
    const result = await pool
      .request()
      .query(
        `INSERT INTO ItemMaster (nCategory, cItem, nBranchId, nActive) VALUES (${req.body.nCategory}, '${req.body.cItem}', 1, 1)`
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


//Middleware
async function Validate(req, res, next) {
  //Check all fields are filled
  if (
    req.body.nCategory === undefined ||
    req.body.nCategory === "" ||
    req.body.nCategory === null
  ) {
    return res.status(400).send("Please fill all fields");
  }

  if (
    req.body.cItem === undefined ||
    req.body.cItem === "" ||
    req.body.cItem === null
  ) {
    return res.status(400).send("Please fill all fields");
  }

  //Check if cItem already exists
  const pool = await mssql.connect(config);
  const result = await pool
    .request()
    .query(
      `SELECT * FROM ItemMaster WHERE (cItem = '${req.body.cItem}')`
    );
  if (result.recordset.length > 0) {
    return res.status(400).send("Item already exists");
  }
  next();
}

//Delete Item
router.delete("/:id", async (req, res) => {
  try {
    const pool = await mssql.connect(config);
    const result = await pool
      .request()
      .query(
        `DELETE FROM ItemMaster WHERE (nCode = ${req.params.id})`
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
