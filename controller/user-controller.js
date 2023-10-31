import User from '../model/user.js'
import token from '../model/token.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const signupUser = async (req, res) => {
    try {
        // console.log(req.body)
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = {
            username: req.body.username,
            name: req.body.name,
            password: hashedPassword
        };

        const newuser = new User(user)
        await newuser.save();
        return res.status(200).json({ msh: "Signup Successfull" })
    } catch (error) {
        return res.status(500).json({ msg: 'Error while sighup the user' })
    }
}


export const loginUser = async (req, res) => {

    let user = await User.findOne({ username: req.body.username });

    if (!user) {
        return res.status(400).json({ msg: 'User does not match' });
    }

    try {
        let  match = await bcrypt.compare(req.body.password,user.password)
        if(match){
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
            
            const newToken = new Token({ token: refreshToken });
            await newToken.save();
        
            response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken,name: user.name, username: user.username });
        }
        response.status(400).json({ msg: 'Password does not match' })
    } catch (error) {
        response.status(500).json({ msg: 'error while login the user' })
    }
}