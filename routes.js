const express = require('express');
const routes = express.Router();

//obtener todos los usuarios
routes.get('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);

        conn.query('SELECT * FROM USUARIO', (err, rows) => {
            if (err) return res.send(err);

            res.json(rows);
        });
    });
});


routes.post('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);


        conn.query('INSERT INTO USUARIO SET ?', [req.body], (err, rows) => {
            if (err) return res.send(err);

            res.send('Usuario agregado');
        });
    });
});

routes.get('/login/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);

        conn.query('SELECT * FROM USUARIO WHERE login_name = ? ', [req.params.id], (err, rows) => {
            if (err) return res.send(err);
            res.json(rows);
        });
    });
});

routes.delete('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);

        conn.query('DELETE FROM USUARIO WHERE login_name = ?', [req.params.id], (err, rows) => {
            if (err) return res.send(err);

            res.send('El usuario a sido eliminado');
        });
    });
});

routes.put('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);

        conn.query('UPDATE USUARIO set ? WHERE login_name = ?', [req.body, req.params.id], (err, rows) => {
            if (err) return res.send(err);
            res.send('Se ha actualizado el usuario');
        });
    });
});



module.exports = routes;