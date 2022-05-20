const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool');

// GET
koalaRouter.get('/', (req,res) => {
    console.log('In /koalas GET');
    pool.query(`SELECT * FROM "koala"`)
    .then(result => {
        console.log(result.rows);
        res.send(result.rows);
    }).catch(error => {
        console.log('Error doing a SELECT of koala', error)
        res.sendStatus(500);
    })
})

// POST
koalaRouter.post('/', (req, res) => {
    const newKoala = req.body;
    console.log('New koala is', newKoala);
    const query = `
    INSERT INTO "koala" ("names", "gender", "age", "ready_to_transer", "notes")
    VALUES ($1, $2, $3, $4, $5);`
    pool.query(query, [newKoala.name, newKoala.gender, newKoala.age, newKoala.ready_to_transer, newKoala.notes])
        .then(() => {
            res.sendStatus(201)
        }).catch(error => {
            console.log('Error at INSERT koala', error);
            res.sendStatus(500);
        })
});

// PUT


// DELETE

module.exports = koalaRouter;