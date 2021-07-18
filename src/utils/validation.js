function existsOrError(value, msg) {
    if(!value) throw msg
    if(Array.isArray(value) && value.length === 0) throw msg
    if(typeof value === 'string' && !value.trim()) throw msg
}

function ageCalculator(year, month, day) {
    const d = new Date

    currentYear = d.getFullYear()
    currentMonth = d.getMonth() + 1
    currentDay = d.getDate()

    year = +year
    month = +month
    day = +day

    howManyYears = currentYear - year

    if (currentMonth < month || currentMonth == month && currentDay < day) {
        howManyYears--
    }

    return howManyYears < 0 ? 0 : howManyYears;
}

function validName(value, msg) {
    existsOrError(value, 'Por favor, digite um nome válido...')

    if(value.length < 3) throw msg
}

function validSex(value, msg){
    existsOrError(value, msg)
}

function validAge(value, msg) {
    existsOrError(value, 'Por favor, digite uma idade válida...')
    
    if(value <= 0) throw msg
}

function validBirthDate(value, age, msg) {
    existsOrError(value, 'Por favor, digite uma data de nascimento válida e compátivel a idade...')

    const dataNascimento = value.split('-')
    
    if(caculatorAge(dataNascimento[0], dataNascimento[1], dataNascimento[2]) != idade) throw msg
    
}

function validHobby(value, msg) {
    existsOrError(value, 'Por favor, digite um hobby...')
    
    if(value.length < 5) throw msg
}

module.exports = { validName, validSex, validAge, validBirthDate, validHobby }

