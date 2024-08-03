const mongoose = require('mongoose');

const accessRecordSchema = new mongoose.Schema({
  cardId: {
    type: String,
    required: true
  },
  accessTime: {
    type: Date,
    default: Date.now
  },
  authorized: {
    type: Boolean,
    required: true
  }
});

const AccessRecord = mongoose.model('AccessRecord', accessRecordSchema);

module.exports = AccessRecord;
