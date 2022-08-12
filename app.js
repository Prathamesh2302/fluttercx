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
    languageCode = "en";
    const { SessionsClient } = require('@google-cloud/dialogflow-cx');
    const client = new SessionsClient({ apiEndpoint: 'us-central1-dialogflow.googleapis.com' })

    async function detectIntentText() {
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
                    languageCode,
                    text: query,

                },
                languageCode,
            },
        };
        const [response] = await client.detectIntent(request);
        var data = "";
        for (const message of response.queryResult.responseMessages) {
            if (message.text) {
                data += message.text.text;
                console.log(`Agent Response: ${message.text.text}`);
            }
        }
        console.log(data);
        res.status(200).send(data);

    }

    detectIntentText();


});



app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});