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
    const { nPurchaseId, nCategoryId, nItemId, nRate, nQty, cUnit, nSubCategId } = req.body;
    try {
        const pool = await mssql.connect(config);
        const result = await pool
            .request()
            .query(`INSERT INTO Purchasedetail (nPurchaseId, nCategoryId, nItemId, nRate, nQty, cUnit, nSubCategId) VALUES ('${nPurchaseId}', '${nCategoryId}', '${nItemId}', '${nRate}', '${nQty}', '${cUnit}', '${nSubCategId}')`
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