import mongoose from "mongoose"

const Connection = async (username , password) => {
    const URL = `mongodb+srv://${username}:${password}@dailyblog.qfqvpq0.mongodb.net/?retryWrites=true&w=majority&appName=DailyBlog`
    try{
        await mongoose.connect(URL, {});
        console.log('Database connected successfully')
    }catch(error){
        console.log(`Error connecting to database : `, error)
    }
}

export default Connection;
