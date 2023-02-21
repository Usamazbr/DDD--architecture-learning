// import uuid from 'uuid'

// Entities
class Product {
    constructor(public id: string, public name: string, public price: number) {}
  }
  
  // Value objects
  interface ProductData {
    name: string;
    price: number;
  }
  
  // Ports
  interface ProductRepository {
    save(product: Product): Promise<void>;
  }
  
  // Use casese
  class CreateProduct {
    constructor(private productRepository: ProductRepository) {}
  
    async execute(data: ProductData): Promise<void> {
      // const product = new Product(uuid.v4(), data.name, data.price);
      // await this.productRepository.save(product);
    }
  }
  
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
  