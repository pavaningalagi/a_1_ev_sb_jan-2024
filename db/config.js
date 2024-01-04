const {
    MongoClient
} = require('mongodb');

const mongoURI = 'mongodb+srv://abhishek:P8tSb0FUTs4dFeCp@cluster0.ktzxbdz.mongodb.net/obe-sample';

const client = new MongoClient(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

async function connect() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connect();

module.exports = {
    client
};



// // db/config.js
// import mongoose from 'mongoose';

// const mongoURI = 'mongodb+srv://abhishek:P8tSb0FUTs4dFeCp@cluster0.ktzxbdz.mongodb.net/obe-sample';

// mongoose.connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// export {
//     mongoose
// };