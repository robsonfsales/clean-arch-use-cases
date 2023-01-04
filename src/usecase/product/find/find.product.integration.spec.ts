import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Test create product use case", () => {
    let sequileze: Sequelize;

    beforeEach(async() => {
        sequileze = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequileze.addModels([ProductModel]);
        await sequileze.sync();
    });

    afterEach(async() => {
        await sequileze.close();
    });

    it("should find a product", async () => {
        const productRepository = new ProductRepository();

        const product = new Product("123","Product A", 10);
        productRepository.create(product);

        const productFindUseCase = new FindProductUseCase(productRepository);

        const input = {
            id: "123",
        }

        const output = {
            id: "123",
            name: "Product A",
            price: 10, 
        }

        const result = await productFindUseCase.execute(input);
        expect(result).toEqual(output);
    });
});