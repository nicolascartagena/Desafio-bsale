document.addEventListener('DOMContentLoaded', function() {
    // Funcion para cargar las categorias url: /api/category
    cargarCartegorias();
});

const cargarCartegorias = async () => {
    await fetch('http://localhost:3000/api/category')
        .then(response => response.json())
        .then(data =>{
            console.log(data.results)
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