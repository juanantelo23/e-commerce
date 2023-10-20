document.addEventListener('DOMContentLoaded', function () {
    const compras = localStorage.getItem("listaCompra");
    const listaCompra = JSON.parse(compras);
    const cartContainer = document.getElementById('cartContainer');
    const subtotalGeneralDiv = document.getElementById('Subtotal-General');
   
    // Verificar si el contenedor del carrito existe
    if (!cartContainer) {
        console.error('No se encontró el contenedor del carrito.');
        return;
    }

    // Función para calcular el subtotal de un producto
    function calcularSubtotal(item, cantidad) {
        const precio = item.cost;
        return cantidad * precio;
    }

    
    let subtotalGeneral = 0;
    let costoEnvio = 0;
   

    for (let i = 0; i < listaCompra.length; i++) {
        let item = listaCompra[i];
        const htmlContentToAppend = `
        <div class="row product-row">
            <div class="col-md-2">
                <img src="${item.images[1]}" alt="${item.name}" style="width: 100px;">
            </div>
            <div class="col-md-2">
                <div class="sub-title fw-bold">Nombre:</div>
                <div>${item.name}</div>
            </div>
            <div class="col-md-2">
                <div class="sub-title fw-bold">Costo:</div>
                <div>${item.cost} ${item.currency}</div>
            </div>
            <div class="col-md-2">
                <div class="sub-title fw-bold ">Cantidad:</div>
                <div class="col-6"><input type="number" class="form-control" value="1" id="cantidad-${item.id}" min="1" max="99">
                </div>
            </div>
            <div class="col-md-2 fw-bold">
                <div class="sub-title">Sub total:</div>
                <div class="font-weight-bold" id="subtotal-${item.id}"> ${item.currency} ${item.cost} </div>
            </div>
        </div>
        <hr class="divider">
    `;

        cartContainer.insertAdjacentHTML('beforeend', htmlContentToAppend);

        const cantidadInput = document.getElementById(`cantidad-${item.id}`);
        const subtotalDiv = document.getElementById(`subtotal-${item.id}`);
        
        if (cantidadInput && subtotalDiv) {
            cantidadInput.addEventListener("input", function () {
                const cantidad = parseInt(cantidadInput.value, 10) || 0;
                const subtotal = calcularSubtotal(item, cantidad);
                subtotalDiv.textContent = `${item.currency} ${subtotal}`;

                subtotalGeneral = listaCompra.reduce((total, product) => {
                    const productCantidad = parseInt(document.getElementById(`cantidad-${product.id}`).value, 10) || 0;
                    return total + calcularSubtotal(product, productCantidad);
                }, 0);

                subtotalGeneralDiv.textContent = `${item.currency} ${subtotalGeneral}`;

            });
        } else {
            console.error('No se encontraron los elementos de cantidad y subtotal.');
        }

        subtotalGeneral += calcularSubtotal(item, 1); // Suponiendo que la cantidad inicial es 1
        

    }

    subtotalGeneralDiv.textContent = `${listaCompra[0].currency} ${subtotalGeneral}`;
});


    // Forma de Pago
    const exampleModal = document.getElementById('exampleModal')
    if (exampleModal) {
        exampleModal.addEventListener('show.bs.modal', event => {
            // Button that triggered the modal
            const button = event.relatedTarget
            // Extract info from data-bs-* attributes
            const recipient = button.getAttribute('data-bs-whatever')
            // If necessary, you could initiate an Ajax request here
            // and then do the updating in a callback.

            // Update the modal's content.
            const modalTitle = exampleModal.querySelector('.modal-title')
            const modalBodyInput = exampleModal.querySelector('.modal-body input')

            modalTitle.textContent = `Forma de pago`
            modalBodyInput.value = recipient
        })
    }

    // Funcion para habilitar y deshabilitar los inputs segun el metodo de pago
    const formaDePagoTarjeta = document.getElementById('inputPagoTarjeta');
    const formaDePagoTransferencia = document.getElementById('inputPagoTransferencia');
    const inputsTarjeta = document.querySelectorAll('.deshabilitarInput');
    const inputTransferencia = document.getElementById('inputTransferencia');

    function deshabilitarInputs(inputs) {
        inputs.forEach(input => {
            input.disabled = true;
        });
    }

    function habilitarInputs(inputs) {
        inputs.forEach(input => {
            input.disabled = false;
        });
    }

    // Metodo de pago transferencia
    formaDePagoTransferencia.addEventListener('click', event => {
        if (formaDePagoTransferencia.checked) {
            deshabilitarInputs(inputsTarjeta);
            habilitarInputs([inputTransferencia]);
        }
    });

    // Metodo de pago tarjeta
    formaDePagoTarjeta.addEventListener('click', event => {
        if (formaDePagoTarjeta.checked) {
            deshabilitarInputs([inputTransferencia]);
            habilitarInputs(inputsTarjeta);
        }
    });



// Validación de form y cambio estilo 
(function () {
    'use strict'

    var form = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(form)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

/* Alert compra realizada
<div class="alert alert-success" role="alert">
  ¡Has comprado con éxito!
</div>
*/


