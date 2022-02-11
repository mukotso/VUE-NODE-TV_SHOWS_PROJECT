const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.login =async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        let findUser = await User.findOne({where: {email: email}});


        if (!findUser) {
            return res.status(404).json({
                message: ' a user with the email address does not exist'
            })
        }
        let comparePassword = await bcrypt.compare(password, findUser.password);

        if (!comparePassword) {
            return res.status(401).json({
                message: 'Your credentials did not match'
            })
        }

        const token = jwt.sign({
            email: findUser.email,
            userId: findUser.id
        }, 'secret')
         let loggedInUser=findUser;
        delete loggedInUser['password'];

        return res.status(200).json({
            token,
            loggedInUser
        })
    } catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }

}


exports.register =async (req, res, next) => {
    const userData = req.body;


    let hashedPassword = await bcrypt.hashSync(req.body.password, 2);
    let findEmail = await User.findOne({where: {email: userData.email}});
    if(findEmail){
        return res.status(500).json({
            'message': "Email already registered to the system"
        })
    }
    try {
        User.create({
            'name': userData.name,
            'tel': userData.tel,
            'email': userData.email,
            'password': hashedPassword,
            'role_id': 2,
            'status': 'active',
        })
        return res.status(200).json({
            'message': "Registration Successfull"
        })
    } catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }

}