const axios = require('axios');
const express = require('express');
const router = express.Router();
const db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
  try {
    const faveMons = await db.pokemon.findAll()
    res.render('pokemon/index.ejs', { faveMons });

  } catch(error) {
    console.warn(error)
    res.send('error')
  }
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  try {
    const [mon, created] = await db.pokemon.findOrCreate({ where: req.body })
    res.redirect('/pokemon')

  } catch(error) {
    console.warn(error)
    res.send('error')
  }
});

router.get('/:name', (req, res) => {
  const url = `http://pokeapi.co/api/v2/pokemon/${req.params.name}`
  axios.get(url)
    .then(response => {
      res.render('pokemon/show.ejs', { details: response.data })
    })
})

router.delete('/:name', async (req, res) => {
  try {
    await db.pokemon.destroy( {where: { name: req.params.name } })
    res.redirect('/pokemon')

  } catch(error) {
    console.warn(error)
    res.send('error')
  }
})

module.exports = router;
