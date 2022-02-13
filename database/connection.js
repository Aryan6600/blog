const url = "mongodb+srv://aryan:MHX95jBPmUHEN0S7@cluster0.bpqh9.mongodb.net/Blog?retryWrites=true&w=majority"
const mongoose = require('mongoose');
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { console.log("Connected Mongodb") }).catch(err => { console.log(err) });
module.exports = mongoose