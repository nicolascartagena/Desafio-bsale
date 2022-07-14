document.addEventListener('DOMContentLoaded', function() {
    // Funcion para cargar las categorias url: /api/category
    cargarCartegorias();

    // Función para cargar los productos url: /api/product
    paginaSinFiltro();

    document.getElementById('btnBuscar').addEventListener("click", buscadorProducto);
});

// funcion para obtener las categorias mediante un request al backend
const cargarCartegorias = async () => {
    await fetch('http://localhost:3000/api/category')
        .then(response => response.json())
        .then(data =>{
            let categoria = '';
            for(let item of data.results) {
                categoria += `
                <li class="nav-item">
                    <a onClick="filtrarProductos(${item.id})" id="filtrar-categorias" class="nav-link" aria-current="page">${item.name}</a>
                </li>
                `;
            }
            document.getElementById('categorias').innerHTML = categoria;
            
        })
        .catch(err => {
            alert("Lo sentimos!!!, Algo sucedio y no se pudo cargar las categorias.");
        });
}

// funcion que realiza un request al backend para obtener los productos por nombre
const buscadorProducto = async (e) => {
    e.preventDefault();
    const product = document.getElementById('buscador').value;
    
    const payload = {
        name: product
    };
    
    await fetch('http://localhost:3000/api/product', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            limpiarPaginacion();
            document.getElementById('productos').innerHTML = mostrarProductos(data);
            mostrarPaginacion(data.results.count, filtro=product);
            validarDatos(data);
        })
        .catch(err => {
            alert("Lo sentimos, ocurrio un error");
        });
}

// funcion que realiza un request al backend para obtener los productos por categoria
const filtrarProductos = async (id) => {
    const payload = {
        category: id
    };

    await fetch('http://localhost:3000/api/product/filter', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            limpiarPaginacion();
            document.getElementById('productos').innerHTML = mostrarProductos(data);
            mostrarPaginacion(data.results.count, '', id);
            validarDatos(data);
        })
        .catch(err => {
            alert("Lo sentimos, ocurrio un error");
        });
}

// funcion que recibe la data de los request y la muestra en la pagina
const mostrarProductos = (data) => {
    let products = '';
    if(data.results.rows) {
        for(let item of data.results.rows) {
            products += `
                <div class="card">
                    <div class="card-body">
                        <img src='${item.url_image}' class="card-img-top" alt="${item.name}"/>
                    </div>
                    <div class="card-footer bg-transparent">
                        <h5 class="card-title">${item.name}</h5>
                        <h6 class="card-subtitle mb-2">
                            $${item.price} ${
                                item.discount > 0 ? `<span class="text-muted">-${item.discount}%</span>` : ''
                            }
                        </h6>
                        <span class="card-text">${item.Category.name}</span>
                        <a href="#" class="card-link"><i class="fa-solid fa-cart-arrow-down"></i></a>
                    </div>
                </div>
            `;
        }
    }
    else {
        for(let item of data.results) {
            products += `
                <div class="card">
                    <div class="card-body">
                        <img src='${item.url_image}' class="card-img-top" alt="${item.name}"/>
                    </div>
                    <div class="card-footer bg-transparent">
                        <h5 class="card-title">${item.name}</h5>
                        <h6 class="card-subtitle mb-2">
                            $${item.price} ${
                                item.discount > 0 ? `<span class="text-muted">-${item.discount}%</span>` : ''
                            }
                        </h6>
                        <span class="card-text">${item.Category.name}</span>
                        <a href="#" class="card-link"><i class="fa-solid fa-cart-arrow-down"></i></a>
                    </div>
                </div>
            `;
        }
    }

    return products;
}

// funcion para mostrar las paginas disponibles
const mostrarPaginacion = (count, filtro='', categoria = '') => {
    const count_pages = Math.floor(count / 12);
    pages = `
    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
        <li class="page-item"><button onClick="seleccionarPagina(0, '${filtro}', '${categoria}')" class="page-link">1</button></li>
    `;
    
    for(let i = 0; i < count_pages; i++) {
        pages += `
        <li class="page-item"><button onClick="seleccionarPagina(${`${(i+1)}`}, '${filtro}', '${categoria}')" class="page-link">${(i+2)}</button></li>
        `;
    }

    pages += `
        </ul>
    </nav>
    `;
    document.getElementById('paginas').innerHTML = pages;
}

// funcion que llama a otra funcion dependiendo de lo que se selecciono
const seleccionarPagina = async (page, condicion, categoria) => {
    if(condicion === '' && categoria === '') {
        paginaSinFiltro(page);
    }
    else if(condicion !== '') {
        paginaConFiltro(page, condicion);
    }
    else if(categoria !== '') {
        paginaCategoria(page, categoria);
    }
}

// funcion que realiza un request al backend para obtener los productos
const paginaSinFiltro = async (page=0) => {
    await fetch(`http://localhost:3000/api/product/?page=${page}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('productos').innerHTML = mostrarProductos(data);
            mostrarPaginacion(data.results.count)
            validarDatos(data);
        })
        .catch(err => {
            alert("Lo sentimos!!! No se pudieron cargar los productos");
        });
}

// funcion que realiza un request al backend para obtener los productos por nombre
const paginaConFiltro = async (page=0, product) => {

    const payload = {
        name: product,
        page
    };

    fetch('http://localhost:3000/api/product', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('productos').innerHTML = mostrarProductos(data);

            mostrarPaginacion(data.results.count, product);
        })
        .catch(err => {
            alert("Lo sentimos!!! No se pudieron cargar los productos");
        });
}

// funcion que realiza un request al backend para obtener los productos por categoria
const paginaCategoria = async (page, id) => {
    const payload = {
        category: id,
        page
    };

    await fetch('http://localhost:3000/api/product/filter', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            limpiarPaginacion();
            document.getElementById('productos').innerHTML = mostrarProductos(data);
            mostrarPaginacion(data.results.count, '', id);
        })
        .catch(err => {
            alert("Lo sentimos, ocurrio un error");
        });
}

const limpiarPaginacion = () => {
    document.getElementById('paginas').innerHTML = '';
}

const validarDatos = (data) => {
    if (data.results.rows.length === 0) {
        document.getElementById('productos').innerHTML = `<p>Lo sentimos, en este minuto no hay productos para mostrar</p>`;
        document.getElementById('paginas').innerHTML = '';
    }
}