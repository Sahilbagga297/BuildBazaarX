import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name: String,
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  phone: String,
  address: String,
  city: String,
  state: String,
  zipCode: String,
}, {
  timestamps: true
});
export default mongoose.model('User', userSchema);