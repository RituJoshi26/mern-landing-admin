const router = require('express').Router();
const ctrl = require('../controllers/clientsController');
const { uploadSingle, handleImageCrop } = require('../middleware/upload');


router.get('/', ctrl.getAll);
router.post('/', uploadSingle, handleImageCrop, ctrl.create);
router.delete('/:id', ctrl.delete);


module.exports = router;