const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');


//@desc Register New User
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req,res) => {
    const { name, email, password, phone } = req.body

    //checking is fields are empty
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    //checking if email exists
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    //Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
        phone: phone
    });

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid user data');
    }
})

//@desc Authenticate User
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req,res) => {
    const { email, password } = req.body;
    //check for user email
    const user = await User.findOne({email});
    //compare passwords
    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            message: 'Login successful', 
            user: {
                _id: user.id,
                user: user.name,
                email: user.email,
                phone: user.phone,
                token: generateToken(user.id)
            }
    });
    } else {
        res.status(400).json({message: 'Invalid credentials'})
    }

})

//@desc Get user data
//@route GET /api/user/me
//@access Private
const getMe = asyncHandler(async (req,res) => {
    const {_id,name, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email
    })
})


//generate token

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn:'30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}