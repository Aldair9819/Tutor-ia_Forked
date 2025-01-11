// imagenesEjerModels.js
import db from "../database/db.js";
import { DataTypes } from "sequelize";

export const ImagenesEjerModels = db.define("imagenesejercicios", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idejercicio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'imagenesejercicios',
});
