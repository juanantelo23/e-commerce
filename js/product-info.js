document.addEventListener('DOMContentLoaded', function () {
  // Obtener el ID del producto almacenado en localStorage o desde la URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id') || localStorage.getItem('productID');

  // Construir la URL para obtener los detalles del producto
  const url = `https://japceibal.github.io/emercado-api/products/${productId}.json`;

  // Obtener los elementos donde se mostrarán los detalles del producto
  const productInfoContainer = document.getElementById('product-info-container');
  const productInfoContainer2 = document.getElementById('product-info-container2');
      // Realizar una solicitud GET al JSON del producto
      fetch(url)
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          const selectedProduct = data;
          if (selectedProduct) {
              // Llenar el contenedor con los detalles del producto
              productInfoContainer.innerHTML = `
              
              <div class="container product-info">
                <h2 class="p-info" id="product-name">${selectedProduct.name}</h2>
                <p>Precio <span id="product-price">${selectedProduct.currency} ${selectedProduct.cost}</span></p>
                <p>Descripción <span id="product-description">${selectedProduct.description}</span></p>
                <p>Categoría <span id="product-category">${data.category}</span></p>
                <p>Cantidad de vendidos <span id="product-soldCount">${selectedProduct.soldCount}</span></p>
                <p>Imágenes ilustrativas</p>
                <div>${selectedProduct.images.map(image => `<img src="${image}" alt="Product Image" class="product-images-individual">`).join('')}</div>
              </div>
            `;                
            //---------- PRODUCTOS RELACIONADOS ---------//
              // Si hay productos relacionados, mostrarlos
              if (selectedProduct.relatedProducts.length > 0) {
                  const relatedProductsContainer = document.createElement('div');
                  relatedProductsContainer.classList.add('container', 'product-info2');
                  relatedProductsContainer.innerHTML = `
                      <br>
                      <h4><u>Productos relacionados:</u></h4>
                      <br>
                      <div class="related-products">
                          <div class="related-images">${selectedProduct.relatedProducts.map(product => `
                              <div class="related-product">
                                  <p>${product.name}</p>
                                  <a href="product-info.html?id=${product.id}" data-product-id="${product.id}">
                                      <img src="${product.image}" alt="Related Product Image" class="related-product-image">
                                  </a>
                              </div>
                          `).join('')}
                          </div>
                      </div>
                      <hr>
                  `;
//Agregamos los relacionados al contenido
                  productInfoContainer2.appendChild(relatedProductsContainer);
              }
          }
      })
      .catch(error => {
          console.error('Error al cargar los detalles del producto:', error);
      });

  // Event listener para cuando se haga clic en las imágenes relacionadas y nos re dirija
  productInfoContainer2.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') {
          // Obtener el ID del producto relacionado desde el atributo 'data-product-id'
          const productId = event.target.getAttribute('data-product-id');
          localStorage.setItem('productID', productId);
      }
  });

})
// -------- COMENTARIOS ------  // 
   // Obtener el contenedor de comentarios
  const commentsContainer = document.getElementById('commentsContainer');
const productID = localStorage.getItem('productID');
  
   // Obtener la URL de comentarios utilizando el ID del producto
const commentsUrl = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`;

   // Realizar una solicitud GET a la URL de comentarios
      fetch(commentsUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo cargar los comentarios');
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
            <div class="comment-stars">${generateStars(comment.score)}</div>
          `;
          commentsContainer.appendChild(commentElement);
        });
      })
      .catch(error => {
        console.error('Error al cargar los comentarios:', error);
      });
// ------ FORMULARIO DE COMENTARIOS -------//
   // Resto del código para el formulario que agrega comentarios
    const commentForm = document.getElementById('commentForm');
    commentForm.addEventListener('submit', function (e) {
     e.preventDefault(); // Evita que el formulario se envíe de inmediato
     // Recopila los valores del formulario
      const name = document.getElementById('name').value;
      const commentText = document.getElementById('comment').value;
     const score = getSelectedStarCount(); // Obtiene la cantidad de estrellas seleccionadas

     // Crea un nuevo comentario y agrega la fecha actual
      const newComment = `
        <div class="comment">
          <h3>${name}:</h3>
          <p>${commentText}</p>
          <p>${new Date().toLocaleString()}</p>
          <div class="comment-stars">${generateStars(score)}</div>
        </div>
      `;
     // Agrega el nuevo comentario al contenedor
      commentsContainer.innerHTML += newComment;
     // Limpia el formulario
      document.getElementById('name').value = '';
      document.getElementById('comment').value = '';
     // Limpia las estrellas seleccionadas
      clearSelectedStars();
    });
   // Estrellas para el formulario
    const stars = document.querySelectorAll('.divStar span');
   // Pinta todas las estrellas anteriores a la seleccionada
    stars.forEach((star, index1) => {
      star.addEventListener('click', () => {
        stars.forEach((star, index2) => {
          index1 >= index2 ? star.classList.add('checked') : star.classList.remove('checked');
        });
      });
    });

   // Función para obtener la cantidad de estrellas seleccionadas
    function getSelectedStarCount() {
      const selectedStars = document.querySelectorAll('.divStar span.checked');
      return selectedStars.length;
    }

   // Función para limpiar las estrellas seleccionadas
    function clearSelectedStars() {
      const selectedStars = document.querySelectorAll('.divStar span.checked');
      selectedStars.forEach(star => star.classList.remove('checked'));
    }

   // Función para generar las estrellas en los comentarios
    function generateStars(score) {
      let starsHtml = '';
      for (let i = 0; i < 5; i++) {
        if (i < score) {
          starsHtml += '<span class="fa fa-star checked"></span>';
        } else {
          starsHtml += '<span class="fa fa-star"></span>';
        }
      }
      return starsHtml;
  }  
