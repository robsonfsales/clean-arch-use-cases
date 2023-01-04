import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import UpdateCustomerUseCase from "./update.customer.usecase";
import CreateCustomerUseCase from "../create/create.customer.usecase";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/Address";
import Customer from "../../../domain/customer/entity/customer";

const input = {
    id: "",
    name: "John Updated", 
    address: {
        street: "Street Updated",
        number: 1234,
        zip: "Zip Updated",
        city: "City Updated",
    }
}

describe("Test create customer use case", () => {
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

    describe("Unit Test update customer use case", () => {
        it("should update a customer", async () => {
            const customerRepository = new CustomerRepository(); 

            const customer = new Customer("123", "John");
            const address = new Address("Street", 123, "Zip", "City");
            customer.changeAddress(address);
            await customerRepository.create(customer);

            input.id = customer.id;

            const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);
    
            const output = await customerUpdateUseCase.execute(input);
    
            expect(output).toEqual(input);
        });
    });

});