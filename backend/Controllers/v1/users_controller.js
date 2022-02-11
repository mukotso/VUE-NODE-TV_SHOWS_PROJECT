const user = require("../../models/user");
const bcrypt = require("bcrypt");
const genre = require("../../models/genre");

exports.createUser =async (req, res, next) => {
    const userData = req.body;
    try {

        let findEmail = await user.findOne({where: {email: userData.email}});
        if(findEmail) {
            return res.status(500).json({
                'message': "Email already registered to the system"
            })
        }

        // let randomPassword = createPassword(8);
        let randomPassword = 'user123456';
        let randomHashedPassword = bcrypt.hashSync(randomPassword, 2);
        user.create({
            'name': userData.name,
            'tel': userData.tel,
            'email': userData.email,
            'password': randomHashedPassword,
            'role_id': 2,
            'status': 'active',
        })

        return res.status(200).json({
            'message':'user created successfully', user:user
        })


    } catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }

}

function createPassword(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

exports.getUsers= async (req, res, next) => {
    try {
        // Find all users
        const users = await user.findAll();
        res.json(users);
    } catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }

}

exports.deleteUser=async (req, res) => {

    const id=req.params.id;
    try {
        await user.destroy(
            {
                where:{
                    id:id
                }
            }
        )
        res.send("User deleted successfully");

    }catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }
}