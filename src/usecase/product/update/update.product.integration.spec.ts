import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";

const product = ProductFactory.create("a", "Product A", 10);

const input = {
    id: product.id,
    name : "Product A1 Updated",
    price: 15,
};

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

    afterEach(async() => {
        await sequelize.close();
    });

    describe("Unit Test update product use case", () => {

        it("Shoud update a product", async () => {
            const productRepository = new ProductRepository();
            productRepository.create(product);

            const productUpdateUseCase = new UpdateProductUseCase(productRepository);
    
            const output = await productUpdateUseCase.execute(input);
    
            expect(output).toEqual(input);
        });
    
        it("should throw an error when update product name is missing", async () => {
            const productRepository = new ProductRepository();
            productRepository.create(product);

            const productUpdateUseCase = new UpdateProductUseCase(productRepository);
            input.name = "";
            input.price = 15;
    
            await expect(productUpdateUseCase.execute(input)).rejects.toThrow("Name is required");
        });
    
        it("should throw an error when update product price is less than 0", async () => {
            const productRepository = new ProductRepository();
            productRepository.create(product);

            const productUpdateUseCase = new UpdateProductUseCase(productRepository);
            input.name = "Product A1 Updated",
            input.price = -1;
    
            await expect(productUpdateUseCase.execute(input)).rejects.toThrow("Price must be greater than 0");
        });
    
    });

});