import express from 'express';
import { connectDatabase, pool } from './api/postgres.js';
import pg from "pg";
import { router as itemRoute } from './routes/itemRoutes.js'
import { router as deletionRoute } from './routes/deletionRoutes.js'

const { Pool } = pg;

const app = express();
const weatherKey = "b68b7ccb1f294d7a84315200221605";

app.use(express.json())
app.use('/item', itemRoute)
app.use('/delete', deletionRoute)
const cities = ["Waterloo", "Chicago", "Toronto", "London", "Seattle"];


app.get('/', (req, res) => res.send('Hello World! Please read README for instructions! '))
const main = async () => {
    await connectDatabase();

};

main();

const server = app.listen(3000, function () {
    let port = server.address().port
    console.log(`app listening at http://localhost:${port}`)
})
