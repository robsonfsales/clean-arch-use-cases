import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

const input = {
    type: "",
    name: "Prduct 1",
    price: 10,
}

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

    it("should create a product type b", async () => {
        const productRepository = new ProductRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        input.type ="b";
        input.name = "Product B1";

        const output = await productCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price * 2,
        });

    });

    it("should throw an error when create product type not supported", async () => {
        const productRepository = new ProductRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        input.type ="c";

        await expect(productCreateUseCase.execute(input)).rejects.toThrow("Product type not supported");
    });

    it("should throw an error when create product name is missing", async () => {
        const productRepository = new ProductRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        input.type ="a";
        input.name = "";
        input.price = 10;

        await expect(productCreateUseCase.execute(input)).rejects.toThrow("Name is required");
    });

    it("should throw an error when create product price is less than 0", async () => {
        const productRepository = new ProductRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        input.type ="a";
        input.name = "Product 1";
        input.price = -1;

        await expect(productCreateUseCase.execute(input)).rejects.toThrow("Price must be greater than 0");
    });

});