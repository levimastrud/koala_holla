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
    INSERT INTO "koala" ("name", "gender", "age", "ready_to_transfer", "notes")
    VALUES ($1, $2, $3, $4, $5);`
    pool.query(query, [newKoala.name, newKoala.gender, newKoala.age, newKoala.ready_to_transfer, newKoala.notes])
        .then(() => {
            res.sendStatus(201)
        }).catch(error => {
            console.log('Error at INSERT koala', error);
            res.sendStatus(500);
        })
});

// PUT
koalaRouter.put('/:id', (req, res) => {
    console.log(`put /koalas/`, req.params);
    const koalaId = req.params.id; 
    console.log(` --> updating koala with id of ${koalaId}`);
    const queryString = `UPDATE "koala" SET "ready_to_transfer" =  NOT "ready_to_transfer" WHERE id=$1`
    pool.query(queryString, [koalaId])
        .then(response => {
            res.sendStatus(204)
        }).catch(error => {
            console.log('Error doing a SELECT of koala', error);
            res.sendStatus(500);
        });
})

// DELETE
koalaRouter.delete('/:id', (req, res) => {
    console.log(`DELETE /koalas/`, req.params);
    const koalasId = req.params.id; 
    console.log(` --> deleting song with id of ${koalasId}`);
    const queryString = `DELETE FROM "koala" WHERE id=$1;`
    pool.query(queryString, [koalasId])
        .then(response => {
            res.sendStatus(204)
        }).catch(error => {
            console.log('Error doing a SELECT of koala', error);
            res.sendStatus(500);
        });
})

module.exports = koalaRouter;