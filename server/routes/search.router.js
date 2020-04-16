const express = require('express');
const router = express.Router();
const axios = require('axios');

const dotenv = require('dotenv');
dotenv.config();
console.log('API Key', process.env.GIPHY_API_KEY);

router.get('/', (req, res) => {
     //axios request to giphy api
     console.log('search request', req.query);
     axios.get(`http://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${req.query.q}&limit=5`)
     .then( response => {
         console.log(response.data.data);
         res.send(response.data.data);

     })
     .catch( error =>{
         console.log('error on get', error);
         res.sendStatus(500);
     })
})

module.exports = router;