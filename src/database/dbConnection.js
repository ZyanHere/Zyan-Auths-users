import mongoose  from "mongoose";

export const connectDB= () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "userAuth"
    })
    .then(() => {
        console.log("connected to database")
    })
    .catch((err) => {
        console.log(`some error occured while connecting to database: ${err}`)
    })
}