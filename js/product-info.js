

document.addEventListener('DOMContentLoaded', function () {
    const dato = localStorage.getItem("productID");
    console.log(dato)
  })
  
  
  document.addEventListener("DOMContentLoaded", function () {
    // Obtener el ID del producto almacenado en el almacenamiento local
    const productID = localStorage.getItem("productID");
  
  
    // Construir la URL de la API usando el productID
    const catID = localStorage.getItem("catID");
    const apiUrl = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;
  
  
    // Realizar una solicitud GET a la API
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const dataArray = Object.values(data);
  
  
       
        JSON.stringify(dataArray);
        console.log(dataArray);
        // Verificar si "dataArray" es una matriz
        if (Array.isArray(dataArray)) {
          // Buscar el producto seleccionado por su ID
          const selectedProduct = dataArray.find(product => product.id === productID);
  
  
          if (selectedProduct) {
            // Mostrar los detalles del producto en la página
            const productDetailsContainer = document.getElementById("product-info-container");
            productDetailsContainer.innerHTML = `
                        <h2>${selectedProduct.name}</h2>
                        <p>${selectedProduct.description}</p>
                        <p>Precio: ${selectedProduct.currency} ${selectedProduct.cost}</p>
                        <p>Cantidad de vendidos: ${selectedProduct.soldCount}</p>
                        <p>Categoría: ${selectedProduct.category}</p>
                        <img src="${selectedProduct.image}" alt="${selectedProduct.name}">
                        <!-- Otros detalles del producto aquí -->
                    `;
          } else {
            console.error("Producto no encontrado");
          }
        } else {
          console.error("Los datos de la API no son una matriz");
        }
      })
      .catch(error => {
        console.error("Error al cargar los detalles del producto:", error);
      });
  });
  
  
  
  
  
  