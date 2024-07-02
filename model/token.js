import mongoose from "mongoose";

const TokenSchema = mongoose.Schema({
    token: {
        type: String,
        unique: true,
        require: true
    }
});

const Token = mongoose.model('token', TokenSchema);
export default  Token;