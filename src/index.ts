import express from 'express';
import dotenv from 'dotenv';
import {json,urlencoded} from 'body-parser';
import http from 'http';
import {createContext} from './init';
import {route} from './route';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(json());
app.use(urlencoded({ extended: true }))
http.createServer(app).listen(port, () => {
  console.log('Start server at port ' + port);
});
const ctx = createContext();
route(app, ctx);
