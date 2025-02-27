import { EjerciciosModels } from "../models/EjerciciosModels.js";
import { UsuarioEjerciciosModel } from "../models/UsuarioEjerciciosModel.js"; // Ajusta la ruta según tu estructura de archivos

export const getEjerciciosResueltosPorUsuario = async (req, res) => {
    try {
        // Obtener todos los ejercicios resueltos por usuario
        const ejerciciosResueltos = await UsuarioEjerciciosModel.findAll();

        // Verificar si se encontraron ejercicios resueltos
        if (!ejerciciosResueltos.length) {
            return res.status(404).json({ message: "No se encontraron ejercicios resueltos" });
        }

        // Retornar todas las columnas directamente
        const result = ejerciciosResueltos.map(item => item.toJSON());

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los ejercicios resueltos por usuario" });
    }
};

export const getEjerciciosPorUsuario = async (req, res) => {
    try {
        // Obtener el idusuario y el tema desde los parámetros de la URL
        const { id, tema } = req.body;

        // Consultar los ejercicios del tema especificado
        const ejerciciosbyTema = await EjerciciosModels.findAll({
            where: {
                temaId: tema
            }
        });

        // Consultar los ejercicios realizados por el usuario
        const ejerciciosUsuario = await UsuarioEjerciciosModel.findAll({
            where: {
                idusuario: id
            }
        });

        // Verificar si se encontraron registros
        if (!ejerciciosbyTema.length || !ejerciciosUsuario.length) {
             return res.json([]); // Retorna un arreglo vacío en lugar de un error
        }

        // Convertir los resultados a JSON para facilitar el filtrado
        const ejerciciosTemaIds = ejerciciosbyTema.map(item => item.id);
        const ejerciciosFiltrados = ejerciciosUsuario
            .filter(ejercicio => ejerciciosTemaIds.includes(ejercicio.idejercicio)&& ejercicio.resuelto === true)
            .map(ejercicio => ejercicio.toJSON());

        // Verificar si hay ejercicios filtrados
        if (!ejerciciosFiltrados.length) {
            return res.json([]); // Retorna un arreglo vacío en lugar de un error
        }

        // Retornar los ejercicios filtrados
        res.json(ejerciciosFiltrados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los ejercicios por usuario" });
    }
};

export const getEjerciciosPorId = async (req, res) => {
    try {
        // Obtener el idusuario y el idejercicio desde los parámetros de la URL
        const { id, idejercicio } = req.body;  // Asegúrate de que el body contenga id y idejercicio

        // Consultar el ejercicio realizado por el usuario con el idusuario y idejercicio especificados
        const ejercicioUsuario = await UsuarioEjerciciosModel.findOne({
            where: {
                idusuario: id,
                idejercicio: idejercicio
            }
        });

        // Verificar si se encontró el ejercicio
        if (!ejercicioUsuario) {
            return res.json({});  // Si no se encuentra el ejercicio, se retorna un objeto vacío
        }

        // Convertir los datos a JSON y retornarlos con el formato que pides
        const ejercicioData = ejercicioUsuario.toJSON();
        
        // Devolver la respuesta en el formato solicitado
        res.json({
            idusuario: ejercicioData.idusuario,
            idejercicio: ejercicioData.idejercicio,
            resuelto: ejercicioData.resuelto,
            fecha_ultimo_intento: ejercicioData.fecha_ultimo_intento,
            intentos: ejercicioData.intentos
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el ejercicio por ID de usuario" });
    }
};

export const getEjerciciosPorUsuarioTodos = async (req, res) => {
    try {
        // Obtener el idusuario y el tema desde los parámetros de la URL
        const { id, tema } = req.body;

        // Consultar los ejercicios del tema especificado
        const ejerciciosbyTema = await EjerciciosModels.findAll({
            where: {
                temaId: tema
            }
        });

        // Consultar los ejercicios realizados por el usuario
        const ejerciciosUsuario = await UsuarioEjerciciosModel.findAll({
            where: {
                idusuario: id
            }
        });
        
        // Verificar si se encontraron registros
        if (!ejerciciosbyTema.length || !ejerciciosUsuario.length) {
             return res.json([]); // Retorna un arreglo vacío en lugar de un error
        }

        // Convertir los resultados a JSON para facilitar el filtrado
        const ejerciciosTemaIds = ejerciciosbyTema.map(item => item.id);
        const ejerciciosFiltrados = ejerciciosUsuario
            .filter(ejercicio => ejerciciosTemaIds.includes(ejercicio.idejercicio))
            .map(ejercicio => ejercicio.toJSON());

        // Verificar si hay ejercicios filtrados
        if (!ejerciciosFiltrados.length) {
            return res.json([]); // Retorna un arreglo vacío en lugar de un error
        }

        // Retornar los ejercicios filtrados
        res.json(ejerciciosFiltrados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los ejercicios por usuario" });
    }
};

export const actualizarEjercicioUsuario = async (req, res) => {
    try {
        const { idusuario, idejercicio, resuelto } = req.body;

        // Convertir `resuelto` a booleano en caso de que venga como string
        const resueltoBoolean = resuelto === true || resuelto === "true"; 
        console.log("dotos recibidos");
        
        if (!idusuario || !idejercicio || typeof resueltoBoolean !== "boolean") {
            return res.status(400).json({ message: "Faltan parámetros requeridos o son inválidos" });
        }

        const registro = await UsuarioEjerciciosModel.findOne({
            where: { idusuario, idejercicio },
        });

        if (registro) {
            // Verificar si se intenta cambiar de true a false
            if (registro.resuelto === true) {
                return res.json({ message: "El ejercicio ya está resuelto y no puede cambiarse a falso", registro });
            }

            registro.intentos += 1;
            registro.resuelto = resueltoBoolean; // Solo se cambiará si es válido
            registro.fecha_ultimo_intento = new Date();
            await registro.save();
            return res.json({ message: "Registro actualizado", registro });
        } else {
            const nuevoRegistro = await UsuarioEjerciciosModel.create({
                idusuario,
                idejercicio,
                resuelto: resueltoBoolean,
                fecha_ultimo_intento: new Date(),
                intentos: 1,
            });
            return res.status(201).json({ message: "Registro creado", nuevoRegistro });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al procesar el registro" });
    }
};


export const resetearEjerciciosUsuario = async (req, res) => {
    try {
        const { idusuario } = req.body; // Obtenemos el id del usuario desde el cuerpo de la solicitud

        // Actualizamos todos los registros de ejercicios para este usuario, poniéndolos como no resueltos
        const resultado = await UsuarioEjerciciosModel.update(
            { resuelto: false }, // Establecer "resuelto" en false
            { where: { idusuario } } // Filtrar por el id del usuario
        );

        // Verificar si se actualizaron registros
        if (resultado[0] === 0) {
            return res.status(404).json({ message: "No se encontraron ejercicios para este usuario" });
        }

        // Si todo fue exitoso, retornamos el resultado actualizado
        return res.json({ message: `Se han actualizado ${resultado[0]} ejercicios a no resueltos` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al actualizar los ejercicios del usuario" });
    }
};
