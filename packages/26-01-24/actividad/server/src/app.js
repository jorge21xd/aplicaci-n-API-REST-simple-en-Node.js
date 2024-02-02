const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const USERS_FILE = "./users.json";//Agregamos la ruta
const app = express();
const port = 3000;
 // Configuraciones básicas de Express
app.use(bodyParser.json());
// Verificar si secretKey está definido

// Secret Key para firmar el JWT (para menejarlo de manera segura)
const secretKey = process.env.JWT_SECRET || 'mi_secreto_super_seguro';
 
// Middleware para verificar JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.user = decoded;
    next();
  });
};
// Ruta de bienvenida
app.get('/', (req, res) => {
    res.send('¡Bienvenido a mi aplicación!');
  });
  

// Ruta para el login y generación de JWT
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Ruta protegida que solo es accesible con un JWT válido
app.post('/users', verifyToken, (req, res) => {
    // ... (código para la ruta protegida)
  });

  // Validar las credenciales (puedes implementar tu propia lógica aquí)
  if (username === 'usuario' && password === 'contraseña') {
    // Crear y firmar el JWT
    const token = jwt.sign({ username, roles: ['user'] }, secretKey, { expiresIn: '1h' });

    res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
});

// Ruta protegida que solo es accesible con un JWT válido
app.post('/users', verifyToken, (req, res) => {
  // Solo llegará aquí si el token es válido
  res.json({ message: 'Ruta protegida. Nuevo usuario creado.' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
