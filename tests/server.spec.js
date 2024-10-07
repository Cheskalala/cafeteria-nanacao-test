const request = require("supertest");
const server = require("../index");
const app = require('../index');

describe("Operaciones CRUD de cafes", () => {

        //GET
    it("obtiene la lista de cafes", async () => {
        const response = await request(server).get("/cafes");
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it("obtiene un cafe por su id", async () => {
        const response = await request(server).get("/cafes/1");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id", 1);
    });

        //POST
    it("se agrega un nuevo cafe", async () => {
        const newCafe = {id: 5, name: "Expresso" };
        const response = await request(server).post("/cafes").send(newCafe);
        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body).toContainEqual(newCafe);
    });

        //PUT
    it("devuelve un código 400 si el id en los parámetros no coincide con id en el payload", async () => {
        const idCafe = 1;
        const cafeActualizado = {id: 2,nombre: "Café Americano"};
        const response = await request(app).put(`/cafes/${idCafe}`).send(cafeActualizado);
        expect(response.statusCode).toBe(400);       
    });


        //DELETE
    it("Devolver 404 al intentar eliminar un café con un id que no existe", async () => {
        const jwt = "token";  
        const idCafeInexistente = 7; 
        const response = await request(server).delete(`/cafes/${idCafeInexistente}`).set("Authorization", jwt).send();
        expect(response.status).toBe(404);
    });

});
