const OpenAI = require("openai");
const {Configuration, OpenAIApi} = OpenAI;

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;

const configuration = new Configuration({
    organization: "org-quas3knhHrppZiyt3MxDdbZC",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const messageObj = req.body;
    console.log(messageObj.message);
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${messageObj.message}`,
        max_tokens: 100,
        temperature: 1
    });
    if(response.data.choices[0].text){
        res.send({message: response.data.choices[0].text});
    }
});

app.listen(port, () => {
    console.log('App Listening on Port: ' + port);
});