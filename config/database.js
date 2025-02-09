import mongoose from 'mongoose';

const connectDB = () => {
  mongoose.connect('mongodb://localhost:27017/mabase')
    .then(() => console.log("Connecté à MongoDB"))
    .catch(err => console.log("Erreur MongoDB :" + err));
};


export default connectDB;
