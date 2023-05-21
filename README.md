# ProyectoFinal
 apirest
//Proyecto del modulo 3
//Se implemento bajo el ejemplo del curso
No deben olvidar ejecutar los comandos
npm install --save express
npm install --save pg

//Crear una BD en postgres llamada postgres con usuario postgres y paswoord postgres que tiene una tabla de usuarios 

//Script creacion de la BD

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    cedula_identidad VARCHAR(50) not null,
    nombre VARCHAR(50) NOT NULL,
    primer_apellido VARCHAR(50) NOT NULL,
    segundo_apellido VARCHAR(50) NOT NULL,
    fecha_nacimiento DATE NOT NULL
);

//Insert de valores para que la BD no este vacia y pruebas
INSERT INTO usuarios (cedula_identidad,nombre,primer_apellido,segundo_apellido,fecha_nacimiento) VALUES ('6456520','Aldo','Ayala','Ramos','1986-05-06');

//Para ejecutar el servidor debes ingresar el siguiente comando en la terminal: node app.js

//Para ejecuta las pruebas o verificar los endpoints puedes usar POSTMAN o cURL:

• Para listar a todos lo usuarios: GET ‘/usuarios’:
curl http://localhost:3000/usuarios
• Para listar un usuario en especifico GET ‘/usuarios/:id_usuario’
curl http://localhost:3000/usuarios/1
• Para crear un usuario POST ‘/usuarios’
curl -X POST -H "Content-Type: application/json" -d '{
  "cedula_identidad": "123456789",
  "nombre": "John",
  "primer_apellido": "Doe",
  "segundo_apellido": "Smith",
  "fecha_nacimiento": "1990-01-01"
}' http://localhost:3000/usuarios
• Para actualizar los datos de un usuario: PUT ‘/usuarios/:id_usuario’
curl -X PUT -H "Content-Type: application/json" -d '{
  "cedula_identidad": "987654321",
  "nombre": "Jane",
  "primer_apellido": "Doe",
  "segundo_apellido": "Smith",
  "fecha_nacimiento": "1992-02-02"
}' http://localhost:3000/usuarios/1
• Para eliminar a un usuario: DELETE ‘usuarios/:id_usuario’
curl -X DELETE http://localhost:3000/usuarios/1
• Para mostrar el promedio de edades de los usuarios: GET‘/usuarios/promedio-edad’
curl http://localhost:3000/usuarios/promedio-edad
• Para mostrar la version del api rest: GET ‘/estado’
curl http://localhost:3000/estado
