import mongoose from 'mongoose';

const deploymentSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  templateName: {
    type: String,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
  deployedAt: {
    type: Date,
    default: Date.now
  }
});

const Deployment = mongoose.model('Deployment', deploymentSchema);

export default Deployment;