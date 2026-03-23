const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendWelcomeEmail } = require('../services/emailService');

const register = async (req, res)=>{
    try{
        const {name,email,password} = req.body;
        if (!name || !email || !password){
            return res.status(400).json({ message: 'Name, email and password are required' });
        }
        const existingUser = await User.findOne({
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }
        })

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        );

        await sendWelcomeEmail(name, email);

        res.status(201).json({
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    }catch(error){
        res.status(500).json({ message: 'Server error' });
    }
};

const login = async (req, res)=>{
    try{
        const {email, password} = req.body;
        if (!email || !password){
            return res.status(400).json({ message: 'Email and password are required' });
        };
        const user = await User.findOne({ email });
        if (!user){
            return res.status(400).json({ message: 'Invalid email' });
        };

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(400).json({ message: 'Invalid password' });
        };

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    }catch(error){
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { register, login };