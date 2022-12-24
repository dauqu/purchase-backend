const express = require("express");
const router = express.Router();

const mssql = require("mssql");
const config = require("../config/sql.js");


//Get all purchase details
router.get("/", async (req, res) => {
    try {
        const pool = await mssql.connect(config);
        const result = await pool
            .request()
            .query(`SELECT * FROM Purchasedetail`);
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
    const { nCategory, dDate, nSupplierId, cReceivedBy, cBillCopy, nBranchId, nActive } = req.body;
    try {
        const pool = await mssql.connect(config);
        const result = await pool
            .request()
            .query(
                `INSERT INTO Purchasemaster (nSupplierId, cReceivedBy, cBillCopy, nBranchId, nActive) VALUES ('${nSupplierId}', '${cReceivedBy}', '${cBillCopy}', '${nBranchId}', '${nActive}')`
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