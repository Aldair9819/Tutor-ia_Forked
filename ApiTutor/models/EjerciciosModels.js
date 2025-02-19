// EjerciciosModels.js
import db from "../database/db.js";
import { DataTypes } from "sequelize";

export const EjerciciosModels = db.define("Ejercicios", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    respuesta: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    unidad: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    unidadopciones: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    tema: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    temaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'temas', // La tabla de temas
          key: 'id'
        }
      },
}, {
    tableName: 'ejercicios',
});
