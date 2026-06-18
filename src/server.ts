import http from 'http';

import './config/config.js';
import app from './app.js';

import connectMongo from './config/db.mongo.js';
import connectPostgres from './config/db.postgres.js';


const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // connect databases
    await connectMongo();
    
    await sequelize
    .authenticate()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch((error) => {
      console.error("PostgreSQL connection error:", error);
      process.exit(1);
    });

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