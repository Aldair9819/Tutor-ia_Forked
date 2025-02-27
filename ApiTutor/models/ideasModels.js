import db from "../database/db.js";
import { DataTypes } from "sequelize";

// Definición del modelo Usuario
export const ideasModels = db.define('ideasusuario', {
    idusuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idejercicio: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idea: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      conclusion: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      resultado: {
        type: DataTypes.BOOLEAN, // tinyint(1) se mapea como boolean en Sequelize
        allowNull: false,
      },
      intento: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      respuesta: {
        type: DataTypes.TEXT,
        allowNull:true,
      }
    }, {
      tableName: 'ideasusuario', // Nombre de la tabla en la base de datos
      timestamps: false, // No tiene columnas createdAt o updatedAt
    });
  