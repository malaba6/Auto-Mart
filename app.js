import express from "express";
import bodyParser from 'body-parser';
import router from "./app/view/views";
import path from "path";

const app = express();

let filePath = path.join(__dirname, "pics");
app.use(express.static(filePath));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});