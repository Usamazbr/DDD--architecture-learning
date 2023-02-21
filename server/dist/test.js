// import uuid from 'uuid'
// Entities
class Product {
    id;
    name;
    price;
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
// Use casese
class CreateProduct {
    productRepository;
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute(data) {
        // const product = new Product(uuid.v4(), data.name, data.price);
        // await this.productRepository.save(product);
    }
}
export {};
// // Adapters
// @injectable()
// class ProductController {
//   constructor(private createProduct: CreateProduct) {}
//   async create(req: Request, res: Response) {
//     const data = req.body as ProductData;
//     await this.createProduct.execute(data);
//     res.sendStatus(201);
//   }
// }
// // Factory
// class ProductFactory {
//   create(data: ProductData): Product {
//     return new Product(uuid.v4(), data.name, data.price);
//   }
// }
// // Dependency injection
// const container = new Container();
// container.bind<ProductController>(Product
