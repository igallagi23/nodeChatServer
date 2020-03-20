const Sequelize = require('sequelize');

const sequelize = require('../utils/db_connection');
const {Op} = require('sequelize');


const message = sequelize.define('massage', {
    message_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

message.postMessage = async (userID,username, content) => {
    try {
        await message.create({
            user_id: userID,
            username: username,
            content: content
        });
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
};

message.getLastXMessages = async (amount) => {
    try {
        return await message.findAll({
            limit: amount,
            order: [['createdAt', 'DESC']]
        });
    } catch (e) {
        console.log(e);
        return false;
    }
};

message.getMessagesNewerThan = async (date) => {
    try {
        return await message.findAll({
            where: {
                createdAt: {
                    [Op.gt]: date
                }
            }
        });
    } catch (e) {
        console.log(e);
        return false;
    }
};

module.exports = message;