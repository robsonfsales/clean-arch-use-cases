import CreateProductUseCase from "./create.product.usecase";

const input = {
    type: "",
    name: "Prduct 1",
    price: 10,
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit Test create product use case", () => {

    it("should create a product type a", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        
        input.type ="a";
        input.name = "Product A1";

        const output = await productCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });

    });

    it("should create a product type b", async () => {
        const productRepository = MockRepository();
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
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        input.type ="c";

        await expect(productCreateUseCase.execute(input)).rejects.toThrow("Product type not supported");
    });

    it("should throw an error when create product name is missing", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        input.type ="a";
        input.name = "";
        input.price = 10;

        await expect(productCreateUseCase.execute(input)).rejects.toThrow("Name is required");
    });

    it("should throw an error when create product price is less than 0", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        input.type ="a";
        input.name = "Product 1";
        input.price = -1;

        await expect(productCreateUseCase.execute(input)).rejects.toThrow("Price must be greater than 0");
    });
});