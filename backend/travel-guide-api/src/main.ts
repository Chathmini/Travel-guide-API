import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import* as express from 'express';
import {ExpressAdapter} from '@nestjs/platform-express';
import* as functions from 'firebase-functions';

const server = express();

export const createNestServer = async(expressInstance) =>{
  const app= await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance)
  );
  return app.init();
};

createNestServer(server)
.then(v=>console.log("Travel-Guide-API ready!"))
.catch(err=>console.error("API initialization failed!",err));

export const api = functions.https.onRequest(server);


