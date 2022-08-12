const fetch = import("node-fetch");
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const axios = require("axios");
//require("dotenv").config();
app.get('/', (req, res) => {
    console.log("We are live");

    res.status(200).send("We are live!!!");

});
app.post("/getResponse", express.json(), (req, res) => {
    console.log(req.body);
    res.status(200).send({});

});



app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});