import mongoose from "mongoose";

if (!cached) {
    cached = {conn:null,promise:null}
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const options = {
            bufferCommands:false
        }

        chached.promise = mongoose.connect(`${process.env.MONGODB_URI}/ibrahimyoussefdev_db_user` , options)
        .then(mongoose => mongoose)
    }

    cached.conn = await chached.promise

    return cached.onn
}

export default connectDB