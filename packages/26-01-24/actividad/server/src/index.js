const crypto = require('crypto')
const fs = require("fs");
const express = require("express");//agregmos la libreria express para su uso

const USERS_FILE = "./users.json";//Agregamos la ruta

const app = express();//creamos una variable app para guardar en ella la ejecución de express.
const port = 3000;

app.use(express.json());
//app.listen(3000);

// Crea el archivo json si no lo encuentra y le asigna un array vacio
if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}

app.post("/users", (req, res) => {
  const newUser = req.body;
  fs.readFile(USERS_FILE, (err, data) => {
    if (err) {
      res.status(500).send("Error al leer el archivo");
      return;
    }
    let users = JSON.parse(data);

    users.push({ id: crypto.randomUUID(), ...newUser });
    
    fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        res.status(500).send("Error al guardar el usuario");
      } else {
        res.status(200).send("Usuario creado exitosamente");
      }
    });
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
