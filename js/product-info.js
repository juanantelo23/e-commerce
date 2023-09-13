document.addEventListener('DOMContentLoaded', function () {

  // Obtener el ID del producto almacenado en el almacenamiento local
  const productID = localStorage.getItem("productID");

  // Construir la URL del JSON
  const catID = localStorage.getItem("catID");
  const url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

  // Obtener el elemento donde se mostrarán los detalles del producto
  const productInfoContainer = document.getElementById('product-info-container');

  // Obtener el contenedor de comentarios
  const commentsContainer = document.getElementById('commentsContainer');

  // Realizar una solicitud GET al JSON
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Buscar el producto seleccionado por su ID
      const selectedProduct = data.products.find(product => product.id === parseInt(productID));
      if (selectedProduct) {
        // Llenar el contenedor con los detalles del producto
        productInfoContainer.innerHTML = `
                  <div class="container product-info">
                      <h2 class="p-info" id="product-name">${selectedProduct.name}</h2>
                      <p>Precio <span id="product-price">${selectedProduct.currency} ${selectedProduct.cost}</span></p>
                      <p>Descripción <span id="product-description">${selectedProduct.description}</span></p>
                      <p>Categoría <span id="product-category">${data.catName}</span></p>
                      <p>Cantidad de vendidos <span id="product-soldCount">${selectedProduct.soldCount}</span></p>
                      <p>Imágenes ilustrativas</p>
                      <img src="${selectedProduct.image}" alt="${selectedProduct.name}">
                  </div>
              `;

        
        // Box de comentarios
        // Construir la URL de comentarios utilizando el ID del producto
        const commentsUrl = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`;
        // Realizar una solicitud GET a la URL de comentarios
        fetch(commentsUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error("No se pudo cargar los comentarios");
            }
            return response.json();
          })
          .then(comments => {
            // Limpia el contenedor de comentarios antes de agregar los nuevos comentarios
            commentsContainer.innerHTML = '';

            // Itera a través de los comentarios y agrégalos al contenedor
            comments.forEach(comment => {
              const commentElement = document.createElement('div');
              commentElement.classList.add('comment');
              commentElement.innerHTML = `
                <h3>${comment.user}:</h3>
                <p>${comment.description}</p>
                <p>${comment.dateTime}</p>
                
              `;
              commentsContainer.appendChild(commentElement);
            });
          })
          .catch(error => {
            console.error("Error al cargar los comentarios:", error);
          });
      } else {
        console.error("Producto no encontrado");
      }
    })
    .catch((error) => {
      console.error("Error loading product details:", error);
    });
});

// Resto del código para el formulario que agrega comentarios
const commentForm = document.getElementById('commentForm');
commentForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Evita que el formulario se envíe de inmediato

  // Recopila los valores del formulario
  const name = document.getElementById('name').value;
  const commentText = document.getElementById('comment').value;

  // Crea un nuevo comentario y agrega la fecha aleatoria
  const newComment = `
    <div class="comment">
      <h3>${name}:</h3>
      <p>${commentText}</p>
      <p>${new Date().toLocaleString()}</p>
    </div>
  `;

  // Agrega el nuevo comentario al contenedor
  commentsContainer.innerHTML += newComment;

  // Limpia el formulario
  document.getElementById('name').value = '';
  document.getElementById('comment').value = '';
});
