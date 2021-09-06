import mongoose from "mongoose";

export default function connect(){

    const mongoUri = `mongodb://localhost:27017/test_typescript`;
    mongoose.connect(mongoUri)
    .catch(error => {
        console.error(`Failed to connect to MongoDB: ${error.message}`);
    });

    mongoose.connection.once('open', ()=>{
        console.log('Connected to MongoDB');
    });
}