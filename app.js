import express from "express";
import bodyParser from 'body-parser';
import carsRouter from "./app/view/views";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', carsRouter);
app.use('/api/v1/cars', carsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});