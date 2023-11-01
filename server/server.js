const express = require("express");
const cors = require('cors');
require('dotenv').config();
const dbConnect = require("../server/config/dbConnect")
const port = process.env.PORT;
const morgan = require('morgan');
const app = express();

dbConnect();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get("/", (req, res) => {
    res.status(200).json({
        "email": "test@mail.com",
        "password": "test@1234"
    })
})

const router = require("../server/routes/routes");

app.use("/api", router);

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
})