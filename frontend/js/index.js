document.addEventListener('DOMContentLoaded', function() {
    // Funcion para cargar las categorias url: /api/category
    cargarCartegorias();

    // Función para cargar los productos url: /api/product
    cargarProductos();

    document.getElementById('buscador').addEventListener("input", buscadorProducto);
});

const cargarProductos = async () => {
    await fetch('http://localhost:3000/api/product')
        .then(response => response.json())
        .then(data => {
            
            document.getElementById('productos').innerHTML = mostrarProductos(data);
        })
        .catch(err => {
            console.log(err);
            alert("Lo sentimos!!! No se pudieron cargar los productos");
        });
}

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
            console.log(err);
            alert("Lo sentimos!!!, Algo sucedio y no se pudo cargar las categorias.");
        });
}

const buscadorProducto = async (e) => {

    const payload = {
        name: e.target.value
    };


    await fetch('http://localhost:3000/api/product', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('productos').innerHTML = mostrarProductos(data);
        })
        .catch(err => {
            console.log(err);
        });
}

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
            document.getElementById('productos').innerHTML = mostrarProductos(data);
        })
        .catch(err => {
            console.log(err);
        });
}

const mostrarProductos = (data) => {
    let products = '';
    
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

    return products;
}