import mongoose from "mongoose";

function connect(){

    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/test_typescript";
    mongoose.connect(mongoUri)
    .catch(error => {
        console.error(`Failed to connect to MongoDB: ${error.message}`);
    });

    mongoose.connection.once('open', ()=>{
        console.log('Connected to MongoDB');
    });
}
connect()

export default mongoose