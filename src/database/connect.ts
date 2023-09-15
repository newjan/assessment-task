import * as Mongoose from "mongoose";

export const connect = () => {

    const url = process.env.MONGO_CONNECTION_STRING;
    console.log("from connect: process.env.MONGO_CONNECTION_STRING :::",process.env.MONGO_CONNECTION_STRING)

    Mongoose
    .connect(url as string)
    .then(() => {
        console.log('Connected to MongoDB database')

    })
    .catch((err) => {
        console.log(err)
        console.log('Database connection failed')

        process.exit(1)
    })
};

export const disconnect = () => {
    Mongoose.disconnect().then(() => {
        console.log("Diconnected  to database");
    });
};