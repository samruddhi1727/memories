import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("database connected"));
        await mongoose.connect(`${process.env.MONGODB_URL}socialmedia`);
    } catch (error) {
        console.log(`unable to connect database ${error}`)
    }

};
export default connectDB;