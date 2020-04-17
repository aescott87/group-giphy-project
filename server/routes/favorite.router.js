const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  const queryText = 'SELECT id, path FROM favorite';
  pool.query(queryText)
    .then((result) => { res.send(result.rows); })
    .catch((err) => {
      console.log('Error completing SELECT favorite query', err);
      res.sendStatus(500);
    });
});

// add a new favorite 
router.post('/', (req, res) => {
  console.log("the url of your new favorite is",req.body.data);
  const queryText = `INSERT INTO "favorite" ("path") VALUES ($1);`
  pool.query(queryText, [req.body.data]).then(
    res.sendStatus(200)
  ).catch(
    res.sendStatus(500)
  );

});

// update given favorite with a category id
router.put('/:favId', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  res.sendStatus(200);
});

// delete a favorite
router.delete('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
