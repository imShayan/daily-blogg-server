import UserModel from "../model/user.js";
import Token from "../model/token.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();


export const SignUpUser = async (request ,response) => {
    try{
        const hashedPassword = await bcrypt.hash(request.body.password ,16);
        const user = {
            username: request.body.username,
            email: request.body.email,
            password: hashedPassword,
        };

        const newUser = new UserModel(user);
        await newUser.save();
        response.status(200).json({msg:`Added user to database ${newUser}`})
    }catch(error){
        console.log(`Error while added user to database:`, error)
        response.status(500).json({msg: `Internal Server Error`});
    }

}

export const LoginUser = async (request, response) => {
    const user = await UserModel.findOne({username: request.body.username});
    if(!user){
        response.status(400).json({msg: 'User does not exist'})
    }
    try{
        
        let match = bcrypt.compare(request.body.password, user.password);
        if(match){
            const accessToken = await jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn: '15m'} );
            const refreshToken = await jwt.sign(user.toJSON(), process.env.REFRESH_TOKEN);

            const newToken = new Token({token: refreshToken});
            await newToken.save();
            return response.status(200).json({accessToken: accessToken, refreshToken: refreshToken, username: user.username})
            
        }else{
            return response.status(400).json({msg: 'Password does not match'})
        }
    }catch(err){
        console.log('Error while login User', err);
        return response.status(500).json({msg: 'Internal Server error'})
    }
}