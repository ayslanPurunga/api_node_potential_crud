const { Developer } = require('../models')
const { validName, validSex, validAge, validBirthDate, validHobby } = require('../../utils/validation');

class DevController {
    async index(req, res) {
        const limit = 8
        const data = req.query
        let page = data.page - 1 || 0

        
    
        const developers = await Developer.findAndCountAll({
            limit: limit, 
            offset: page * limit 
        }) 

        if(!developers || developers.length == 0) {
            return res.status(400).json({ message: 'Desenvolvedor não encontrado!' })
        }

        return res.status(200).json({ developers, page, limit })
    }

    async show(req, res) {
        const { id } = req.params

        const developer = await Developer.findOne({ 
            where: {
                id: id
            }
        }) 

        if(!developer || developer.length == 0) {
            return res.status(400).json({ message: 'Desenvolvedor não encontrado!' })
        }

        return res.status(200).json({ developer })
    }

    async description(req, res) {
        const { name, sex, age, birthdate, hobby } = req.body

        try {
            validName(name, 'Nome inválido, digite no minimo 3 letras!')
            validSex(sex, 'Selecione o sexo!')
            validAge(age, 'Idade inválida!')
            validBirthDate(birthdate, age, 'Data de nascimento inválida, não é compátivel com a idade informada!')
            

            const developer = await Developer.create({ name, sex, age, birthdate, hobby })

            return res.status(201).json({ developer })
        } catch (msg) {
            return res.status(400).json({ message: msg })
        }
    }

    async update(req, res) {
        const { id } = req.params
        const { name , sex, age, birthdate, hobby } = req.body

        const developerId = await Developer.findOne({
            where: {
                id: id
            }
        })

        if(!developerId || developerId.length == 0) {
            return res.status(400).json({ message: 'Desenvolvedor não encontrado!'})
        }

        try {
            validName(name, 'Nome inválido, digite no minimo 3 letras!')
            validSex(sex, 'Selecione um sexo!')
            validAge(age, 'Idade inválida')
            validBirthDate(birthdate, age, 'Data de nascimento inválida, não é compátivel com a idade informada!')

            const developer = await Developer.update({ name, sex, age, birthdate, hobby }, {
                where: {
                    id: id
                }
            })

            return res.status(200).json({ developer })
        } catch (msg){
            return res.status(400).json({ message: msg})
        }
    }

    async destroy(req, res) {
        const { id } = req.params

        const developer = await Developer.destroy({ 
            where: {
                id: id
            }
        }) 

        if(!developer || developer.length == 0) {
            return res.status(400).json({ message: 'Desenvolvedor não encontrado!' })
        }

        return res.status(204).json({ developer })
    }
    
}

module.exports = new DevController()