import mongoose from "mongoose";

const connection = { isConnected: false };

const connectDB = async () => {
    // if (connection.isConnected) {
    //     console.log("MongoDB bereits verbunden!");
    //     return;
    // }
    await mongoose.connect("mongodb+srv://kodirov-m-02:user321@cluster0.6q6ip.mongodb.net/RecipesDB");
    // connection.isConnected = db.connections[0].readyState;
    // console.log("MongoDB erfolgreich verbunden!");
};

export default connectDB;

