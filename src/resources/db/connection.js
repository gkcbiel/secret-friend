const mongoose = require ('mongoose')

let conn = null

//fud8hvmr05izaBdU

const URI = 'mongodb+srv://secret:fud8hvmr05izaBdU@secret.g6nrk.mongodb.net/secret?retryWrites=true&w=majority'

module.exports = async () => {
    if(!conn){
        conn = mongoose.connect(URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        })

        await conn
    }
};
