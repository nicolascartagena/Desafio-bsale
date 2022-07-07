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
            document.getElementById('productos').innerHTML = products;
        })
}

const cargarCartegorias = async () => {
    await fetch('http://localhost:3000/api/category')
        .then(response => response.json())
        .then(data =>{
            let categoria = '';
            for(let item of data.results) {
                categoria += `
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="./index.html/${item.name}">${item.name}</a>
                </li>
                `;
            }
            document.getElementById('categorias').innerHTML = categoria;
            
        })
        .catch(err => console.log(err));
}

const buscadorProducto = async (e) => {
    console.log(e.target.value);
}