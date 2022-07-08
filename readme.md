# Desafío bsale
Desarrollo del desafío planteado por bsale. Para el frontend no se utilizo algún framework para el desarrollo, lo que se utilizó en el desarrollo fue:
-   HTML5
-   CSS
-   Javascript
-   Bootstrap
-   Fontawesome

Para el desarrollo del backend del proyecto, se utilizo el framework NodeJS, el cual utiliza el lenguaje de programación JavaScript, junto con lo anterior se utilizaron las siguientes librerias:
-   Sequelize
-   Mysql2
-   Express
-   Dotenv
-   Cors

## Desarrollo
### Frontend
Para el frontend se utilizaron librerias externas para ayudar al diseño de la aplicación, pero en sí, se utilizo vanilla JS para darle funcionalidad a la página. Para consumir los datos de la api, se utilizó la función fetch.
En el header de la aplicación tenemos:
-   Logo
-   Menú
-   Buscador

El logo de la aplicación recarga la aplicación.
El menú, desplega las categorias de los productos que se encuentran en la base de datos, al hacer click en uno de estos, muestras los productos que pertenecen a esa categoria.
El buscador carga en el main de la aplicación los productos que tengan la coincidencia entre el nombre y lo que el usuario esta escribiendo.

En el main de la aplicacion se presentan los productos, se presentan como tarjetas, la información que muestra esta tarjeta es:
-   Nombre del producto.
-   Precio del producto.
-   El descuento en caso de poseerlo.
-   Categoria.
-   Imagen de carrito (decorativa).

Por último, en el footer de la aplicación tenemos unos links de interes y el desarrollador del desafío.

### Backend
El backend se trabajo con NodeJS, además de las librerias:
-   Sequelize
-   Mysql2
-   Express
-   Dotenv
-   Cors

Mysql2 es un driver de mysql.
Sequelize es un ORM para trabajar con bases de datos relacionales.
Express es un framework de NodeJS. Principalmente es utilizado para desarrollo de aplicaciones web y apis
Dotenv permite cargar el archivo .env, que contiene variables de entorno para la ejecución de la aplicación.
Cors es una libreria que permite el manejo del Cross-Origin Resource Sharing.

el scaffolding de la aplicación es:
-   config: contiene el archivo para la conexión a la base de datos.
-   controllers: se encuentran los controladores de la aplicación, estos son consumidos por las rutas.
-   models: contiene los modelos de las tablas en la base de datos, esto fueron definidos DataTypes, perteneciente a Sequelize para facilitar las consultas.
-   routes: contiene los archivos para el manejo de las rutas y consume las funciones en los controladores, aparte el archivo index.js, es un loader de las rutas, por lo que al agregar un nuevo archivo dentro de routes, se genera automaticamente una ruta url.
-   utils: este folder, contiene el archivo con la función para el manejo de errores.
-   app.js: es el core de la aplicación, aquí se utilizan algunos middlewares, se cargan las rutas y el archivo .env, tambien se utiliza la función para conectarse a la base de datos.
-   package.json: archivo con la metadata relevante del proyecto.

#### Rutas y servicios
Dentro del folder routes, tenemos los archivos product y category. Para comenzar, desglozaremos las rutas en product.

##### GET listado de productos
`GET /api/product` retornara los 12 primeros productos
Parámetro
-   page, indica a la aplicación que página de productos enviar.

Ejemplo
`/api/product/?page=3`

Respuesta
```
{
  "results": {
    "count": 57,
    "rows": [
      {
        "id": 48,
        "name": "SPRITE 1 1/2 Lts",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/sprite-lata-33cl5575.jpg",
        "price": 1500,
        "discount": 0,
        "category": 4,
        "Category": {
          "id": 4,
          "name": "bebida"
        }
      },
      ...,
      {
        "id": 79,
        "name": "ENERGETICA MONSTER VERDE",
        "url_image": "",
        "price": 1990,
        "discount": 0,
        "category": 1,
        "Category": {
          "id": 1,
          "name": "bebida energetica"
        }
      }
    ]
  }
}
```

##### POST buscar producto
`POST /api/product`
Se debe enviar un JSON con el nombre del producto:
```
{
    "name": "ENERGETICA"
}
```

Respuesta
```
{
  "results": [
    {
      "id": 5,
      "name": "ENERGETICA MR BIG",
      "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg",
      "price": 1490,
      "discount": 20,
      "category": 1,
      "Category": {
        "id": 1,
        "name": "bebida energetica"
      }
    },
    ...,
    {
      "id": 79,
      "name": "ENERGETICA MONSTER VERDE",
      "url_image": "",
      "price": 1990,
      "discount": 0,
      "category": 1,
      "Category": {
        "id": 1,
        "name": "bebida energetica"
      }
    }
  ]
}
```

##### POST filtrar un producto
`POST /api/product/filter`
Se debe enviar un JSON con la categoria del producto:
```
{
    "category": "2"
}
```

Respuesta
```
{
  "results": [
    {
      "id": 8,
      "name": "PISCO ALTO DEL CARMEN 35º",
      "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/alto8532.jpg",
      "price": 7990,
      "discount": 10,
      "category": 2,
      "Category": {
        "id": 2,
        "name": "pisco"
      }
    },
    ...,
    {
      "id": 92,
      "name": "PISCO MISTRAL NOBEL 46",
      "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/nobelanejado9639.jpg",
      "price": 15990,
      "discount": 15,
      "category": 2,
      "Category": {
        "id": 2,
        "name": "pisco"
      }
    }
  ]
}
```

Para continuar, revisaremos la ruta category.

##### GET listado de categorias
`GET /api/category` retornara las categorias en la base de datos, no requiere parámetros adicionales.

Respuesta
```
{
  "results": [
    {
      "id": 1,
      "name": "bebida energetica"
    },
    {
      "id": 2,
      "name": "pisco"
    },
    {
      "id": 3,
      "name": "ron"
    },
    {
      "id": 4,
      "name": "bebida"
    },
    {
      "id": 5,
      "name": "snack"
    },
    {
      "id": 6,
      "name": "cerveza"
    },
    {
      "id": 7,
      "name": "vodka"
    }
  ]
}
```

### Deploy
Para realizar el deploy de la aplicación, se utilizó Heroku en el backend, el link es:
-   https://desafio-bsale-backend-nicolasc.herokuapp.com/
como observacion, si clickea ese link, mostrara un error, esto es debido a que los links habilitados son /api/product o /api/category

Para el frontend se utilizó netlify, el link es:
-   https://jade-kitsune-ced752.netlify.app/