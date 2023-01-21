var express = require('express');
const HomeController = require('../app/controllers/home_controller');
const AdmController = require('../app/controllers/adm_controller')
var router = express.Router();

/* GET home page. */
router.get('/', HomeController.index);
router.get('/adm.json', AdmController.index)
router.post('/adm.json', AdmController.create)
router.put('/adm/:adm_id.json', AdmController.change)

module.exports = router;
