/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';

let server: Server;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(config.database_url as string);

  server = app.listen(config.port, () => {
    console.log(`Academix server is running on port ${config.port}`);
  });
}

process.on('unhandledRejection', () => {
  console.log('Unhandled Rejection Detected, Shutting down the server');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log('Uncaught Exception Detected, Shutting down the server');
  process.exit(1);
});
