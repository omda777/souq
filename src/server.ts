import http from 'http';

import app from './app.js';




const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // connect databases
    

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