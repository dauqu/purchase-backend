const express = require("express");
const router = express.Router();
var jwt = require('jsonwebtoken');

const mssql = require("mssql");
const config = require("./../config/sql.js");

//Get all users
router.get("/", async (req, res) => {
    try {
        const pool = await mssql.connect(config);
        const result = await pool
            .request()
            .query(`SELECT * FROM UserMaster WHERE `);
        if (result.recordset.length === 0) {
            res.status(400).send("Number not registered");
        } else {
            res.send(result.recordset);
        }
    } catch (err) {
        console.log(err);
    }
});

//Post request to login
router.post("/", async (req, res) => {
    //Check if user exists
    const pool = await mssql.connect(config);
    const result = await pool
        .request()
        .query("SELECT * FROM UserMaster WHERE (cUserName = '" + req.body.cUsername + "') AND (cPWD = '" + req.body.cPassword + "')");
    if (result.recordset.length === 0) {
        res.status(400).send("Username or password is incorrect");
    } else {
        //Create and assign a token
        // const token = jwt.sign({ _id: result.recordset[0].nUserId }, process.env.TOKEN_SECRET);
        // res.header('auth-token', token).send(token);
        res.send("Logged in successfully")
    }
});

module.exports = router;