const { Client } = require('pg');

const waitForDb = async () => {
  const dbConfig = {
    user: process.env.POSTGRES_USER,
    host: 'postgres-dev', 
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  };

  console.log('Waiting for the database to be ready...');
  const client = new Client(dbConfig);

  for (let attempt = 1; attempt <= 10; attempt++) {
    try {
      await client.connect();
      console.log('Database is ready!');
      await client.end();
      process.exit(0);
    } catch (error) {
      console.log(`Attempt ${attempt}: Database not ready, retrying...`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  console.error('Database not ready after 10 attempts. Exiting.');
  process.exit(1);
};

waitForDb();
