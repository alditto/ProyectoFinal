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
}

//Instancia
const model = new Model();
const controller = new Controller(model);

app.use(express.json());

app.get("/usuarios", controller.getUsuarios.bind(controller));
app.get("/usuarios/:id", controller.getUsuariosById.bind(controller));
app.post("/usuarios", controller.addUsuarios.bind(controller));

app.listen(port, () => {
    console.log(`Este servidor se ejecuta en http://localhost:${port}`);
  });