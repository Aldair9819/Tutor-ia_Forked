import db from "../database/db.js";
import { DataTypes } from "sequelize";

export const TemasModel = db.define("Temas", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: "temas", // Asegúrate de que coincide con el nombre real de la tabla en tu base de datos
  timestamps: false, // Si no usas las columnas createdAt y updatedAt
});

export default TemasModel;
