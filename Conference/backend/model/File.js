const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  fileName: String,
  downloadURL: String,
  createdAt: { type: Date, default: Date.now }
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
