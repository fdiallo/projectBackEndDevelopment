const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);


module.exports = Project;
