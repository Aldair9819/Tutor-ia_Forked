import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const db = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    port: process.env.DATABASE_PORT,
    pool: {
      max: 10,
      min: 0,
      idle: 30000,
      acquire: 60000,
    },
    dialectOptions: {
      connectTimeout: 60000,
    },
    logging: false,
  }
);

async function connectWithRetry(maxRetries = 20, delayMs = 3000) {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      await db.authenticate();
      console.log('✅ Conexión establecida con éxito.');
      return;
    } catch (err) {
      attempt++;
      console.warn(
        `❌ Intento ${attempt} de ${maxRetries} fallido: ${err.message}`
      );
      if (attempt >= maxRetries) {
        console.error('No se pudo conectar a MariaDB después de varios intentos.');
        process.exit(1); // Docker reiniciará el contenedor
      }
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
}

// Llamas a la función de espera/reintentos
await connectWithRetry();

export default db;
