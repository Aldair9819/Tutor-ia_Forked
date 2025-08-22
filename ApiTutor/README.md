# Backend: Express Javascript

## Preparación antes de instalar e inicializar

La carpeta en la cual corre el back-end es ApiTutor. Antes de correrlo es requerido que MariaDB o MySQL estén en ejecución.

A su vez usar el .env_example para poner las variables de entorno y renombrarlo a .env.

## Archivo .env

Estas son las variables que contiene:

- DATABASE_NAME: Nombre de la base de datos dentro de MariaDB
- DATABASE_USER: Nombre del usuario para acceder a la DB
- DATABASE_PASSWORD: Contraseña para acceder a la DB
- DATABASE_HOST: URL del Host de la DB. Por defecto se usa `localhost`.
- DATABASE_PORT: Puerto de la DB. Por defecto MariaDB maneja el puerto `3306`

## Instalación y uso (modo desarrollo)

- Ir a la terminal de la raíz del proyecto
- En terminal, ir a la carpeta ApiTutor: `cd ApiTutor`
- En terminal, instalar las dependencias del programa: `npm install`
- En terminal, correr el BackEnd: `npm run dev`

Se inicializará y correrá en segundo plano. Dejar la terminal corriendo, o sino se detendrá el proceso.