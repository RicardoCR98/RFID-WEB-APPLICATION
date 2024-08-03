const express = require('express');
const router = express.Router();
const AccessRecord = require('../models/AccessRecord');

// Ruta para obtener todos los registros de acceso
router.get('/records', (req, res) => {
  AccessRecord.find()
    .then(records => res.json(records))
    .catch(err => res.status(500).json({ message: 'Error fetching records', error: err }));
});

// Ruta para registrar un nuevo intento de acceso
router.post('/create', (req, res) => {
  const newRecord = new AccessRecord({
    cardId: req.body.cardId,
    authorized: req.body.authorized
  });

  newRecord.save()
    .then(result => res.status(201).json(result))
    .catch(err => res.status(500).json({ message: 'Error saving record', error: err }));
});

// Ruta para eliminar un registro de acceso específico
router.delete('/delete/:id', (req, res) => {
  AccessRecord.findByIdAndRemove(req.params.id)
    .then(result => res.json({ message: 'Record deleted successfully' }))
    .catch(err => res.status(500).json({ message: 'Error deleting record', error: err }));
});

module.exports = router;
