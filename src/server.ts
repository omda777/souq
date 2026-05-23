import http from 'http';
import dotenv from 'dotenv';

import app from './app.js';

dotenv.config();

import connectMongo from './config/db.mongo.js';
import connectPostgres from './config/db.postgres.js';


const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // connect databases
    connectMongo();
    connectPostgres();
    // create server
    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
};

startServer();