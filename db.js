const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
mongoose.connect(process.env.URL_MONGDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});