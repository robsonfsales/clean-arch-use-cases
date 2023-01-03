import Address from "../value-object/Address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {
    it("should create a customer", () => {
        const customer = CustomerFactory.create("John");
        
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.address).toBeUndefined();
    });

    it("should create a customer whith an address", () => {
        const address = new Address("Street", 1, "12345-678", "São Paulo");
        let customer = CustomerFactory.createWithAddress("John", address);
        
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.address).toBe(address);
    });
});