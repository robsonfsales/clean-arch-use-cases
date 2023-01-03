import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("a","Product A1", 10);

const input = {
    id: product.id,
    name : "Product A1 Updated",
    price: 15,
};

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit Test update product use case", () => {

    it("Shoud update a product", async () => {
        const productRepository = MockRepository();
        const productUpdateUseCase = new UpdateProductUseCase(productRepository);

        const output = await productUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });

    it("should throw an error when update product name is missing", async () => {
        const productRepository = MockRepository();
        const productUpdateUseCase = new UpdateProductUseCase(productRepository);
        input.name = "";
        input.price = 15;

        await expect(productUpdateUseCase.execute(input)).rejects.toThrow("Name is required");
    });

    it("should throw an error when update product price is less than 0", async () => {
        const productRepository = MockRepository();
        const productUpdateUseCase = new UpdateProductUseCase(productRepository);
        input.name = "Product A1 Updated",
        input.price = -1;

        await expect(productUpdateUseCase.execute(input)).rejects.toThrow("Price must be greater than 0");
    });

});