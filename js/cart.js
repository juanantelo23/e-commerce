document.addEventListener('DOMContentLoaded', function() {
    const compras = localStorage.getItem("listaCompra");
    const listaCompra = JSON.parse(compras);
    const cartContainer = document.getElementById('cartContainer');

    // Verificar si el contenedor del carrito existe
    if (!cartContainer) {
        console.error('No se encontró el contenedor del carrito.');
        return;
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
            </div>
            <hr class="divider">
        `;

        // Agregar el contenido HTML al final del contenedor
        cartContainer.insertAdjacentHTML('beforeend', htmlContentToAppend);

        // Obtener el elemento de cantidad y subtotal
        const cantidadInput = document.getElementById(`cantidad-${item.id}`);
        const subtotalDiv = document.getElementById(`subtotal-${item.id}`);

        // Verificar si los elementos se han encontrado correctamente
        if (cantidadInput && subtotalDiv) {
            // Agregar un evento 'input' al elemento de cantidad
            cantidadInput.addEventListener("input", function() {
                const cantidad = parseInt(cantidadInput.value, 10) || 0; // Obtener la cantidad como un número entero
                const precio = item.cost;
                const subtotal = cantidad * precio; // Calcular el subtotal

                // Mostrar el subtotal con el formato correcto
                subtotalDiv.textContent = `${item.currency} ${subtotal}`;
            });
        } else {
            console.error('No se encontraron los elementos de cantidad y subtotal.');
        }
    }
});
