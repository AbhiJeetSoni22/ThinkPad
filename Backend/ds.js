const mongoose = require('mongoose');
const mongooseUrl = 'mongodb+srv://Thinkpad_Admine:absoni04@cluster0.cdmdx.mongodb.net/'; // Use a string here, not require

const mongodb = async () => {
    try {
        await mongoose.connect(mongooseUrl);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
};

module.exports = mongodb;