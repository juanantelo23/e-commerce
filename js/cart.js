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
        // Obtener el precio del producto y calcular el subtotal
        const precio = item.cost;
        return cantidad * precio;
    }
// Variables globales para mantener el subtotal general, costo de envío y total
    let subtotalGeneral = 0;
    let costoEnvio = 0;
    let total = 0;

// Eventos de cambio en las opciones de envío para actualizar el costo de envío y el costo final
    premium.addEventListener('change', actualizarCostoEnvio);
    express.addEventListener('change', actualizarCostoEnvio);
    standard.addEventListener('change', actualizarCostoEnvio);
// Función para actualizar el costo de envío y el costo final en función de la opción seleccionada
    function actualizarCostoEnvio() {
        // Calcular el costo de envío y actualizar su visualización en la página
        costoEnvio = calcularCostoEnvio();
        costoEnvioDiv.textContent = `${listaCompra[0].currency} ${costoEnvio}`;
// Llamar a la función para actualizar el costo final en tiempo real
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

    // Función para actualizar el costo final en tiempo real
    function actualizarCostoFinal() {
        // Calcular el subtotal general sumando los subtotales individuales de cada producto en el carrito
    subtotalGeneral = listaCompra.reduce((total, product) => {
        // Obtener la cantidad de cada producto desde el elemento de cantidad en la página
        const productCantidad = parseInt(document.getElementById(`cantidad-${product.id}`).value, 10) || 0;
        // Sumar el subtotal del producto al total acumulado
        return total + calcularSubtotal(product, productCantidad);
    }, 0);
 // Calcular el costo total sumando el costo de envío al subtotal general
    total = totalaPagar(costoEnvio, subtotalGeneral);
// Actualizar la visualización del costo total en la página
    totalDiv.textContent = `${listaCompra[0].currency} ${total}`;
}

//Bucle que imprime la informacion de producto
    for (let i = 0; i < listaCompra.length; i++) {
        let item = listaCompra[i];
        // Crear el contenido HTML para mostrar la información del producto en el carrito
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
// Agregar el contenido HTML al contenedor del carrito
        cartContainer.insertAdjacentHTML('beforeend', htmlContentToAppend);

        const cantidadInput = document.getElementById(`cantidad-${item.id}`);
        const subtotalDiv = document.getElementById(`subtotal-${item.id}`);
// Obtener referencias a los elementos de cantidad y subtotal del producto
        if (cantidadInput && subtotalDiv) {
            cantidadInput.addEventListener("input", function () {
                // Obtener la cantidad ingresada por el usuario
                const cantidad = parseInt(cantidadInput.value, 10) || 0;
                // Calcular y actualizar el subtotal del producto
                const subtotal = calcularSubtotal(item, cantidad);
                subtotalDiv.textContent = `${item.currency} ${subtotal}`;
                // Calcular y actualizar el subtotal general del carrito
                subtotalGeneral = listaCompra.reduce((total, product) => {
                    const productCantidad = parseInt(document.getElementById(`cantidad-${product.id}`).value, 10) || 0;
                    return total + calcularSubtotal(product, productCantidad);
                }, 0);
// Actualizar el costo total del carrito, incluyendo el costo de envío
                total = actualizarCostoEnvio();
// Actualizar la visualización del subtotal general en la página
                subtotalGeneralDiv.textContent = `${item.currency} ${subtotalGeneral}`;

            });
        } else {
            // Mostrar un mensaje de error si no se encuentran los elementos de cantidad y subtotal
            console.error('No se encontraron los elementos de cantidad y subtotal.');
        };


//CALCULAR EL SUBTOTAL 
        subtotalGeneral += calcularSubtotal(item, 1); // Suponiendo que la cantidad inicial es 1
        costoEnvio = calcularCostoEnvio();
        costoEnvioDiv.textContent = `${listaCompra[0].currency} ${costoEnvio}`;
        total = totalaPagar(costoEnvio, subtotalGeneral);
        totalDiv.innerHTML = `${listaCompra[0].currency} ${total}`;
    };


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


            // Recalcular el subtotal general y el costo de envío
            subtotalGeneral = listaCompra.reduce((total, product) => {
            const productCantidad = parseInt(document.getElementById(`cantidad-${product.id}`).value, 10) || 0;
            return total + calcularSubtotal(product, productCantidad);
            }, 0);
        subtotalGeneralDiv.textContent = `${listaCompra[0].currency} ${subtotalGeneral}`;
        costoEnvio = calcularCostoEnvio();
        costoEnvioDiv.textContent = `${listaCompra[0].currency} ${costoEnvio}`;
        // Actualizar el total
        actualizarCostoFinal();
    });
    });


 // Sección final del código que realiza acciones después de configurar el carrito y los eventos
// Actualizar la visualización del subtotal general en la página
    subtotalGeneralDiv.innerHTML = `${listaCompra[0].currency} ${subtotalGeneral}`;
// Verificar la existencia de elementos clave antes de continuar
    if (!formaDePagoTarjeta || !formaDePagoTransferencia) {
        console.error('No se encontraron los elementos necesarios.');
        return;
    }
// Configurar eventos de clic para cambiar entre las formas de pago (tarjeta o transferencia)
    formaDePagoTarjeta.addEventListener('click', function () {
        deshabilitarInputs([inputTransferencia]);
        habilitarInputs(inputsTarjeta);
    });

    formaDePagoTransferencia.addEventListener('click', function () {
        deshabilitarInputs(inputsTarjeta);
        habilitarInputs([inputTransferencia]);
    });
// Obtener referencia al formulario y verificar su existencia
    const form = document.querySelector('.needs-validation');
    if (!form) {
        console.error('No se encontró el formulario.');
        return;
    };
// Agregar un evento de envío al formulario para realizar validaciones adicionales
    form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
  // Validar la selección de una forma de pago
        if (!formaDePagoTarjeta.checked && !formaDePagoTransferencia.checked) {
            event.preventDefault();
            terminos1.style.display = 'block'; // Mostrar mensaje de error sobre términos
        } else {
            terminos1.style.display = 'none'; // Ocultar mensaje de error sobre términos si hay una forma de pago seleccionada
        }
 // Agregar la clase 'was-validated' para resaltar campos inválidos según las reglas de validación
        form.classList.add('was-validated');
    });
});


// Modal para seleccionar la Forma de Pago 
const exampleModal = document.getElementById('exampleModal')
if (exampleModal) {
    exampleModal.addEventListener('show.bs.modal', event => {
        // Botón para abrir el modal
        const button = event.relatedTarget
        const recipient = button.getAttribute('data-bs-whatever')
        // Cargar el contenido del modal
        const modalTitle = exampleModal.querySelector('.modal-title')
        const modalBodyInput = exampleModal.querySelector('.modal-body input')
        modalTitle.textContent = `Forma de pago`
        modalBodyInput.value = recipient
    })
};

//Funcionalidad para cuando el usuario elije la forma de pago 
// Obtener referencias a elementos relevantes para la funcionalidad de elección de forma de pago
const formaDePagoTarjeta = document.getElementById('inputPagoTarjeta');
const formaDePagoTransferencia = document.getElementById('inputPagoTransferencia');
const inputsTarjeta = document.querySelectorAll('.deshabilitarInput');
const inputTransferencia = document.getElementById('inputTransferencia');
const guardarMetodoDePago = document.getElementById('guardarMetodoDePago');

// Agregar un evento de clic al botón de guardar método de pago
guardarMetodoDePago.addEventListener('click', function () {
    // Obtener todas las entradas de pago
    const inputPagos = document.querySelectorAll('.inputPago');
    // Inicializar la variable de validación
    let valid = true;
    // Verificar si hay algún campo de entrada de pago vacío
    const inputsvalue = inputPagos.forEach(inputPago => {
        if (!inputPago.value.trim()) {
            valid = false;
        }
    });

    // Obtener referencias a elementos adicionales relacionados con la visualización de la forma de pago seleccionada
    const seleccionMetodoDePago = document.getElementById('seleccionMetodoDePago');
    const InputsDePago = document.querySelector('.InputPagoCheck');
    const InputDePagoTrans = document.getElementById("inputTransferencia")

// Mostrar mensaje de forma de pago seleccionada basado en la elección del usuario
    if (formaDePagoTarjeta.checked && InputsDePago.value !== ""){
        seleccionMetodoDePago.textContent = 'Pago con tarjeta de crédito';
        seleccionMetodoDePago.style.display = 'block';
    } else if (formaDePagoTransferencia.checked && InputDePagoTrans.value !== "") {
        seleccionMetodoDePago.textContent = 'Pago con transferencia';
        seleccionMetodoDePago.style.display = 'block';
    } else {
        seleccionMetodoDePago.textContent = 'Por favor, elija un método de pago';
        seleccionMetodoDePago.style.display = 'block';
    }
});

// Funcion para deshabilitar campos del modal de forma de pago
function deshabilitarInputs(inputs) {
    // Iterar sobre cada elemento de entrada y deshabilitarlo, también establecer su valor a una cadena vacía
    inputs.forEach(input => {
        input.disabled = true; // Deshabilitar el campo de entrada
        input.value = "";
    });
}

function habilitarInputs(inputs) {
    // Iterar sobre cada elemento de entrada y habilitarlo
    inputs.forEach(input => {
        input.disabled = false; // Habilitar el campo de entrada
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
// Obtener referencias a todos los formularios con la clase 'needs-validation'
    var form = document.querySelectorAll('.needs-validation');
    // Iterar sobre cada formulario
    Array.prototype.slice.call(form)
        .forEach(function (form) {
            // Agregar un evento de envío al formulario
            form.addEventListener('submit', function (event) {
                // Verificar la validez del formulario según las reglas de validación de HTML5
                if (!form.checkValidity()) {
                    // Evitar el envío del formulario si no pasa la validación
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    // Mostrar una alerta de éxito si el formulario es válido
                    showAlert('Compra finalizada con éxito', 'success');
                    // Evitar el envío del formulario
                    event.preventDefault();
                }
                // Agregar la clase 'was-validated' para resaltar campos inválidos según las reglas de validación
                form.classList.add('was-validated');
            }, false);
        });

    //CARTEL DE ALERTA DE FINALIZACION DE PAGO
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.classList.add('alert', `alert-${type}`);
        alertDiv.textContent = message;
        document.body.appendChild(alertDiv); // Agrega el cartel de alerta al cuerpo del documento
        // Ocultar la alerta después de 3 segundos (3000 milisegundos)
        setTimeout(function () {
            alertDiv.style.display = 'none';
            window.location.href = "cart.html"; // Redirecciona a la pagina de principal del carrito
            localStorage.removeItem('listaCompra');
        }, 2000); // 2000 milisegundos = 2 segundos
    };
})();



