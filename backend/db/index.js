import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to DB : "+ conn.connection.host);
        
    } catch (error) {
        console.log("Error connecting to DB" + error);
    }
}

export default connectDB;