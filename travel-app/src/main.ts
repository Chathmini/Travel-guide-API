import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as functions from "firebase-functions";
import admin = require('firebase-admin');

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();

const server = express();

export const createNestServer = async(expressInstance) => {

  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://authentication-31bdb.firebaseio.com"
  });

  const app = await NestFactory.create (
    AppModule,
    new ExpressAdapter(expressInstance)
  );
  return app.init();
}

createNestServer(server)
.then(v => console.log("Travel Guide Api ready"))
.catch(err => console.error("API initialization failed", err));

export const api = functions.https.onRequest(server);