import { collection, addDoc } from "firebase/firestore";
import express from 'express';
import { db } from './firebase/config';
import routes from "./routes"
import cors from "cors";

const app = express();
const port = 5000;

//cors, supaya bisa diakses frontend
app.use(cors());

//supaya bisa nerima body json
app.use(express.json());

app.use("/", routes);

app.listen(port, () => {
    console.log(`server udah hidup di port ${port}`);
});
