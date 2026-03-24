const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
    try {
        let uri = process.env.MONGO_URI;
        
        // Use in-memory DB if credentials are not provided
        if (!uri || uri.includes('<db_password>')) {
            console.log('⚠️ Warning: Using in-memory database because <db_password> placeholder is present in .env');
            const mongoDB = await MongoMemoryServer.create();
            uri = mongoDB.getUri();
        }

        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
