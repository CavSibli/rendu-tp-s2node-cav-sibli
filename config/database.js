import mongoose from 'mongoose';

const connectDB = () => {
  mongoose.connect('mongodb://127.0.0.1:27017/students')
    .then(() => console.log("Connecté à MongoDB"))
    .catch(err => console.error("Erreur MongoDB :", err));
};

export default connectDB; 