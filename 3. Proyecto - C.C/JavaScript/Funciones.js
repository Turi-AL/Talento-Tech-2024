// Seleccionar todas las imágenes de los productos
const imagenesProductos = document.querySelectorAll('.producto-imagen');

// Agregar el evento de clic a cada imagen de producto
imagenesProductos.forEach(imagen => {
    imagen.addEventListener('click', mostrarDescripcionProducto);
});

// Función para mostrar la descripción del producto al hacer clic en la imagen
function mostrarDescripcionProducto(e) {
    // Obtener la card (producto) relacionada con la imagen
    const card = e.target.closest('.card');
    
    // Obtener los datos del producto (nombre, precio, descripción)
    const nombre = card.getAttribute('data-nombre');
    const descripcion = card.getAttribute('data-descripcion');
    const precio = card.getAttribute('data-precio');
    
    // Mostrar la descripción en un lugar visible (puedes usar un alert o agregarlo al DOM)
    alert(`Producto: ${nombre}\nPrecio: $${precio}\nDescripción: ${descripcion}`);
}

// Variables globales
const carrito = [];

// Selección de elementos del DOM
const carritoTabla = document.querySelector('#carrito tbody');
const carritoTotalSpan = document.querySelector('#carrito-total');
const botonesComprar = document.querySelectorAll('.btn-comprar');

// Función para actualizar el carrito en el DOM
function actualizarCarrito() {
    carritoTabla.innerHTML = ''; // Limpia el carrito
    let totalCarrito = 0;

    carrito.forEach((producto, index) => {
        const totalProducto = producto.precio * producto.cantidad;
        totalCarrito += totalProducto;

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>
                <input type="number" class="cantidad" value="${producto.cantidad}" min="1" data-index="${index}">
            </td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td>$${totalProducto.toFixed(2)}</td>
            <td>
                <button class="btn-eliminar" data-index="${index}">Eliminar</button>
            </td>
        `;
        carritoTabla.appendChild(fila);
    });

    carritoTotalSpan.textContent = totalCarrito.toFixed(2);

    agregarEventosCantidad();
    agregarEventosEliminar();
}

// Función para añadir un producto al carrito
function agregarAlCarrito(nombre, precio) {
    const productoExistente = carrito.find(producto => producto.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    actualizarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Función para actualizar la cantidad de un producto en el carrito
function actualizarCantidad(index, nuevaCantidad) {
    carrito[index].cantidad = nuevaCantidad;
    actualizarCarrito();
}

// Agregar eventos a botones "Agregar al carrito"
botonesComprar.forEach(boton => {
    boton.addEventListener('click', () => {
        const card = boton.closest('.card');
        const nombre = card.dataset.nombre;
        const precio = parseFloat(card.dataset.precio);

        agregarAlCarrito(nombre, precio);
    });
});

// Agregar eventos a los inputs de cantidad
function agregarEventosCantidad() {
    const inputsCantidad = document.querySelectorAll('.cantidad');
    inputsCantidad.forEach(input => {
        input.addEventListener('change', (e) => {
            const index = e.target.dataset.index;
            const nuevaCantidad = parseInt(e.target.value, 10);

            if (nuevaCantidad > 0) {
                actualizarCantidad(index, nuevaCantidad);
            } else {
                eliminarDelCarrito(index);
            }
        });
    });
}

// Agregar eventos a los botones de eliminar
function agregarEventosEliminar() {
    const botonesEliminar = document.querySelectorAll('.btn-eliminar');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            eliminarDelCarrito(index);
        });
    });
}

// Inicialización del carrito
actualizarCarrito();

