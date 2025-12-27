const mongoose = require('mongoose');

const talentSchema = new mongoose.Schema({
  course: String,
  description: String,
  hourlyRate: Number,
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Talent', talentSchema);
