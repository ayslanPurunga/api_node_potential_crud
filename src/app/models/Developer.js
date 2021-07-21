module.exports = (sequelize, DataTypes) => {
    const Developer = sequelize.define("Developer", {
        name: DataTypes.STRING,
        sex: DataTypes.STRING,
        age: DataTypes.INTEGER,
        birthdate: DataTypes.DATEONLY,
        hobby: DataTypes.STRING,
    })


    return Developer;
}