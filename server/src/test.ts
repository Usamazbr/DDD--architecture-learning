// import { Container, injectable } from "inversify";
// import { Application, Request, Response } from "express";
// import { v4 as uuid } from "uuid";

// // Entities
// class Product {
//   constructor(public id: string, public name: string, public price: number) {}
// }

// // Value objects
// interface ProductData {
//   name: string;
//   price: number;
// }

// // Ports
// interface ProductRepository {
//   save(product: Product): Promise<void>;
// }

// // Use cases
// class CreateProduct {
//   constructor(private productRepository: ProductRepository) {}

//   async execute(data: ProductData): Promise<void> {
//     const product = new Product(uuid.v4(), data.name, data.price);
//     await this.productRepository.save(product);
//   }
// }

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
// container.bind<ProductController>(ProductController).toSelf();
// container.bind<CreateProduct>(CreateProduct).toSelf();
// container.bind<ProductRepository>(ProductRepository).toConstantValue({
//   async save(product: Product) {
//     // save product to database
//   },
// });
// container.bind<ProductFactory>(ProductFactory).toSelf();

// // Usage
// const productController = container.resolve(ProductController);

// export class Port_t {
//   constructor(private app: Application) {
//     this.app = app;
//   }
//   public postReqest(){
//     this.app.post("/products", productController.create.bind(productController));
//   }
// }
