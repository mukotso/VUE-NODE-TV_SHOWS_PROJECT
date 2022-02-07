const nodemailer = require("nodemailer");
exports.sendNotification = async (req, res) => {

    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "417be0f9409dbb",
            pass: "9a09d4efc330dd"
        }
    });



    var mailOptions = {
        from: '"Balozi Movies and Shows Team" <balozimovies@example.com>',
        to: 'subscribers@example.com',
        subject: 'LACASA SEASON  COMING SOON'
    };
    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            // return consolele.log(error);
            return res.status(500).json({
                'message': error.message
            })
        }
        return res.status(200).json({
            'message': 'Notifications sent to subscribers'
        })
    });

}