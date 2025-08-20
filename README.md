# Tutor-ia

Página web para aprender matemáticas con un tutor virtual que funciona con inteligencia artificial

## Tecnologías

Este Software utiliza las siguientes tecnologías:

- FrontEnd: Vite + React
- BackEnd: JS Express
- DB: MariaDB (Antes MySQL)

## Archivo .env

Estas son las variables que contiene:

- DATABASE_NAME: Nombre de la base de datos dentro de MariaDB
- DATABASE_USER: Nombre del usuario para acceder a la DB
- DATABASE_PASSWORD: Contraseña para acceder a la DB
- DATABASE_HOST: URL del Host de la DB. Puede ser mediante red Docker o mediante red localhost
- DATABASE_PORT: Puerto de la DB. Por defecto MariaDB maneja el puerto 3306
- VITE_URL_API_MODEL_AI: URL para el uso de modelos LLM. Es necesario que empiece por VITE_ para que sea reconocido por Vite + React . El URL en localhost es <http://localhost:11434/>
- API_KEY= La API KEY para el uso de modelos LLM. Realmente no se utiliza y es una implementación a futuro por si se requiere utilizar modelos LLM de fuentes externas
- VITE_URI: URL que accede directamente al Backend corriendo en local. Esta por defecto es: <http://localhost:8000/api/>

## Instalación local

Hay un .env_example que debe de ser nombrado a .env
Este .env requiere estar en estas carpetas:

- ApiTutor
- tutorTesis1

Después de eso hay que instalar y correr las dependencias del Backend y Frontend

### Database

Se utiliza MariaDB como base de datos (Antes MySQL). Hay un archivo en raíz llamado `bdtutorias.sql`

Se debe de ejecutar dentro de MariaDB para que se creen las tablas y el contenido. Es necesario el contenido de las tablas, dado que contienen los ejercicios a mostrar en el Front y validaciones en el Back.

### Backend

La carpeta es ApiTutor. Antes de correrlo es requerido que MariaDB estén en ejecución.
Pasos:

- Ir a la terminal de la raíz del proyecto
- En terminal, ir a la carpeta ApiTutor: `cd ApiTutor`
- En terminal, instalar las dependencias del programa: `npm install --production`
- En terminal, correr el BackEnd: `npm start`

Se inicializará y correrá en segundo plano. Dejar la terminal corriendo, o sino se detendrá el proceso.

### FrontEnd

La carpeta es tutorTesis1. Antes de correrlo es requerido que tanto el BackEnd como MariaDB estén en ejecución.
Pasos:

- Ir a la terminal de la raíz del proyecto
- En terminal, ir a la carpeta ApiTutor: `cd tutorTesis1`
- En terminal, instalar las dependencias del programa: `npm install`
- En terminal, correr el BackEnd: `npm run dev -- --host`

## Instalación mediante docker

- Renombrar el archivo .env_example a .env
- Poner los valores del .env a los que sean particular al servidor que se maneje
- Correr este comando: `docker compose up --build`
  - Permite correr los tres contenedores a la vez:
        - MariaDB
            - Ya ejecuta el script `bdtutorias.sql` en automático
        - Vite + React
        - JS Express
