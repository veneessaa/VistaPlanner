import { collection, addDoc } from "firebase/firestore";
import express from 'express';
import { db } from './firebase/config';
import routes from "./routes"

const app = express();
const port = 5000;

app.use(express.json());

app.use("/", routes);

app.listen(port, () => {
    console.log(`server udah hidup di port ${port}`);
});
