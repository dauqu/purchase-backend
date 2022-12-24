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

//Get sub-category by category id
router.get("/by-category/:id", async (req, res) => {
    try {
        const pool = await mssql.connect(config);
        const result = await pool
            .request()
            .query(`SELECT * FROM ItemSubCategory WHERE nCategoryID = ${req.params.id}`
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

//Create new Item
router.post("/", async (req, res) => {
    try {
        const pool = await mssql.connect(config);
        //Inster Body Data
        const result = await pool
            .request()
            .query(`INSERT INTO ItemSubCategory (nCategoryID, cCategory, nBranchId, nActive) VALUES ('${req.body.nCategoryID}', '${req.body.cCategory}', 1, 1)`);
        //Get Last Inserted ID
        return res.send(result.rowsAffected);
    } catch (err) {
        res.status(400).send(err);
    }
});


//Delete Item
router.delete("/:id", async (req, res) => {
    try {
        const pool = await mssql.connect(config);
        const result = await pool
            .request()
            .query(`DELETE FROM ItemSubCategory WHERE nCode = ${req.params.id}`);
        if (result.rowsAffected.length === 0) {
            res.status(400).send("Number not registered");
        } else {
        }
        res.status(200).send({ message: "Item Deleted", status: result.rowsAffected });
    } catch (err) {
        res.status(400).send({ message: "Error in Deleting Item", status: err });
    }
});


module.exports = router;