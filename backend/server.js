import { collection, addDoc } from "firebase/firestore"; 
import express from 'express';
import { db } from './firebase/config.js';

const app = express();
const port = 5000;

app.get('/create', async (req, res) => {
    try {
        req.body
        console.log("dipanggil");
        const data = { data: "test" };
        const docRef = await addDoc(collection(db, "datas"), data);
        console.log("berhasil bikin data", docRef.id);
        res.send("Data berhasil dibuat!");
    } catch (error) {
        console.log(error);
        res.status(500).send("Terjadi kesalahan");
    }
});

app.listen(port, () => {
    console.log(`server udah hidup di port ${port}`);
});
