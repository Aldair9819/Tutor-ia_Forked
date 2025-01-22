import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const db = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: 'mysql',
  port: process.env.DATABASE_PORT,
  pool: {
    max: 10,
    min: 0,
    idle: 30000,
    acquire: 60000
  },
  dialectOptions: {
    connectTimeout: 60000
  }
});

db.authenticate()
  .then(() => {
    console.log('Conexión establecida con éxito.');
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
  });

export default db;