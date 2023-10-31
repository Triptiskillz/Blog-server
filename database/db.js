import mongoose from "mongoose";
//TNTYFVzDEzNkL5Wt
const Connection = async (username,password) => {
    const URL = `mongodb+srv://${username}:${password}@cluster0.tdnwtlq.mongodb.net/?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL, {   useNewUrlParser: true,useUnifiedTopology: true })
        console.log("Database connected successfully")
    } catch (error) {
        console.log(`Error while connecting with the database`, error);
    }
}

export default Connection;