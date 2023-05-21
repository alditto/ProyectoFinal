const express = require("express");
const {Pool} = require ("pg");

const app = express();
const port = 3000;

const pool = new Pool({
    user :"postgres",
    host:"localhost",
    database:"postgres",
    password:"postgres",
    port:"54320",
});

//Implementamos el patron MVC
//Modelo
class Model{
    async getUsuarios(){
            const {rows} = await pool.query("select * from usuarios;");
            return rows;
    }
    
    async getUsuariosById(id) {
        const { rows } = await pool.query("select * from usuarios where id = $1;", [id,]);
        return rows[0];
    }
    async addUsuarios(cedula_identidad, nombre,primer_apellido,segundo_apellido,fecha_nacimiento) {
        await pool.query("INSERT INTO usuarios (cedula_identidad, nombre, primer_apellido, segundo_apellido, fecha_nacimiento) values ($1, $2, $3, $4, $5)", [cedula_identidad, nombre, primer_apellido, segundo_apellido, fecha_nacimiento]);
    }
    async updateUsuarios(id, cedula_identidad, nombre,primer_apellido,segundo_apellido,fecha_nacimiento) {
      await pool.query("UPDATE usuarios SET cedula_identidad = $1 ,nombre=$2,primer_apellido=$3,segundo_apellido=$4,fecha_nacimiento=$5 WHERE id = $6", [id,cedula_identidad, nombre,primer_apellido,segundo_apellido,fecha_nacimiento]);
    }
    async deleteItem(id) {
      await pool.query("DELETE FROM usuarios WHERE id = $1", [id]);
    }
}

//Controlador
class Controller {
    constructor(model) {
      this.model = model;
    }
  
    async getUsuarios(req, res) {
      const data = await this.model.getUsuarios();
      res.send(data);
    }
  
    async getUsuariosById(req, res) {
      const id = req.params.id;
      const data = await this.model.getUsuariosById(id);
      res.send(data);
    }
    async addUsuarios(req, res) {
        const cedula_identidad = req.body.cedula_identidad;
        const nombre = req.body.nombre;
        const primer_apellido = req.body.primer_apellido;
        const segundo_apellido = req.body.segundo_apellido;
        const fecha_nacimiento = req.body.fecha_nacimiento;
  
        await this.model.addUsuarios(cedula_identidad, nombre, primer_apellido, segundo_apellido, fecha_nacimiento);
        res.sendStatus(201);
      }
      async updateItem(req, res) {
        const id = req.params.id;
        const cedula_identidad = req.body.cedula_identidad;
        const nombre = req.body.nombre;
        const primer_apellido = req.body.primer_apellido;
        const segundo_apellido = req.body.segundo_apellido;
        const fecha_nacimiento = req.body.fecha_nacimiento;
        await this.model.updateItem(id, cedula_identidad, nombre,primer_apellido,segundo_apellido,fecha_nacimiento);
        res.sendStatus(200);
      }
      async deleteItem(req, res) {
        const id = req.params.id;
        await this.model.deleteItem(id);
        res.sendStatus(200);
      }
    
}

//Instancia
const model = new Model();
const controller = new Controller(model);

app.use(express.json());

app.get("/usuarios", controller.getUsuarios.bind(controller));
app.get("/usuarios/:id", controller.getUsuariosById.bind(controller));
app.post("/usuarios", controller.addUsuarios.bind(controller));
app.put("/usuarios/:id", controller.updateItem.bind(controller));
app.delete("/usuarios/:id", controller.deleteItem.bind(controller));
app.get('/usuarios/promedio-edad', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT AVG(EXTRACT(YEAR FROM age(fecha_nacimiento))) as promedio_edad FROM usuarios');
      const promedioEdad = parseFloat(rows[0].promedio_edad);
      res.json({ promedioEdad:promedioEdad });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el promedio de edades' });
    }

  });
  app.get('/estado', (req, res) => {
    const version = '0.0.1';
    const developer = 'Aldo Ayala Ramos';
    const email = 'aldo.ayala.ramos@outlook.com';
  
    res.json({ nameSystem: 'api-users', version, developer, email });
  });

app.listen(port, () => {
    console.log(`Este servidor se ejecuta en http://localhost:${port}`);
  });