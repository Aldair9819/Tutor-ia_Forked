# Frontend: React + Vite

## Instalación y uso en modo desarrollo

La carpeta en la cual corre el Front-end tutorTesis1. Antes de correrlo es requerido que tanto el BackEnd como MariaDB o MySQL estén en ejecución.

A su vez usar el .env_example para poner las variables de entorno y renombrarlo a .env.

## Archivo .env

Estas son las variables que contiene:

- VITE_URL_API_MODEL_AI: URL para el uso de modelos LLM. Es necesario que empiece por VITE_ para que sea reconocido por Vite + React . El URL en localhost es <http://localhost:11434/>
- VITE_API_KEY= La API KEY para el uso de modelos LLM. Realmente no se utiliza y es una implementación a futuro por si se requiere utilizar modelos LLM de fuentes externas
- VITE_URI: URL que accede directamente al Backend corriendo en local. Esta por defecto es: <http://localhost:8000/api/>


## Instalación y uso (modo desarrollo)

- Ir a la terminal de la raíz del proyecto.
- En terminal, ir a la carpeta ApiTutor: `cd tutorTesis1` 
- En terminal, instalar las dependencias del programa: `npm install`
- En terminal, correr el BackEnd: `npm run dev -- --host`

Se inicializará y correrá en segundo plano. Dejar la terminal corriendo, o sino se detendrá el proceso.