import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const UsuarioEjerciciosModel = db.define('UsuarioEjercicios', {
    idusuario: {
        type: DataTypes.INTEGER,
        allowNull: false, // Si deseas que este campo sea obligatorio
    },
    idejercicio: {
        type: DataTypes.INTEGER,
        allowNull: false, // Si deseas que este campo sea obligatorio
    },
    resuelto: {
      type: DataTypes.BOOLEAN,
      allowNull: false, // Campo obligatorio
  },
  fecha_ultimo_intento: {
      type: DataTypes.DATE,
      allowNull: false, // Campo obligatorio
  },
  intentos: {
      type: DataTypes.INTEGER,
      allowNull: false, // Campo obligatorio
  },
}, {
    tableName: 'usuarioejercicios', // Nombre de la tabla intermedia
    timestamps: false, // Si no quieres que Sequelize maneje las fechas de creación y actualización
});

export { UsuarioEjerciciosModel };
