// user controller

const User = require('../models/user-model')
const jwt = require('jsonwebtoken')
const HttpError = require('../models/http-error')

const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
} 

// get users
const getUsers = async (req, res, next) =>{

    res.json();

};

// login user 
const loginUser = async (req,res, next) => {

    const {Email, Password} = req.body

    try {

        const user = await User.login(Email, Password);

        // create token
        // this will only allow users to view certain aspects of the website

        /*
        TOKEN EXAMPLE
        abc.123.def
        abc represents the header
        123 represents the payload
        def represents the signature
        
        */

        console.log("User response from login:",user);

        const user_id = user._id

        const token = createToken(user_id)

    
        res.status(200).json({ Email, token, user_id })


    } catch (error) {

      console.error('Error signing up user:', error);

      res.status(500).json({ error: error.message });
    
    }
    

}

// signup user
const signupUser = async (req, res, next) => {

    const { Email, Password, adminCode } = req.body;

    try {

        var isAdmin = false;

        if(adminCode === "secretcode123"){
            isAdmin = true;
        }

        
        const user = await User.signup(Email, Password, isAdmin);
        

        console.log(user.isAdmin)

        // create token

        
        const user_id = user._id

        const token = createToken(user_id)

        res.status(200).json({ Email, token, user_id })

    } catch (error) {

      console.error('Error signing up user:', error);

      res.status(500).json({ error: error.message });
    
    }

};

module.exports = {getUsers, signupUser, loginUser};
