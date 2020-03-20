const express = require("express");
const router = express.Router();
const Message = require('./models/messages');
const User = require('./models/users');
const AMOUNT_LAST_MESSAGES = 10;
User.hasMany(Message);

router.get("/", (req, res) => {
    res.send({response: "Server is up and running."}).status(200);
});

router.post("/login", async (req, res) => {
    try {
        const username1 = req.body.username;
        if (await User.isUsernameLoggedInByUserName(username1) === false) {
            const userId = await User.logIn(username1);
            if (!userId) res.status(500).send();
            else {
                res.send({
                    body: {
                        user_id: userId
                    }
                }).status(200);
            }
        } else res.status(409).send();
    } catch (e) {
        console.log(e);
        res.status(500).send("Server error");
    }

});


router.post("/logout", async (req, res) => {
    try {
        const userID = req.body.userID;
        if (await User.logOut(userID)) res.status(200).send();
        else res.status(500).send();
    } catch (e) {
        console.log(e);
        res.status(500).send("Server error");
    }


});

router.post("/post_message", async (req, res) => {
    try {
        const userID = req.body.userID;
        if (await User.isUsernameLoggedInByUserID(userID) === true) {
            if (await Message.postMessage(userID, req.body.username, req.body.content)) {
                res.status(200).send();
            } else res.status(500).send();
        } else res.status(401).send("user not logged in");
    } catch (e) {
        console.log(e);
        res.status(500).send("Server error");
    }


});

router.get("/get_last_messages", async (req, res) => {
    try {
        const new_messages = await Message.getLastXMessages(AMOUNT_LAST_MESSAGES);
        if (new_messages === false) res.status(500).send();
        else
            res.send({body: new_messages}).status(200);
    } catch (e) {
        console.log(e);
        res.status(500).send("Server error");
    }

});

router.get("/get_new_messages", async (req, res) => {
    try {
        const date = new Date(req.param('date'));
        date.setHours(date.getHours() - 2);
        const new_messages = await Message.getMessagesNewerThan(date);
        if (new_messages === false) res.status(500).send();
        else
            res.send({body: new_messages}).status(200);
    } catch (e) {
        console.log(e);
        res.status(500).send("Server error");
    }

});

router.get("/get_all_connected", async (req, res) => {
    try {
        const connected = await User.getAllConnected();
        if (connected === false) res.status(500).send();
        else
            res.send({body: connected}).status(200);
    } catch (e) {
        console.log(e);
        res.status(500).send("Server error");
    }
});

module.exports = router;
