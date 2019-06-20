import '@babel/polyfill';
import express from "express";
import bodyParser from 'body-parser';
import router from "./app/route/routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res) => {
    return res.status(405).send({
        "status": 405,
        "error": "You have hit the wrong endpoint!"
    });
});
app.use((req, res) => {
    return res.status(500).send({
        "status": 500,
        "error": "Server error. The error is not on your side"
    });
});
app.use('/api-docs',
    swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});


export default app;