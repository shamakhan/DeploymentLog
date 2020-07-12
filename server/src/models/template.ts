import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  versions: [{
    type: String,
  }]
});

const Template = mongoose.model('Template', templateSchema);

export default Template;