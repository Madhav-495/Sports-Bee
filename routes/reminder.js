const express = require('express');
const router = express.Router();
require("dotenv").config();

const cron = require('node-cron');
router.get('/', (req, res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'madhavagrawal842@gmail.com',
            pass: 'oovcykkthoilvadd'
        }
    });

    
    var mailOptions = {
        from: 'madhavagrawal842@gmail.com',
        to: info2,
        subject: 'SPORTS-Bee',
        text: 'match is sechduled at time ' + currentval.time,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
    });

}
},
{
        scheduled: true,
        timezone: "Asia/Kolkata"
    })
})



    module.exports = router;