document.addEventListener('DOMContentLoaded', function () {
    const compras = localStorage.getItem("listaCompra");
    const listaCompra = JSON.parse(compras);
    const cartContainer = document.getElementById('cartContainer');
    const subtotalGeneralDiv = document.getElementById('Subtotal-General');
    const costoEnvioDiv = document.getElementById('Costo-Envio');

    //Tipos de envio
    const totalDiv = document.getElementById('total-compra');
    const premium = document.getElementById('premium');
    const express = document.getElementById('express');
    const standard = document.getElementById('standard');

    const formaDePagoLink = document.getElementById('formaDePagoLink');
    const terminos1 = document.getElementById('terminos1');
    const formaDePagoTarjeta = document.getElementById('inputPagoTarjeta');
    const formaDePagoTransferencia = document.getElementById('inputPagoTransferencia');

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
    let total = 0;

    //Funcion para actualizar el valor en funcion de la seleccion
    premium.addEventListener('change', actualizarCostoEnvio);
    express.addEventListener('change', actualizarCostoEnvio);
    standard.addEventListener('change', actualizarCostoEnvio);

    function actualizarCostoEnvio() {
        costoEnvio = calcularCostoEnvio();
        costoEnvioDiv.textContent = `${listaCompra[0].currency} ${costoEnvio}`;

        actualizarCostoFinal();
    }

    //Funcion para calcular costo de envio
    function calcularCostoEnvio() {
        if (document.getElementById('premium').checked) {
            return Math.round(subtotalGeneral * 0.15);
        } else if (document.getElementById('express').checked) {
            return Math.round(subtotalGeneral * 0.07);
        } else if (document.getElementById('standard').checked) {
            return Math.round(subtotalGeneral * 0.05);
        } else {
            return 0;
        }
    }

    //funcion para calcular total 
    function totalaPagar(envio, producto) {
        return Math.round(producto + envio);
    }

    //Actualizar total en tiempo real 

    function actualizarCostoFinal() {
        total = totalaPagar(costoEnvio, subtotalGeneral);
        totalDiv.textContent = `${listaCompra[0].currency} ${total}`;
    }




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
            <div class="col-md-2">
            <button type="button" class="btn btn-danger eliminar-btn" data-index="${i}">
                <i class="fas fa-trash-alt"></i>
            </button>
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
        costoEnvio = calcularCostoEnvio();
        costoEnvioDiv.textContent = `${listaCompra[0].currency} ${costoEnvio}`;
        total = totalaPagar(costoEnvio, subtotalGeneral);
        totalDiv.innerHTML = `${listaCompra[0].currency} ${total}`;



    }
    //BOTON ELIMINAR
    // Agregar manejadores de eventos para los botones de eliminar
    const botonesEliminar = document.querySelectorAll('.eliminar-btn');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', function () {
            const index = boton.dataset.index;
            // Eliminar el producto del carrito basado en el índice
            listaCompra.splice(index, 1);
            // Eliminar el elemento del DOM que representa el producto
            boton.parentNode.parentNode.remove();
            // Actualizar el carrito en el almacenamiento local
            localStorage.setItem("listaCompra", JSON.stringify(listaCompra));
        });

    });

    //FINALIZA BOTON ELIMINAR

    subtotalGeneralDiv.textContent = `${listaCompra[0].currency} ${subtotalGeneral}`;

    if (!formaDePagoTarjeta || !formaDePagoTransferencia) {
        console.error('No se encontraron los elementos necesarios.');
        return;
    }

    formaDePagoTarjeta.addEventListener('click', function () {
        deshabilitarInputs([inputTransferencia]);
        habilitarInputs(inputsTarjeta);
    });

    formaDePagoTransferencia.addEventListener('click', function () {
        deshabilitarInputs(inputsTarjeta);
        habilitarInputs([inputTransferencia]);
    });

    const form = document.querySelector('.needs-validation');
    if (!form) {
        console.error('No se encontró el formulario.');
        return;
    }

    form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }

        if (!formaDePagoTarjeta.checked && !formaDePagoTransferencia.checked) {
            event.preventDefault();
            terminos1.style.display = 'block';
        } else {
            terminos1.style.display = 'none';
        }

        form.classList.add('was-validated');
    });

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

const formaDePagoTarjeta = document.getElementById('inputPagoTarjeta');
const formaDePagoTransferencia = document.getElementById('inputPagoTransferencia');
const inputsTarjeta = document.querySelectorAll('.deshabilitarInput');
const inputTransferencia = document.getElementById('inputTransferencia');
const guardarMetodoDePago = document.getElementById('guardarMetodoDePago');

guardarMetodoDePago.addEventListener('click', function () {
    const inputPagos = document.querySelectorAll('.inputPago');
    let valid = true;
    const inputsvalue = inputPagos.forEach(inputPago => {
        if (!inputPago.value.trim()) {
            valid = false;
        }
    });


    const seleccionMetodoDePago = document.getElementById('seleccionMetodoDePago');
    if (formaDePagoTarjeta.checked) {
        seleccionMetodoDePago.textContent = 'Pago con tarjeta de crédito';
        seleccionMetodoDePago.style.display = 'block';
    } else if (formaDePagoTransferencia.checked) {
        seleccionMetodoDePago.textContent = 'Pago con transferencia';
        seleccionMetodoDePago.style.display = 'block';
    } else if (inputsvalue) {
        seleccionMetodoDePago.textContent = 'Por favor, elija un método de pago';
        seleccionMetodoDePago.style.display = 'block';
    }
});


function deshabilitarInputs(inputs) {
    inputs.forEach(input => {
        input.disabled = true;
        input.value = "";
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

