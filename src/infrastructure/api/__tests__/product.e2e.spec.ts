import {app, sequelize} from '../express';
import request from "supertest";

describe("E2E test for product", () => {
    beforeEach(async () => {        
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async() => {
        const response = await request(app)
            .post("/product")
            .send({
                type: "a",
                name: "Product A1",
                price: 10,            
            });
        
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product A1");
        expect(response.body.price).toBe(10);
    });

    

    it("should not create a product type not supported", async() => {
        const response = await request(app)
            .post("/product")
            .send({
                type: "c",
                name: "Product C1",
                price: 10,
            });
        
        expect(response.status).toBe(500);
    });

    it("should not create a product without name", async() => {
        const response = await request(app)
            .post("/product")
            .send({
                type: "a",
                price: 10,
            });
        
        expect(response.status).toBe(500);
    });

    it("should not create a product without price", async() => {
        const response = await request(app)
            .post("/product")
            .send({
                type: "b",
                name: "Product without price",
            });
        
        expect(response.status).toBe(500);
    });

    it("should list all product", async() => {
        const response1 = await request(app)
            .post("/product")
            .send({
                type: "a",
                name: "Product A1",
                price: 10,                
            });
        
        expect(response1.status).toBe(200);

        const response2 = await request(app)
            .post("/product")
            .send({
                type: "b",
                name: "Product B1",
                price: 15,
            });
        
        expect(response2.status).toBe(200);

        const listResponse = await request(app).get("/product").send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);

        const product1 = listResponse.body.products[0];
        expect(product1.name).toBe("Product A1");
        expect(product1.price).toBe(10);

        const product2 = listResponse.body.products[1];
        expect(product2.name).toBe("Product B1");
        expect(product2.price).toBe(15 * 2);
    });
});