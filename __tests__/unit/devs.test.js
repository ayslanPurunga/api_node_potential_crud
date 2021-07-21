const request = require("supertest")

const app = require('../../src/app')
const { Developer } = require('../../src/app/models')
const truncament = require("../utils/truncament")

describe('Search /GET developers', () => {
    beforeEach(async () => {
        await truncament()
    })

    it('Espera-se que há de retornar status 400 por não haver dev no Banco de Dados', async () => {
        const response = await request(app)
            .get("/developers")

        expect(response.status).toBe(400)
    })

    it('Espera-se que há de retornar status 200 ao criar um dev no Banco de Dados', async () => {
        await Developer.create({
            name: "Ayslan Fernandes",
            sex: "M",
            age: 22,
            birthdate: "1999-03-22",
            hobby: "Pescar, colecionar ferramentas, caminhar e práticar exercícios."
        })

        const response = await request(app)
            .get("/developers")

        expect(response.status).toBe(200)
    })
})    

describe('Search /GET developers/{id}', () => {
    beforeEach(async () => {
        await truncament()
    })

    it('Espera-se que há de retornar status 400 ao enviar um id inexistente no Banco de Dados', async () => {
        const response = await request(app)
            .get("/developers/8")

        expect(response.status).toBe(400)
    })

    it('Espera-se que há de retornar status 200 ao enviar um id existente no Banco de Dados', async () => {
        const developer = await Developer.create({
            name: "Ayslan Fernandes",
            sex: "M",
            age: 22,
            birthdate: "1999-03-22",
            hobby: "Pescar, comprar e colecionar ferramentas, caminhar e práticar exercícios."
        })

        const response = await request(app)
            .get(`/developers/${developer.id}`)

        expect(response.status).toBe(200)
    })
})

describe('Create /POST developers', () => {
    before(async () => {
        await truncament()
    })

    it('Espera-se que há de retornar status 400 ao enviar um dev para salvar com nome em branco.', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                name: "",
                sex: "M",
                age: 22,
                birthdate: "1999-03-22",
                hobby: "Pescar, comprar e colecionar ferramentas, caminhar e práticar exercícios."
            })

        expect(response.status).toBe(400)
    })

    it('Espera-se que há de retornar status 400 ao enviar um dev para salvar com sexo em branco.', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                name: "Ayslan Fernandes",
                sex: "",
                age: 22,
                birthdate: "1999-03-22",
                hobby: "Pescar, comprar e colecionar ferramentas, caminhar e práticar exercícios."
            })

        expect(response.status).toBe(400)
    })

    it('Espera-se que há de retornar status 400 ao enviar um dev para salvar com a idade em branco.', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                name: "Ayslan Fernandes",
                sex: "M",
                age: '',
                birthdate: "1999-03-22",
                hobby: "Pescar, comprar e colecionar ferramentas, caminhar e práticar exercícios."
            })

        expect(response.status).toBe(400)
    })

    it('Espera-se que há de retornar status 400 ao enviar um dev para salvar com data de nascimento em branco.', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                name: "Ayslan Fernandes",
                sex: "M",
                age: 22,
                birthdate: "",
                hobby: "Pescar, comprar e colecionar ferramentas, caminhar e práticar exercícios."
            })

        expect(response.status).toBe(400)
    })

    it('Espera-se que há de retornar status 400 ao enviar um dev para salvar com hobby branco.', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                name: "Ayslan Fernandes",
                sex: "M",
                age: 22,
                birthdate: "1999-03-22",
                hobby: ""
            })

        expect(response.status).toBe(400)
    })

    it('Espera-se que há de retornar status 400 ao enviar um dev para salvar com nome com menos de 3 caracteres.', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                name: "Af",
                sex: "M",
                age: 22,
                birthdate: "1999-03-22",
                hobby: "Pescar, comprar e colecionar ferramentas, caminhar e práticar exercícios."
            })

        expect(response.status).toBe(400)
    })

    it('Espera-se que há de retornar status 400 ao enviar um dev para salvar com hobby com menos de 5 caracteres.', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                name: "Ayslan Fernandes",
                sex: "M",
                age: 22,
                birthdate: "1999-03-22",
                hobby: "Nd"
            })

        expect(response.status).toBe(400)
    })

    it('Espera-se que há de retornar status 400 ao enviar um dev para salvar a data de nascimento incompatível com a idade.', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                name: "Ayslan Fernandes",
                sex: "M",
                age: 22,
                birthdate: "2000-01-22",
                hobby: "Pescar, comprar e colecionar ferramentas, caminhar e práticar exercícios."
            })

        expect(response.status).toBe(400)
    })

    it('Espera-se que há de retornar status 201 ao enviar um dev para salvar com os dados pessoais corretos. .', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                name: "Ayslan Fernandes",
                sex: "M",
                age: 22,
                birthdate: "1999-03-22",
                hobby: "Pescar, comprar e colecionar ferramentas, caminhar e práticar exercícios."
            })

        expect(response.status).toBe(201)
    })
})

describe('Update /PUT developers/{id}', ()=> {
    beforeEach(async () => {
        await truncament()
    })

    it('Espera-se que há de retornar status 400 ao enviar um update de dev com id inexistente no banco de dados', async () => {
        await Developer.create({
            name: "Ayslan Fernandes",
            sex: "M",
            age: 22,
            birthdate: "1999-03-22",
            hobby: "Pescar, comprar e colecionar ferramentas, caminhar e práticar exercícios."
        })

        const response = await request(app)
            .put("/developers/8")
            .send({
                name: "Ayslan Fernandes",
                sex: "M",
                age: 22,
                birthdate: "1999-03-22",
                hobby: "Pescar, comprar e colecionar ferramentas, caminhar e práticar exercícios."
            })

        expect(response.status).toBe(400)
    })
    
    it('Espera-se que há de retornar status 400 ao enviar um update de dev com o nome em branco', async () => {
        await Developer.create({
            name: "Ayslan Fernandes",
            sex: "M",
            age: 22,
            birthdate: "1999-03-22",
            hobby: "Pescar, comprar e colecionar ferramentas, caminhar e práticar exercícios."
        })

        const response = await request(app)
            .put("/developers/1")
            .send({
                name: "",
                sex: "M",
                age: 22,
                birthdate: "1999-03-22",
                hobby: "Pescar, comprar e colecionar ferramentas, caminhar e práticar exercícios."
            })

        expect(response.status).toBe(400)
    })
    
    it('Espera-se que há de retornar status 400 ao enviar um update de dev com o sexo em branco.', async () => {
        await Developer.create({
            name: "Ayslan Fernandes",
            sex: "M",
            age: 22,
            birthdate: "1999-03-22",
            hobby: "Pescar, comprar e colecionar ferramentas, caminhar e práticar exercícios."
        })

        const response = await request(app)
            .put("/developers/1")
            .send({
                name: "Ayslan Fernandes",
                sex: "",
                age: 22,
                birthdate: "1999-03-22",
                hobby: "Pescar, comprar e colecionar ferramentas, caminhar e práticar exercícios."
            })

        expect(response.status).toBe(400)
    })
    
    it('Espera-se que há de retornar status 400 ao enviar um update de dev com a idade em branco.', async () => {
        await Developer.create({
            name: "Ayslan Fernandes",
            sex: "M",
            age: 22,
            birthdate: "1999-03-22",
            hobby: "Pescar, comprar e colecionar ferramentas, caminhar e práticar exercícios."
        })

        const response = await request(app)
            .put("/developers/1")
            .send({
                name: "Ayslan Fernandes",
                sex: "M",
                age: '',
                birthdate: "1999-03-22",
                hobby: "Pescar, comprar e colecionar ferramentas, caminhar e práticar exercícios."
            })

        expect(response.status).toBe(400)
    })
    
    it('Espera-se que há de retornar status 400 ao enviar um update de dev com a data de nascimento em branco.', async () => {
        await Developer.create({
            name: "Ayslan Fernandes",
            sex: "M",
            age: 22,
            birthdate: "1999-03-22",
            hobby: "Pescar, comprar e colecionar ferramentas, caminhar e práticar exercícios."
        })

        const response = await request(app)
            .put("/developers/1")
            .send({
                name: "Ayslan Fernandes",
                sex: "M",
                age: 22,
                birthdate: "",
                hobby: "Pescar, comprar e colecionar ferramentas, caminhar e práticar exercícios."
            })

        expect(response.status).toBe(400)
    })
    
    it('Espera-se que há de retornar status 400 ao enviar um update de dev com o hobby em branco.', async () => {
        await Developer.create({
            name: "Ayslan Fernandes",
            sex: "M",
            age: 22,
            birthdate: "1999-03-22",
            hobby: "Pescar, comprar e colecionar ferramentas, caminhar e práticar exercícios."
        })

        const response = await request(app)
            .put("/developers/1")
            .send({
                name: "Ayslan Fernandes",
                sex: "M",
                age: 22,
                birthdate: "1999-03-22",
                hobby: ""
            })

        expect(response.status).toBe(400)
    })
    
    it('Espera-se que há de retornar status 400 ao enviar um update de dev para atualizar nome com menos de 3 caracteres.', async () => {
        await Developer.create({
            name: "Ayslan Fernandes",
            sex: "M",
            age: 22,
            birthdate: "1999-03-22",
            hobby: "Pescar, comprar e colecionar ferramentas, caminhar e práticar exercícios."
        })

        const response = await request(app)
            .put("/developers/1")
            .send({
                name: "Af",
                sex: "M",
                age: 22,
                birthdate: "1999-03-22",
                hobby: "Pescar, comprar e colecionar ferramentas, caminhar e práticar exercícios."
            })

        expect(response.status).toBe(400)
    })
    
    it('Espera-se que há de retornar status 400 ao enviar um update de dev para atualizar data de nascimento incompativel.', async () => {
        await Developer.create({
            name: "Ayslan Fernandes",
            sex: "M",
            age: 22,
            birthdate: "1999-03-22",
            hobby: "Pescar, comprar e colecionar ferramentas, caminhar e práticar exercícios."
        })

        const response = await request(app)
            .put("/developers/1")
            .send({
                name: "Ayslan Fernandes",
                sex: "M",
                age: 22,
                birthdate: "2000-01-22",
                hobby: ""
            })

        expect(response.status).toBe(400)
    })
    
    it('Espera-se que há de retornar status 400 ao enviar um update de dev para atualizar o hobby com menos de 5 letras.', async () => {
        await Developer.create({
            name: "Ayslan Fernandes",
            sex: "M",
            age: 22,
            birthdate: "1999-03-22",
            hobby: "Pescar, comprar e colecionar ferramentas, caminhar e práticar exercícios."
        })

        const response = await request(app)
            .put("/developers/1")
            .send({
                name: "Ayslan Fernandes",
                sex: "M",
                age: 22,
                birthdate: "2000-01-22",
                hobby: "nd"
            })

        expect(response.status).toBe(400)
    })
    
    it('Espera-se que há de retornar status 200 ao enviar um update de dev com dados pessoais corretos.', async () => {
        const developer = await Developer.create({
            name: "Ayslan Fernandes",
            sex: "M",
            age: 22,
            birthdate: "1999-03-22",
            hobby: "Pescar, comprar e colecionar ferramentas, caminhar e práticar exercícios."
        })

        const response = await request(app)
            .put(`/developers/${developer.id}`)
            .send({
                name: "Ayslan Fernandes da Silva",
                sex: "M",
                age: 22,
                birthdate: "2000-01-22",
                hobby: "Pescar, dormir, comprar e colecionar ferramentas, caminhar e práticar exercícios."
            })

        expect(response.status).toBe(200)
    })
})

describe('Delete /delete developers/{id}', () => {
    beforeEach(async () => {
        await truncament()
    })

    it('Espera-se que há de retornar status 400 ao enviar um id inexistente no Banco de Dados', async () => {
        const response = await request(app)
            .delete("/developers/8")

        expect(response.status).toBe(400)
    })

    it('Espera-se que há de retornar status 204 ao enviar um id existente no Banco de Dados.', async () => {
        const developer = await Developer.create({
            name: "Ayslan Fernandes",
            sex: "M",
            age: 22,
            birthdate: "1999-03-22",
            hobby: "Pescar, comprar e colecionar ferramentas, caminhar e práticar exercícios."
        })

        const response = await request(app)
            .delete(`/developers/${developer.id}`)

        expect(response.status).toBe(204)
    })
})

