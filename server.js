//Constante de express para crear el servidor
const express = require('express');
const mysql = require('mysql2');
const myconn = require('express-myconnection');

const routes = require('./routes');

//Constante para la aplicación en la cual ejeutaremos express
const app = express();
const dbOptions = {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'admin',
    database: 'sistema'
}

app.set('port', 4000);

//midleware
app.use(myconn(mysql, dbOptions, 'single'));

app.use(express.json());


/* RUTAS */
//Ruta para el home
app.get('/', (req, res) => {
    res.send('Bienvenido a la API');
});

app.use('/api', routes);
//Server running
app.listen(app.get('port'), () => {
    console.log('El servidor esta corriendo en el puerto', app.get('port'));
});
