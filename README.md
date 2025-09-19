# Proyecto Juegos y Personajes API REST

Este proyecto es un backend con JavaScript, usando librerías como Express, Mongoose y Dotenv, además de una base de datos MongoDB Atlas.
La idea es poder crear una enciclopedia sobre la saga Assassins Creed con la colaboración de la comunidad de usuarios, que podrá añadir
personajes a los juegos, junto con toda la información que quieran.

## Endpoints de Games

| Método | Ruta | Descripción | Autenticación |
|--------|------|-------------|---------------|
| GET    | /api/v1/games | Trae todos los juegos | Ninguna |
| GET    | /api/v1/games/:id | Trae juego por ID | Ninguna |
| GET    | /api/v1/games/year/:year | Trae juegos por año de lanzamiento | Ninguna |
| POST   | /api/v1/games | Crea un nuevo juego | Admin |
| PUT    | /api/v1/games/:id | Actualiza juego por ID | Admin |
| DELETE | /api/v1/games/:id | Borra juego por ID | Admin |

## Endpoints de Characters

| Método | Ruta | Descripción | Autenticación |
|--------|------|-------------|---------------|
| GET    | /api/v1/characters | Trae todos los personajes | Ninguna |
| GET    | /api/v1/characters/:id | Trae personaje por ID | Ninguna |
| GET    | /api/v1/characters/category/:category | Trae personajes por categoría | Ninguna |
| POST   | /api/v1/characters | Crea nuevo personaje | Usuario logueado |
| PUT    | /api/v1/characters/:id | Actualiza personaje por ID | Admin |
| DELETE | /api/v1/characters/:id | Borra personaje por ID | Admin |

## Endpoints de Users

| Método | Ruta | Descripción | Autenticación |
|--------|------|-------------|---------------|
| GET    | /api/v1/users | Trae todos los usuarios | Admin |
| POST   | /api/v1/users/register | Crea nuevo usuario | Ninguna |
| POST   | /api/v1/users/login | Login de usuario | Ninguna |
| PUT    | /api/v1/users/:id | Actualiza usuario | Usuario logueado |
| DELETE | /api/v1/users/:id | Borra usuario | Usuario logueado |
