const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/restrant',
);

module.exports = mongoose.connection;
