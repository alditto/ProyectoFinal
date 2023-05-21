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