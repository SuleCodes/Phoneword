const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const t9 = require('./t9.js');


app.get("/", (req, res) => {
    res.json({ message: "Hello!" });
});

app.get("/api", (req, res) => {
    var result = t9.findWords([6, 7, 6, 6, 6, 7, 6]);
    res.send(JSON.stringify(result));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
