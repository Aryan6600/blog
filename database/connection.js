const url = process.env.MONGODB_CONNECTION_STRING
const mongoose = require('mongoose');
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("Connected Mongodb") })
    .catch(err => { console.log("Error Connection Mongo DB "); });
module.exports = mongoose