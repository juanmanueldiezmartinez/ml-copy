const productosContainer = document.getElementById('productos-container');
function abrirModalProducto({ id, imagen, nombre, descripcion, precio }){
    productosContainer.className = "contenedorProducto";

    const modal = `<div data-id="${id}" class="col-producto col-card col mb-0 pt-4">
                        <a class="card-link" href="#">
                            <div class="card h-100">
                            <img src="images/${imagen}" class="card-img-top" alt="Producto 1" />

                            <div class="card-body">
                                <h5 class="card-title">${nombre}</h5>
                                <p class="card-text">
                                ${descripcion}
                                </p>
                            </div>
                            <div class="card-footer">
                                <small class="text-muted">$ ${precio}</small>
                            </div>
                            <div class="card-footer">
                                <small class="text-muted">Unidades disponibles: ${Math.floor((Math.random() * 500) + 1)}</small>
                            </div>
                            <button type="button" class="btn btn-primary">Comprar</button>
                            </div>
                        </a>
                    </div>`
        productosContainer.innerHTML = modal;
    
}
function agregarTarjeta({ id, imagen, nombre, descripcion, precio }) {
  //const { imagen, nombre, precio } = producto;

  const card = `<div data-id="${id}" class="col-card col mb-4 mt-4">
                      <a class="card-link" href="#">
                          <div class="card h-100">
                          <img src="images/${imagen}" class="card-img-top" alt="Producto 1" />
  
                          <div class="card-body">
                              <h5 class="card-title">${nombre}</h5>
                              <p class="card-text">
                              ${descripcion}
                              </p>
                          </div>
                          <div class="card-footer">
                              <small class="text-muted">$ ${precio}</small>
                          </div>
                          </div>
                      </a>
                  </div>`;

  productosContainer.innerHTML += card;

  $('.col-card').click(function (event) {
    event.preventDefault();
    const id = $(this).attr('data-id');

    // console.log('Click producto ' + id);
    limpiarContenedor();
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id == id) {
            abrirModalProducto(productos[i]);
            $('#comentarios').css('display','flex');

            cargarLista();
        }
    }
    // abrirModalProducto();
  });
}
function cargarTarjetas(){
    productos.forEach(agregarTarjeta);
}
cargarTarjetas();

function limpiarContenedor(){
    productosContainer.innerHTML = "";
}

function buscarPorNombre(textoBuscado){
    limpiarContenedor();
    for (const producto of productos) {
        const nombreMinuscula = producto.nombre.toLowerCase(); //Esto me guarda el nombre en minuscula de cada producto
        const nombreBuscadoEnMinuscula = textoBuscado.toLowerCase();
        //el indexof te da -1 si no encontró
        // y si encontro te da el numero de posicion donde encontro la letra/palabra
        if (nombreMinuscula.indexOf(nombreBuscadoEnMinuscula) >= 0) {
            agregarTarjeta(producto);
        }
    }
}
const txtBuscar = document.getElementById("txt-buscar");//input

const botonBuscar = document.getElementById("btn-buscar");//Boton


botonBuscar.addEventListener("click", (event)=>{
    const textoBuscado = txtBuscar.value;
    event.preventDefault();
    buscarPorNombre(textoBuscado);
})

function cargarCategorias({id, nombre}){
    const divCategorias = document.getElementById("contenedor-categorias");

    const categorias = `<a class="dropdown-item" href="${id}">${nombre}</a>`

    divCategorias.innerHTML += categorias;
}

function mostrarCategorias(){
    categoriasTienda.forEach(cargarCategorias);
};

mostrarCategorias();


const cargarLista = async () =>{
    const url = 'https://jsonplaceholder.typicode.com/posts';
    
    const response = await fetch(url);
    const json = await response.json();
    
    json.forEach(crearLista);
}
// cargarLista();

function crearLista({userId, title, body}){    
        let numeroEstrellas = Math.floor((Math.random() * 5) + 1);
        
    function mostrarEstrellas(){
        let divEstrellas = `<div class="ui-pdp-reviews__comments__review-comment__rating">
                                <svg class="ui-pdp-reviews__comments__review-comment__rating__star" width="16.8" height="16" viewBox="0 0 10 10">
                                    <path fill="#3483FA" fill-rule="evenodd" d="M5.056 8L1.931 9.648l.597-3.49L0 3.684l3.494-.509L5.056 0l1.562 3.176 3.494.51-2.528 2.471.597 3.491z"></path>
                                </svg>
                            </div>`;
        let totalDiv;
            
                if (numeroEstrellas == 1) {
                    totalDiv = divEstrellas;   
                }else if (numeroEstrellas == 2) {
                    totalDiv = divEstrellas + divEstrellas;   
                }else if (numeroEstrellas == 3) {
                    totalDiv = divEstrellas + divEstrellas + divEstrellas;   
                }else if (numeroEstrellas == 4) {
                    totalDiv = divEstrellas + divEstrellas + divEstrellas +divEstrellas;   
                }else if (numeroEstrellas == 5) {
                    totalDiv = divEstrellas + divEstrellas + divEstrellas +divEstrellas + divEstrellas;   
                }
            return totalDiv;
    }
    
    const listaContainer = document.getElementById("lista-container");

    const contenidoLista = `<div data-id="${userId}" class="col-producto col-card col mb-4 pt-4">
                                <a class="card-link" href="#">
                                    <div class="card h-100">
                                    <div class="card-body">
                                        <h5 class="card-title">${title}</h5>
                                        <p class="card-text">
                                        ${body}
                                        </p>
                                    </div>
                                    <div class="card-footer" style="display: flex; flex-direction = row">
                                    ${mostrarEstrellas()}
                                    </div>
                                    <div class="card-footer">
                                        <small class="text-muted">Puntuación: ${numeroEstrellas} estrellas</small>
                                    </div>
                                    </div>
                                </a>
                            </div>`;

     listaContainer.innerHTML += contenidoLista;   
}
   

        