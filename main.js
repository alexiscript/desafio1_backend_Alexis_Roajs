class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1; // Inicializamos el ID en 1
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        // Validar que todos los campos sean obligatorios
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log('Todos los campos son obligatorios');
            return;
        }

        // Validar que el código no se repita
        if (this.products.some(product => product.code === code)) {
            console.log(`El código ${code} ya existe`);
            return;
        }

        // Crear el nuevo producto
        const newProduct = {
            id: this.nextId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        // Incrementar el ID para el siguiente producto
        this.nextId++;

        // Agregar el producto al arreglo de productos
        this.products.push(newProduct);

        console.log('Producto agregado con éxito');
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            console.log('Not found'); // Mostrar "Not found" si no se encuentra el producto
        } else {
            return product;
        }
    }
}

const productos = new ProductManager();

// Agregar productos de ejemplo
productos.addProduct('Producto 1', 'Descripción 1', 100, 'imagen1.jpg', 'ABC123', 10);
productos.addProduct('Producto 2', 'Descripción 2', 150, 'imagen2.jpg', 'DEF456', 15);
productos.addProduct('Producto 3', 'Descripción 3', 150, 'imagen2.jpg', 'DEF457', 15);


// Obtener todos los productos
const allProducts = productos.getProducts();
console.log(allProducts);

// Obtener un producto por ID (encontrado)
const productFound = productos.getProductById(1);
console.log(productFound);

// Obtener un producto por ID (no encontrado)
productos.getProductById(4);
