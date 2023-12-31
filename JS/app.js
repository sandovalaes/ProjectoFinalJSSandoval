let productos = [];
let planes = [];
let carrito = {};
let existeError = false;

const items = document.getElementById('items');
const footer = document.getElementById('footer');
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;
const fragment = document.createDocumentFragment();

document.addEventListener('DOMContentLoaded', e => { 
                            obtenerProductos();
                            obtenerPlanes();
    
                            if (localStorage.getItem("micarrito")){
                                carrito = JSON.parse(localStorage.getItem("micarrito"));
                                dibujarCarrito();
                            }
                        });

items.addEventListener('click', e => { btnAumentarDisminuir(e) });

const agregarACarrito =  e => {
    debugger;
    rellenarItemCarrito(e.target.parentElement);
}

const rellenarItemCarrito = objecto => {
    const itemProducto = {
        id: objecto.querySelector(".agregarProducto").dataset.id,
        nombre: objecto.querySelector("h3").textContent,
        precio: objecto.querySelector(".precio").textContent,
        cantidad: 1
    }
    debugger;
    if (carrito.hasOwnProperty(itemProducto.id)){
        const itemProdCarrito = carrito[itemProducto.id];
        itemProducto.cantidad = ++itemProdCarrito.cantidad;
    }

    carrito[itemProducto.id] = {...itemProducto};
    dibujarCarrito();
}

const dibujarCarrito = () => {
    items.innerHTML = ''

    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('span').textContent = producto.precio * producto.cantidad
        
        //botones
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment);

    dibujarFooter();
    localStorage.setItem("micarrito",JSON.stringify(carrito));
}

const dibujarFooter = () => {
    footer.innerHTML = ''
    
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
        `
        Toastify(
            {
                text:'Carrito Vacio',
                duraction: 3000,
                close: true,
                gravity: 'top',
                position: 'right',
                stopOnFocus: true,
                offset: {
                    x: 0,
                    y: 64 
                },
                style: {
                    background: "linear-gradient(to left, #d49435, #EC7063)",
                }
            }
        ).showToast();
        return
    }
    
    // sumar cantidad y sumar totales
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0);
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0);

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad;
    templateFooter.querySelector('span').textContent = nPrecio;

    const clone = templateFooter.cloneNode(true);
    fragment.appendChild(clone);

    footer.appendChild(fragment);

    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        carrito = {};
        dibujarCarrito();
    })

    
//Configuración del formulario modal para generar el checkout

const btnLanzarModal = document.querySelector("#finalizar-compra");
const btnOcultarModal = document.querySelector("#ocultar-modal");

const contModal = document.querySelector('.wrapper');

btnLanzarModal.addEventListener('click', (e) => {
    e.preventDefault();
    contModal.classList.add('mostrar');
    
    const total = document.querySelector("#importe-a-pagar");
    total.innerHTML = `Usted debe abonar: $${nPrecio}`;
    
    const confirmar = document.querySelector("#confirmar-compra");
    confirmar.addEventListener('click',(e)=>{
        e.preventDefault();
        Swal.fire({
            title: "¿Desea confirmar la operación?",
            showCancelButton: true,
            confirmButtonText: "Save",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {    
            Swal.fire("Operación Confirmada", "", "success");
            
            contModal.classList.remove('mostrar');
            carrito = {};
            dibujarCarrito();

            } else if (result.isDenied) {
            Swal.fire("Operacion Cancelada", "", "info");
            }
        });
    });
});

btnOcultarModal.addEventListener('click', (e) => {
    e.preventDefault();
    contModal.classList.remove('mostrar');
});
}

const btnAumentarDisminuir = e => {

    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id];
        producto.cantidad++;
        carrito[e.target.dataset.id] = { ...producto };
        dibujarCarrito();
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--;
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id];
        } else {
            carrito[e.target.dataset.id] = {...producto};
        }
        dibujarCarrito();
    }
    e.stopPropagation()
}

async function dibujarTarjetas(pproductos)
{
    const contenedor = document.querySelector(".flex-contenedor-tarjetas");
    pproductos.forEach(element => {
        const item = document.createElement("div");
        item.innerHTML = `
        <h3>${element.nombre}</h3>
        <p>${element.descripcion} </p>
        <p >$ <span class="precio"> ${element.precio}</span> </p>
        <button class="agregarProducto" id="${element.nombre}" data-id="${element.id}"  >Agregar</button>
        `
        item.classList.add("flex-tarjeta");
        contenedor.append(item)
    });
}

async function obtenerProductos()
{
    const response =  await fetch("https://raw.githubusercontent.com/sandovalaes/ProjectoFinalJSSandoval/main/productos.json");
    if (response.ok){
        productos = await response.json();
        await dibujarTarjetas(productos);
        console.log(productos);
        const botonesAgregar = document.querySelectorAll(".agregarProducto");
        inicilizarEventoClickBotonAddCarrito(botonesAgregar);

    }
}

async function obtenerPlanes()
{
    const response =  await fetch("../planes.json");
    if (response.ok){
        planes = await response.json();
    }
}

function inicilizarEventoClickBotonAddCarrito(botonesAgregar){
    for (var i=0; i<botonesAgregar.length; i++) {
            
        botonesAgregar[i].addEventListener('click', e =>{
            agregarACarrito(e);
            Toastify(
                    {
                        text:'Item Agregado al Carrito',
                        duraction: 3000,
                        close: true,
                        gravity: 'top',
                        position: 'right',
                        stopOnFocus: true,
                        offset: {
                            x: 0,
                            y: 64 
                        },
                        style: {
                            background: "linear-gradient(to left, #2a4151f4, #2a4151f4)",
                        }
                    }
            ).showToast();
        })
    }
}

