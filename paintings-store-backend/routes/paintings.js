const express = require('express');
const router = express.Router();
const paintingController = require('../controllers/paintingController');
const { auth, admin } = require('../middleware/auth');

// public routes
router.get('/', paintingController.getAllPaintings);

// Make sure /count is before /:id
router.get('/count', paintingController.getPaintingsCount);

router.get('/:id', paintingController.getPaintingById);

// admin-only routes
router.post('/', auth, admin, paintingController.createPainting);
router.put('/:id', auth, admin, paintingController.updatePainting);
router.delete('/:id', auth, admin, paintingController.deletePainting);

module.exports = router;
