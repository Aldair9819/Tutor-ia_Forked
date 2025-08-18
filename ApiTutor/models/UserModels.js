//importar la conexion de la base de datos
import db from "../database/db.js";
//importamos sequalize
import { DataTypes } from "sequelize";

export const UserModels = db.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: 'usuarios'  // Nombre de la tabla en la base de datos
  });

  // Hook para encriptar la contraseña antes de crear el usuario
  
  export default UserModels