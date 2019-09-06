const express = require("express");
const path = require("path");
const fs = require("fs");

const port = process.env.PORT || 3333;
const app = express();
const router = express.Router();
router.get("/", (req, res) => {
    const returnUri = req.query.returnUri;
    if (!returnUri) {
        res.sendStatus(404);
        return;
    }

    const html = fs.readFileSync(path.join(__dirname, "./link.html"), "utf-8");
    res.send(html.replace("{{returnUri}}", returnUri)).contentType("text/html");
});
app.use("/", router);
app.listen(port, () => {
    return console.log(`Example app listening on port ${port}!`);
});