import { ImagenesEjerModels } from "./imagenesEjerModels.js";
import { EjerciciosModels } from "./EjerciciosModels.js";
import { UserModels } from "./UserModels.js"; // Importar el modelo de Usuario
import { UsuarioEjerciciosModel } from './UsuarioEjerciciosModel.js'; // Ajusta la ruta

// Configurar la relación "uno a muchos" entre Ejercicios y ImagenesEjer
// Un ejercicio puede tener varias imágenes, por eso usamos `hasMany` en EjerciciosModels.
EjerciciosModels.hasMany(ImagenesEjerModels, {
    foreignKey: "idejercicio", // Clave foránea en la tabla de imágenes
    onDelete: "CASCADE", // Si un ejercicio se elimina, se eliminarán las imágenes asociadas
});

// Configurar la relación "pertenece a" entre ImagenesEjer y Ejercicios
// Una imagen pertenece a un ejercicio, por eso usamos `belongsTo` en ImagenesEjerModels.
ImagenesEjerModels.belongsTo(EjerciciosModels, {
    foreignKey: "idejercicio", // Clave foránea en la tabla de imágenes
    onDelete: "CASCADE", // Si una imagen se elimina, no afecta al ejercicio
});

// Relación Muchos a Muchos entre Usuarios y Ejercicios
// Un usuario puede tener varios ejercicios y un ejercicio puede ser resuelto por varios usuarios
UserModels.belongsToMany(EjerciciosModels, {
    through: UsuarioEjerciciosModel, // Tabla intermedia que almacena la relación
    foreignKey: 'idusuario', // Clave foránea que hace referencia a los usuarios
    otherKey: 'idejercicio', // Clave foránea que hace referencia a los ejercicios
    onDelete: "CASCADE", // Si un usuario se elimina, los ejercicios relacionados también se eliminarán
});

EjerciciosModels.belongsToMany(UserModels, {
    through: UsuarioEjerciciosModel, // Tabla intermedia que almacena la relación
    foreignKey: 'idejercicio', // Clave foránea que hace referencia a los ejercicios
    otherKey: 'idusuario', // Clave foránea que hace referencia a los usuarios
    onDelete: "CASCADE", // Si un ejercicio se elimina, los usuarios relacionados también se eliminarán
});