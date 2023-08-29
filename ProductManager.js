import { promises as fs } from 'fs';

class ProductManager {
    constructor() {
        this.patch = './productos.txt';
        this.products = [];
    }

    static id = 0;

    async addProduct(title, description, price, imagen, code, stock) {
        ProductManager.id++;

        let newProduct = {
            title,
            description,
            price,
            imagen,
            code,
            stock,
            id: ProductManager.id,
        };

        this.products.push(newProduct);

        await fs.writeFile(this.patch, JSON.stringify(this.products, null, '\t'));
        return newProduct;
    }

    async readProducts() {
        let respuesta = await fs.readFile(this.patch, 'utf-8');
        return JSON.parse(respuesta);
    }

    async getProducts() {
        let respuesta2 = await this.readProducts();
        return respuesta2;
    }

    async getProductsById(id) {
        let respuesta3 = await this.readProducts();
        let foundProduct = respuesta3.find((product) => product.id == id);
        if (!foundProduct) {
            return "No se encontró el producto";
        } else {
            return foundProduct;
        }
    }

    async deleteProductById(id) {
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter((product) => product.id != id);
        await fs.writeFile(this.patch, JSON.stringify(productFilter, null, '\t'));
        return "Producto eliminado";
    }

    async updateProducts({ id, ...producto }) {
        await this.deleteProductById(id);
        let productsOld = await this.readProducts();

        let productsModif = [{ id, ...producto }, ...productsOld];
        await fs.writeFile(this.patch, JSON.stringify(productsModif, null, '\t'));
        return "Producto actualizado";
    }
}

const productos = new ProductManager();

(async () => {
    try {
        await productos.addProduct("titulo1", "descripcion1", 100, "imagen1", "abc1", 10);
        await productos.addProduct("titulo2", "descripcion2", 100, "imagen2", "abc2 ", 10);
        await productos.addProduct("titulo3", "descripcion3", 100, "imagen3", "abc3 ", 10);

        const allProducts = await productos.getProducts();
        console.log('Todos los productos:', allProducts);

        const productById = await productos.getProductsById(3);
        console.log('Producto con ID 3:', productById);

        const deleteResult = await productos.deleteProductById(2);
        console.log(deleteResult);

        const updateResult = await productos.updateProducts({
            title: "titulo3",
            description: "descripcion3",
            price: 4500,
            imagen: "imagen3",
            code: "abc1",
            stock: 10,
            id: 3
        });
        console.log(updateResult);
    } catch (error) {
        console.error('Error:', error.message);
    }
})();
