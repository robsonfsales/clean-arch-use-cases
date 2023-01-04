import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/Address";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import ListCustomerUseCase from "./list.customer.usecase";

describe("Test list customer use case", () => {
    let sequelize: Sequelize;

    beforeEach(async() => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async() => {
        await sequelize.close();
    });

    it("should list all customers", async () => {
        const customerRepository = new CustomerRepository(); 
        
        const customer1 = new Customer("123", "John Doe");
        const address1 = new Address("Street 1", 1, "123456", "City 1");
        customer1.changeAddress(address1);

        const customer2 = new Customer("456", "Jane Smith");
        const address2 = new Address("Street 2", 2, "789456", "City 2");
        customer2.changeAddress(address2);

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const customerListUseCase = new ListCustomerUseCase(customerRepository);
        const output = await customerListUseCase.execute({});

        expect(output.customers.length).toBe(2);

        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.address.street);
        
        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.address.street);
    });

});