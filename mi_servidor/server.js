const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const puerto = 3000;

// Función para crear rutas dinámicas para una categoría específica
function crearRutasCategoria(categoria) {
  const archivosJsonPath = path.join(__dirname, 'archivos_json', categoria);

  app.get(`/archivos_json/${categoria}/:numeroArchivo`, (req, res) => {
    const numeroArchivo = req.params.numeroArchivo;

    // Comprobamos si el archivo existe antes de enviarlo
    const rutaCompleta = path.join(archivosJsonPath, `${numeroArchivo}.json`);

    fs.access(rutaCompleta, fs.constants.F_OK, (err) => {
      if (err) {
        // El archivo no existe, devolver un error o respuesta apropiada
        res.status(404).send('Archivo no encontrado');
      } else {
        // El archivo existe, enviarlo como respuesta
        res.sendFile(rutaCompleta);
      }
    });
  });
}

// Crear rutas dinámicas para cada categoría
crearRutasCategoria('cart');
crearRutasCategoria('cats');
crearRutasCategoria('cats_products');
crearRutasCategoria('products');
crearRutasCategoria('products_comments');
crearRutasCategoria('sell');
crearRutasCategoria('user_cart');

app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});

