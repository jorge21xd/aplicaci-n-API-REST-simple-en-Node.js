const express = require('express');//cargar el modulo express para aplicaciones web en node js.
const jwt = require('jsonwebtoken');//para firmar y verificar JSON Web Tokens (JWT)
const bodyParser = require('body-parser');//Este middleware analiza los cuerpos de las solicitudes entrantes
const USERS_FILE = "./users.json";//Agregamos la ruta, esta ruta se utilizará para leer o escribir datos de usuario en el archivo 'users.json'.
const app = express(); //llamando a la función express() 
const port = 3000;//puerto que va ser utilizado el servidor express
 // Configuraciones básicas de Express
app.use(bodyParser.json());//Analiza el cuerpo de las solicitudes entrantes en formato JSON.
// Verificar si secretKey está definido

// Secret Key para firmar el JWT (para menejarlo de manera segura)
const secretKey = process.env.JWT_SECRET || 'mi_secreto_super_seguro';//permite mantener la clave fuera del código fuente y protegerla en entornos de implementación.
 
// Middleware para verificar JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  //Se verifica si se proporciona un token en la cabecera de autorización. 
  //Si no se proporciona un token, se envía una respuesta de error con el código de estado 403 (Forbidden) y un mensaje indicando que el token no fue proporcionado.
  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
  //Si se proporciona un token, se utiliza la función jwt.verify() del módulo 'jsonwebtoken' para verificar si el token es válido. 
  //Esta función toma tres argumentos,token a verificar, la clave secreta utilizada para firmar el token y una función de devolución de llamada
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.user = decoded;//contiene la información del usuario codificada en el token
    next();//se llama a la función para pasar el control al siguiente middleware en la cadena
  });
};

// Ruta de bienvenida
//Utilizando el método get de Express, se configura una ruta para manejar solicitudes GET a la ruta raíz ("/"). 
app.get('/', (req, res) => { //Toma dos argumentos: req (la solicitud entrante) y res (la respuesta que se enviará).
    res.send('¡Bienvenido a mi aplicación!');//para enviar una respuesta al cliente.
  });
  

// Ruta para el login y generación de JWT
app.post('/login', (req, res) => { //Utilizando el método post de Express,  se configura una ruta para manejar solicitudes POST a la ruta '/login'. 
  const { username, password } = req.body;//extraer las propiedades username y password del cuerpo de la solicitud (req.body).


  // Ruta protegida que solo es accesible con un JWT válido
  //ruta para manejar solicitudes POST a la ruta '/users', tiene un tercer argumento adicional,  verifyToken.
  //primero se ejecutará el middleware verifyToken que se definio anteriormente.
  /*
  app.post('/users', verifyToken, (req, res) => { 
    // ... (código para la ruta protegida)
  });
   */
  app.post('/users', verifyToken, (req, res) => {
    // Verificar si se proporciona un nombre de usuario y una contraseña en el cuerpo de la solicitud
    const { username, password } = req.body;
  
    // Verificar que se proporcionen tanto el nombre de usuario como la contraseña
    if (!username || !password) {
      return res.status(400).json({ message: 'Se requiere un nombre de usuario y una contraseña.' });
    }
  
    // Si se proporcionan nombre de usuario y contraseña, se puede proceder a crear un nuevo usuario
    // Aquí podrías agregar código para crear un nuevo usuario en tu base de datos o realizar otras operaciones necesarias
    // Por ejemplo:
    // users.create({ username, password })
    // .then(newUser => {
    //   res.status(201).json({ message: 'Usuario creado exitosamente.', user: newUser });
    // })
    // .catch(error => {
    //   res.status(500).json({ message: 'Error al crear el usuario.', error: error });
    // });
  
    // Aquí solo se proporciona un ejemplo básico, deberías agregar tu lógica de creación de usuario según tu aplicación
  
    // Si se completa la operación de creación de usuario con éxito, se envía una respuesta al cliente
    res.status(201).json({ message: 'Usuario creado exitosamente.' });
  });


  
  // Validar las credenciales 
  if (username === 'usuario' && password === 'contraseña') {//comparando si el nombre de usuario es 'usuario' y la contraseña es 'contraseña'.ver si coinciden con los valores especificados
    // Crear y firmar el JWT
    //creando y firmando un JWT utilizando la función jwt.sign() del módulo 'jsonwebtoken'.
    //El token se crea con un objeto que contiene el nombre de usuario y los roles del usuario
    //Se utiliza la clave secreta secretKey para firmar el token y se especifica que el token expirará en 1 hora
    const token = jwt.sign({ username, roles: ['user'] }, secretKey, { expiresIn: '1h' });

    res.json({ token });//Una vez que se crea el token JWT, se envía como respuesta al cliente en formato JSON.
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
});

// Ruta protegida que solo es accesible con un JWT válido
//ruta para manejar solicitudes POST a la ruta '/users'. 
//antes de ejecutar la función de devolución de llamada para esta ruta, primero se ejecutará el middleware verifyToken 
//toma dos argumentos: req (la solicitud entrante) y res (la respuesta que se enviará).
app.post('/users', verifyToken, (req, res) => {
  // Solo llegará aquí si el token es válido
  //se envía una respuesta JSON al cliente.
  //se envía un objeto JSON con un mensaje que indica que se ha accedido a una ruta protegida y que se ha creado un nuevo usuario.
  res.json({ message: 'Ruta protegida. Nuevo usuario creado.' });
});

// Iniciar el servidor
app.listen(port, () => {//para iniciar un servidor que escucha las conexiones en un puerto específico.
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
