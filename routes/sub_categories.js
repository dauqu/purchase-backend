const express = require("express");
const router = express.Router();

const mssql = require("mssql");
const config = require("../config/sql.js");

//Get all sub categories
router.get("/", async (req, res) => {
    try {
        const pool = await mssql.connect(config);
        const result = await pool
            .request()
            .query(
                `SELECT * FROM ItemSubCategory`
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

//


module.exports = router;