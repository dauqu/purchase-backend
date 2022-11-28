const express = require("express");
const router = express.Router();

//Post request to register
router.post("/", async (req, res) => {
    //Check if user exists
    const pool = await mssql.connect(config);
    const result = await pool
        .request()
        .query("SELECT * FROM Users WHERE (cUsername = '" + req.body.cUsername + "')");
    if (result.recordset.length > 0) {
        res.status(400).send("Username already exists");
    } else {
        //Create new user
        const pool = await mssql.connect(config);
        const result = await pool
            .request()
            .query("INSERT INTO Users (cUsername, cPassword, cEmail, nActive) VALUES ('" + req.body.cUsername + "', '" + req.body.cPassword + "', '" + req.body.cEmail + "', 1)");
        res
            .status(200)
            .send("User created");
    }
});

module.exports = router;