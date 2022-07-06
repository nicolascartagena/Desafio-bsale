document.addEventListener('DOMContentLoaded', function() {
    // Funcion para cargar las categorias url: /api/category
    cargarCartegorias();

    // Función para cargar los productos url: /api/product
    cargarProductos();
});

const cargarProductos = async () => {
    await fetch('http://localhost:3000/api/product')
        .then(response => response.json())
        .then(data => {
            let products = '';
            for(let item of data.results) {
                products += `
                <div class="card">
                    <img src='${item.url_image}' class="card-img-top" alt=""/>
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <h6 class="card-subtitle mb-2">$${item.price} <span class="text-muted">${item.discount}</span></h6>
                        <p class="card-text">${item.Category.name}</p>
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
                    <a class="nav-link active" aria-current="page" href="./index.html/${item.name}">${item.name}</a>
                </li>
                `;
            }
            document.getElementById('categorias').innerHTML = categoria;
            
        })
        .catch(err => console.log(err));
}