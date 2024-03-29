const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("identify", identifyRouter);
app.use((req, res) => {
    res.json("successful ping");
});

app.listen(process.env.PORT || 3500);
