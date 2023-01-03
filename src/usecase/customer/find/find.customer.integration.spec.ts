
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/Address";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Test find customer use case", () => {
    let sequileze: Sequelize;

    beforeEach(async() => {
        sequileze = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequileze.addModels([CustomerModel]);
        await sequileze.sync();
    });

    afterEach(async() => {
        await sequileze.close();
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "John");
        const address = new Address("Street", 123, "Zip", "City");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        // use case
        const usecase = new FindCustomerUseCase(customerRepository);

        const input = {
            id: "123",
        }

        const output = {
            id: "123",
            name: "John",
            address: {
                street: "Street",
                number: 123,
                zip: "Zip",
                city: "City",
            }
        }

        const result = await usecase.execute(input);
        expect(result).toEqual(output);

    });

});