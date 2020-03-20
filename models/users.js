const Sequelize = require('sequelize');

const sequelize = require('../utils/db_connection');

const user = sequelize.define('user', {
    user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    is_logged_in: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

user.isUsernameLoggedInByUserName = async (username1) => {
    return Boolean(await (user.count({where: {username: username1, is_logged_in: true}})));
};

user.isUsernameLoggedInByUserID = async (userID) => {
    return Boolean(await (user.count({where: {user_id: userID, is_logged_in: true}})));
};

//return UserID
user.logIn = async (username1) => {
    try {
        let test= await user.create({
            username: username1,
            is_logged_in: true
        });
        return test.getDataValue('user_id');
    } catch (e) {
        console.log(e);
        return false;
    }
};

user.logOut = async (userID) => {
    try {
        await user.update(
            {is_logged_in: false},
            {where: {user_id: userID}}
        );
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
};

user.getAllConnected = async () => {
    try {
        return await user.findAll({
            where: {
                is_logged_in: true
            }
        });
    } catch (e) {
        console.log(e);
        return false;
    }
};

module.exports = user;