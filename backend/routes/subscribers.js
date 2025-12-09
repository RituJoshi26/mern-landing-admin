const router = require('express').Router();
const ctrl = require('../controllers/subscribersController');

router.post('/', ctrl.create);
router.get('/', ctrl.getAll);
router.delete('/:id', ctrl.remove);   // ✅ ADD THIS

module.exports = router;
