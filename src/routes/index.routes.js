const { Router } = require('express');
//Controllers
const { renderAbout, renderIndex } = require('../controllers/index.controllers');

//Initialization
const router = Router();

router.get('/',renderIndex)

router.get('/about', renderAbout)

module.exports = router;