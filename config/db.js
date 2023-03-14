import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );

        const url = `${connection.connection.host}:${connection.connection.host}`;
        console.log(`MongoDB Conectado en: ${url}`);
    } catch (error) {
        console.log(`error : ${error.message}`)
        process.exit(1);//fuerza a que termine el proceso
    }
}

export default connectDB;