import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import Router from './routes/route.js';
import Connection from '../server/database/db.js';

dotenv.config();

const PORT = 3001;
const USERNAME =  process.env.DB_USERNAME;
const  PASSWORD =  process.env.DB_PASSWORD;


const app = express();


app.use(cors())
//express does not knows how to handle post calls so when passing body we need body parser
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}))


app.use('/', Router);

app.listen(PORT , ()=> {
    console.log(`Server Listening to PORT ${PORT}`)
});

Connection(USERNAME , PASSWORD);