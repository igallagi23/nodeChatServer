const Sequelize = require('sequelize');
const sequelize = new Sequelize('new_schema', 'root', '1234', {
    dialect: 'mysql',
    timezone: '+02:00',
});

module.exports = sequelize;