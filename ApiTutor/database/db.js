import { Sequelize } from 'sequelize';

// Crear la conexión con la base de datos
const db = new Sequelize('proyectotutoria', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,  // Asegúrate de usar el puerto correcto
  pool: {
    max: 10,
    min: 0,
    idle: 30000
  }
});






export default db;