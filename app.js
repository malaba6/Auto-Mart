import '@babel/polyfill';
import express from "express";
import bodyParser from 'body-parser';
import router from "./app/route/routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api-docs',
    swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(router);

app.use((req, res) => res.status(405).send({
    "status": 405,
    "error": "This URL is not defined"
}));

app.use((req, res) => res.status(500).send({
    "status": 500,
    "error": "Oops! The problem is not on your side. Hang on, we will fix this soon"
}));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});


export default app;