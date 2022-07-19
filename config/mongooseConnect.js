const mongoose = require('mongoose')

async function connectToDB() {
    await mongoose.connect(
        "mongodb+srv://asaf:asaf123@clusterblockchain0.xzi0z.mongodb.net/?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        () => {
            console.log("Mongoose is connected");
        }
    );
    mongoose.connection.on('error', () => console.error("Couldn't connect to database."))
    mongoose.connection.on('connection', () => console.log('Connected to database.'))
}

module.exports = connectToDB
