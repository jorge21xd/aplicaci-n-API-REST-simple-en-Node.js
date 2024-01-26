var fs = require("fs");
var http = require("http");

/* ⚠️ NO MODIFICAR NADA POR ENCIMA DE ESTA LÍNEA ⚠️ */
/* AQUÍ DEBAJO PUEDES ESCRIBIR LA CONSTANTE DEL PUERTO */
const PORT = 3000;
const server = http.createServer( function(req, res){ 
 	res.writeHead(200, { 'Content-Type':'text/plain' })  //tipo de contenido
	res.end('Hola, Mundo!\n');//respuesta para el ususario
});

if(req.url === '/api'){ //Si la URL es /api devolvemos el objeto
  res.writeHead(200, { 'Content-Type':'text/html' })
  var html = fs.readFileSync(__dirname +'/html/index.html');
  res.end(html);
} else{
  res.writeHead(404); //Ponemos el status del response a 404: Not Found
  res.end(); //No devolvemos nada más que el estado.
}


server.listen(3000,() => {//puerto en el que se inicia
  //console.log("iniciando servidor en el puerto 3000");
  console.log(`iniciando servidor en el puerto ${PORT}`);

});
/* ⚠️ LA LÍNEA SIGUIENTE TIENE QUE QUEDAR COMO ESTÁ PARA PODER EXPORTAR EL SERVIDOR ⚠️ */
module.exports =
  /* AQUÍ DEBAJO YA PUEDES ESCRIBIR TÚ CÓDIGO REEMPLAZANDO EL VALOR DE NULL POR EL SERVIDOR */
  null;


  
