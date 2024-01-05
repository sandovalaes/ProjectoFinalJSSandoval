let productos = [];

function dibujarTarjetas(pproductos)
{
    debugger;
    const contenedor = document.querySelector(".flex-contenedor-tarjetas");
    pproductos.forEach(element => {
        const item = document.createElement("div");
        item.innerHTML = `
        <h3>${element.nombre}</h3>
        <p>${element.descripcion} </p>
        <button class="agregarProducto" id="${element.nombre}">Agregar</button>
        `
        item.classList.add("flex-tarjeta");
        contenedor.append(item)
    });
}

async function obtenerproductos()
{
    const response =  await fetch("../productos.json");
    if (response.ok){
        productos = await response.json();
        dibujarTarjetas(productos);
    }
}

obtenerproductos();
