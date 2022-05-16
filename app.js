// Entry Point of the API Server 
  
// const express = require('express');
// const { connectDatabse }= require('./api/postgres')
import express from 'express';
import { connectDatabase, pool } from './api/postgres.js';
import pg from "pg";
import { router as itemRoute } from './routes/itemRoutes.js'
const { Pool } = pg;

/* Creates an Express application. 
   The express() function is a top-level 
   function exported by the express module.
*/
const app = express();
const weatherKey = "b68b7ccb1f294d7a84315200221605";

app.use(express.json())
app.use('/item', itemRoute)
const cities = ["Waterloo", "Chicago", "Toronto", "London", "Seattle"];

app.get('/testdata', (req, res, next) => {
    // const pool = connectDatabase();
    console.log("TEST DATA :");
    pool.query('Select * from warehouses')
        .then(testData => {
            console.log(testData);
            res.send(testData.rows);
        })
})

app.get('/', (req, res) => res.send('Hello World!'))
const main = async () => {
    //	await setupDatabaseSchema();
    await connectDatabase();

};

main();

const server = app.listen(3000, function () {
    let port = server.address().port
    console.log(`app listening at http://localhost:${port}`)
})

/*
create database backend;


CREATE TABLE Items(
    ItemName varchar(255),
    WarehouseLocation varchar(255),
    Active bool

);

CREATE TABLE Warehouses(
    WarehouseLocation varchar(255),
    Weather varchar(2048)
);

CREATE TABLE Archived(
    Item varchar(255),
    Reason text
);
*/