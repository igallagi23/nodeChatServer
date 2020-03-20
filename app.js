const http = require('http');
const express = require('express');
const cors = require('cors');
const sequelize = require('./utils/db_connection');
const router = require('./router');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(router);

//initial function
(async function  (){
    try {
        await sequelize.sync();
        server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));
    }catch (err) {
        console.log(err);
    }
})();


