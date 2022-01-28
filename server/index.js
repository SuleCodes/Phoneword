const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

const t9 = require('./t9.js');


app.get("/", (req, res) => {
    res.json({ message: "Hello!" });
});

app.post("/api", jsonParser, (req, res) => {

    const numbers = [];
    var splitAray = String(req.body.inputs).split("#");
    splitAray.forEach((n) => {
        try {
            var num = parseInt(n);
            if (!isNaN(num)) numbers.push(num);
        }
        catch (e) {
        }
    })

    var result = t9.findWords(numbers);
    res.send(JSON.stringify(result));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
