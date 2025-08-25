//importamos el modelo

import UserModels from "../models/UserModels.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from "nodemailer";
import "dotenv/config";

//definir metodos para el CRUD

// Realizar una consulta para obtener todos los usuarios
export const getUsers = async(req, res)=>{
    const users = await UserModels.findAll(); // Busca todos los registros
    res.json(users)
    console.log(users);
}
// Obtener un usuario por su ID
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModels.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Actualizar el nombre de usuario por su ID
export const updateNombreById = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    try {
        const usuario = await UserModels.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        usuario.nombre = nombre || usuario.nombre;

        await usuario.save();
        res.json({ message: "Usuario actualizado con éxito", usuario });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Eliminar un usuario por su ID
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await UserModels.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        await usuario.destroy();
        res.json({ message: "Usuario eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Actualizar un usuario por su ID
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { user, nombre, contrasena } = req.body;

    console.log("Actualizando usuario con ID:", id);
    console.log("Datos recibidos:", { user, nombre, contrasena });

    try {
        const usuario = await UserModels.findByPk(id);
        if (!usuario) {
            console.log("Usuario no encontrado");
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Mostrar usuario actual antes de la actualización
        console.log("Usuario encontrado:", usuario);

        // Actualiza los campos
        usuario.user = user || usuario.user;
        usuario.nombre = nombre || usuario.nombre;

        if (contrasena) {
            console.log("Encriptando nueva contraseña...");
            const salt = await bcrypt.genSalt(10);
            usuario.contrasena = await bcrypt.hash(contrasena, salt);
            console.log("Contraseña encriptada:", usuario.contrasena);
        }

        await usuario.save();
        console.log("Usuario actualizado:", usuario);

        res.json({ message: "Usuario actualizado con éxito", usuario });
    } catch (error) {
        console.log("Error al actualizar usuario:", error);
        res.status(500).json({ message: error.message });
    }
};
//crear un usuario
export const createUser = async (req, res) => {
    const { user, nombre, contrasena, correo } = req.body;
    for (const [campo, valor] of Object.entries(req.body)) {
    if (typeof valor === "string" && valor.trim() === "") {
      return res
        .status(400)
        .json({ message: `El campo '${campo}' no puede estar vacío` });
    }
  }
    
    try {
        // Hashear la contraseña antes de guardarla
        console.log('Generando salt para la contraseña...');  // Asegúrate de que el salt se esté generando correctamente
        console.log('Salt generado:', 8);  // Muestra el salt generado

        const hashedPassword = await bcrypt.hash(contrasena, 8);
        console.log('Contraseña hasheada:', hashedPassword);  // Verifica que la contraseña se haya hasheado correctamente

        // Crear el usuario con la contraseña encriptada
        const newUser = await UserModels.create({ user, nombre, contrasena: hashedPassword ,correo});
        console.log('Usuario creado:', newUser);  // Verifica el nuevo usuario creado

        return res.status(201).json({ message: "Usuario creado con éxito", user: newUser });
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "El usuario o el correo ya están en uso" });
        } else {
        return res.status(500).json({ message: "Error al crear el usuario", error });
        }
    }
};
//verificar login
export const loginUser = async (req, res) => {
    const { user, contrasena } = req.body;

    try {
        // Buscar al usuario por su nombre de usuario
        const usuario = await UserModels.findOne({ where: { user } });

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Comparar la contraseña proporcionada con la almacenada (encriptada)
        const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);

        if (!isMatch) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        // Generar un token JWT
        const token = jwt.sign(
            { id: usuario.id, user: usuario.user, role: 'usuario' }, // Payload (datos del usuario)
            'SECRET_KEY', // Clave secreta (debe guardarse segura)
            { expiresIn: '1h' } // Tiempo de expiración
        );

        // Retornar el token y el idUsuario al cliente
        res.json({
            message: "Inicio de sesión exitoso",
            token,
            idUsuario: usuario.id // Incluyendo el idUsuario en la respuesta
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al procesar la solicitud de inicio de sesión" });
    }
};

/* Este campo son pruebas para el envío de correos. No está implementado para campo real */
export const enviarCorreo = async (req, res) => {

  const { user, nombre, contrasena, correo } = req.body;

  try {
    // 1) Credenciales de prueba (no envíes nada real, solo vista previa)
    const account = await nodemailer.createTestAccount();

    // 2) Transporter para Ethereal
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // STARTTLS
      auth: {
        user: account.user,
        pass: account.pass,
      },
      // logger: true, debug: true, // útil si quieres ver el diálogo SMTP
    });

    // 3) Enviar correo
    const info = await transporter.sendMail({
      from: `"Tutor-IA (dev)" <no-reply@tutoria.local>`, // puede ser cualquiera
      to: correo,
      subject: "Autentifica tu usuario en ¡Tutor-IA!",
      text: `¡Hola! se acaba de crear un nuevo usuario ${user} a su correo electronico 🚀
      Bienvenido a Tutor-IA!
      Este es el enlace de verificación: [enlace de verificación]

      Si usted no creó esta cuenta, puede ignorar este correo.
      `,
      // html: "<p>Hola! Este es un correo <b>de prueba</b> 🚀</p>",
    });

    // 4) URL de vista previa
    const previewUrl = nodemailer.getTestMessageUrl(info);
    console.log("✅ MessageID:", info.messageId);
    console.log("🔎 Preview URL:", previewUrl);

    return res?.status(200).json({
      ok: true,
      messageId: info.messageId,
      previewUrl, // abre esto en el navegador para ver el correo
    });
  } catch (error) {
    console.error("❌ Error al enviar:", error);
    return res?.status(500).json({ ok: false, error: error.message });
  }
};