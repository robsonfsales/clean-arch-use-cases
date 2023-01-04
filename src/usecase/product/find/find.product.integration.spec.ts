import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Test create product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async() => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,            
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterAll(async() => {
        await sequelize.close();
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

    it("should not find a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new FindProductUseCase(productRepository);

        const input = {
            id: "456",
        }

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Product not found");
    });
});