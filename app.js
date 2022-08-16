const fetch = import("node-fetch");
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const axios = require("axios");
require("dotenv").config();


app.get('/', (req, res) => {
    console.log("We are live");


    res.status(200).send("We are live!!!");

});
app.post("/getResponse", express.json(), (req, res) => {
    var query = req.body.title;
    console.log(query);
    languageCode = "en";
    const { SessionsClient } = require('@google-cloud/dialogflow-cx');
    const client = new SessionsClient({ apiEndpoint: 'us-central1-dialogflow.googleapis.com' })

    const sessionId = Math.random().toString(36).substring(7);
    const sessionPath = client.projectLocationAgentSessionPath(
        process.env.projectId,
        process.env.location,
        process.env.agentId,
        sessionId
    );
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: query,

            },
            languageCode,
        },
    };
    async function detectIntentText() {

        const [response] = await client.detectIntent(request);
        var data = "";
        for (const message of response.queryResult.responseMessages) {
            if (message.text) {
                data += message.text.text;
                console.log(`Agent Response: ${message.text.text}`);
            }
        }
        console.log(data);
        return data;

    }

    var resData = detectIntentText();
    res.status(200).send(resData);



});


//port
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});