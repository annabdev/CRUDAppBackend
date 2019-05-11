const express = require("express");
const app = express();
const port = 3001;
const monk = require("monk");
const bodyParser = require("body-parser");
const cors = require("cors");


const url = 
"mongodb+srv://annabdev:psswrd@cluster0-01tpv.mongodb.net/test?retryWrites=true";

const db = monk(url);

db.then(() => {
    console.log("Server Connected");
});

const contact = db.get("work");

app.use(cors());
app.use(bodyParser.json());

app.get("/", async (req, res) => {
    const result = await contact.find(req.body);
    console.log("get worked");
    res.status(200).send(result);
});

app.post("/", async (req,res) => {
    const result = await contact.insert(req.body);
    console.log("post worked");
    res.status(200).send(result);
});

app.put("/", async (req, res) => {
    const result = await contact.findOneAndUpdate(req.params.id, req.body);
    console.log("put worked");
    res.status(200).send(result);
});

app,delete("/", async (req, res) => {
    const result = await contact.findOneandDelete(req.params.id);
    console.log("delete worked");
    res.status(200).send(result);
});

app.listen(port, () => console.log('Crud app listening on port ${port}!`'))