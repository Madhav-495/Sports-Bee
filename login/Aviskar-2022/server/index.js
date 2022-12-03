const express = require('express');
const mongoose = require('mongoose');
const Bodyparser = require('body-parser');
const session = require('express-session');
const mongoDBsesion = require('connect-mongodb-session')(session);
const hbs = require('hbs');
const bcrypt = require('bcryptjs');
const cron=require('node-cron');
const nodemailer = require('nodemailer');
const path = require('path');
const findOrCreate = require("mongoose-findorcreate");
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const app = express();
const passport = require('passport');
const { parseArgs } = require('util');
const { nextTick } = require('process');
const { admin } = require('googleapis/build/src/apis/admin');
const filepath = path.join(__dirname, '..', '../views');
app.set('view engine', 'hbs');
app.set("views", filepath);
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
mongoose.connect('mongodb://localhost:27017/Signupdata', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

});

const store = new mongoDBsesion({
    uri: 'mongodb://localhost:27017/Signupdata',
    collection: 'mysessions'
})
app.use(session({
    secret: 'SECRET',
    resave: false,
    saveUnitialized: false,
    store: store,
}));
app.use(passport.initialize());
app.use(passport.session());
// hbs.registerPartials(path.join())





// console.log(path.join(__dirname,'../public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(Bodyparser.json());
app.use(Bodyparser.urlencoded({ extended: false }));
app.use('/login', express.static(path.join(__dirname, '../public')));
app.use("/stats", express.static(path.join(__dirname, '..', '..', '..', '/new')));
app.use('/calendar', express.static(path.join(__dirname, '..', '..', '..', '/calendar')));
app.use('/teampage/INDIA', express.static(path.join(__dirname, '..', '..', '..', '/forms')));
app.use('/forgotpassowrd', express.static(path.join()))
app.use('/acess', express.static(path.join(__dirname, '..', '..', '..', '/acess/acess.html')));
// connecting to google calendar api

// defining stats sechma
const adminSchema = new mongoose.Schema({
    Username: {
        type: String,
    },
    Password: {
        type: String,
    },
})
// defining trivia schema
const Triviaschema = new mongoose.Schema({
    heading: {
        type: String,
    },
    description: {
        type: String,
    }


})
const triviadata = mongoose.model('triviadata', Triviaschema);
// definig stats schema
const statsschema = new mongoose.Schema({
    image: {
        type: String,
    },
    testmatches: {
        type: String

    },
    testruns: {
        type: String

    },
    testaverage: {
        type: String,
    },
    odimatches: {
        type: String

    },
    odiruns: {
        type: String

    },
    odiaverage: {
        type: String,
    },
    tmatches: {
        type: String

    },
    truns: {
        type: String

    },
    taverage: {
        type: String,
    }

})
// database of calendar
const matchessechma = new mongoose.Schema({
    name1: String,
    name2: String,
    logo1: String,
    logo2: String,
    Venue: String,
    time: String,
    date:String,

})
const Sechdule = mongoose.model('sechdule', matchessechma);
const statsdata = mongoose.model('statsdata', statsschema);
const desSchema = new mongoose.Schema({
    description: {
        type: String,
    },
    team: {
        type: String,
    }
})
const desdata = mongoose.model('desdata', desSchema);
const adminacessschema = new mongoose.Schema({
    acess: {
        type: String,
    },
    name: {
        type: String
    }
})
const adminacess = mongoose.model('adminacess', adminacessschema);
const signupschema = new mongoose.Schema({
    username: {
        type: String,

    },
    phonenumber: {
        type: String,


    },
    email: {
        type: String,

        unique: true,
    },
    password: {
        type: String,


    },
    confirmpassword: {
        type: String,



    },
    facebookId: {
        type: String,
    },
    admin: {
        type: String,
    }

})
// signupschema.pre("save", async function (next) {
//     this.password = await bcrypt.hash(this.password, 10);
    

//     next();
// })
const admindata = mongoose.model('admin', adminSchema);
var adminauth = 0;
signupschema.plugin(findOrCreate);
const signupdata = mongoose.model('signup', signupschema);
passport.use(new FacebookStrategy({
    clientID: "491174829698518",
    clientSecret: "3511600d3d8f694d7859f80f219dc257",
    callbackURL: "http://localhost:5000/facebook/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        signupdata.findOrCreate({ facebookId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));
passport.use(new GoogleStrategy({
    clientID: "875369582002-cmkv65bnphtmo6s69l17nub6j374fmqk.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:5000/auth/google/callback",
    scope: ["profile", "email"],
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
        signupdata.findOrCreate({ googleId: profile.id }, function (err, user) {
            return done(err, user);
        });
    }
));
app.get('/auth/facebook',
    passport.authenticate('facebook'));

app.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login', successRedirect: '/' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

app.get('/auth/google',
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
    }
    ));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/auth/google/failure'
    }));
app.get('/logout',function(req,res){
    res.redirect('/');
    req.session.destroy();
    
})
app.get('/', function (req, res) {
    
    res.render('home',{parameter:req.session.user});
})
const newsSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    descript: {
        type: String,
    }
})
const newsdata = mongoose.model('newsdata', newsSchema);



app.post('/signup', function (req, res) {
    try {
        let username = req.body.username;
        let email = req.body.email;
        let phonenumber = req.body.email;
        let password = req.body.password;
        let confirmpassword = req.body.cnfpassword;
        const signup = new signupdata({
            username: username,
            email: email,
            phonenumber: phonenumber,
            password: password,
            confirmpassword: confirmpassword

        })
        signup.save(function (err) {
            if (err) {
                res.send("your email is already register");
            } else {
                res.redirect('/login');
            }
        });





    } catch (error) {
        res.status(400).send(error);

    }
})

app.post('/login', async (req, res) => {
    try {
        let email = req.body.email2;
        let password = req.body.password2;

        let useremail = await signupdata.findOne({ email: email });
        

        if (useremail.password===password) {

            if (useremail.admin == "acess") {
                req.session.admin = useremail.admin;
            }
            req.session.user=true;
            res.redirect('/');
        } else {
            res.send("wrong email or password combination");

        }
    }


    catch (error) {
        res.status(400).send(error);

    }
})

const isauth = (req, res, next) => {
    try {
        if (req.session.admin) {
            
        } else {
            res.redirect('/teampage');
        } next();
    } catch (error) {
        console.log(error);
    }

}

app.get('/login', function (req, res) {

    res.sendFile(path.join(__dirname, '..', 'public', 'hello.html'));
})
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await admin.findOne(
                {
                    username: "email2",
                    password: "password"
                }, function (err, user) {
                    if (err) { return done(err); }
                    if (!user) { return done(null, false); }
                    if (user.password != password) { return done(null, false); }
                    return done(null, user);
                });
        } catch (error) {
            return done(error, false);
        }
    }
));
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

//   Setting up player stats routes
app.get('/stats', function (req, res) {


    res.sendFile(path.join(__dirname, '..', '..', '..', '/new/hello1.html'));
})
app.get('/calendar', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', '/calendar/index.html'));
})
app.get('/sechdule', async (req, res) => {
    const sechduled = await Sechdule.find();

    res.send(sechduled);

})
// UNDER MAINTAINANCE
app.post('/teampage/INDIA', async (req, res) => {
    adminacess.findOne({ acess: "1", name: "India" }, function (err) {
        if (err) {
            console.log("you are not the admin of the group");
        }
        else {

            desdata.findOneAndUpdate({ team: "INDIA" }, { description: req.body.description }, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    // res.send("Contents are added successfully");
                    res.redirect('/teampage');
                }

            })
        }

    })






})

app.get('/teampage', async (req, res) => {

    desdata.findOne({ team: "INDIA" }, async (err, data) => {
        try {

            let params = {
                descript: data.description,
            }
            res.render('index', params)
        }
        catch (err) {
            console.log(err);
        }

    })

    // res.sendFile(path.join(__dirname,'..','..','..','/team_page/teampage.html'));


})



app.get('/forgotpassword', function (req, res) {
    res.sendFile(path.join(__dirname, '..', '..', '..', '/forgetpage/index.html'));
})
app.post('/forgotpassword', function (req, res) {
    signupdata.findOne({ email: req.body.email }, function (data, err) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'madhavagrawal842@gmail.com',
                pass: 'oovcykkthoilvadd'
            }
        });
        const link = "http://localhost:5000/forget-password"
        var mailOptions = {
            from: 'madhavagrawal842@gmail.com',
            to: req.body.user_email,
            subject: 'Sports-Bee forgot passowrd link',
            text: link
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
        });
        if (err) {
            res.send("please sign in first to acess the website");
        }
        res.send("link is sent to your email id");
    })




})
app.get('/forget-password', function (req, res) {
    res.send("SITE UNDER MAINTAINANCE");
})

app.get('/teampage/INDIA', isauth, (req, res) => {
    // creating a check to add data for the admin

    res.sendFile(path.join(__dirname, '..', '..', '..', '/forms/form.html'));
})


// creating a stats route
app.get('/stats/player', async (req, res) => {
    try {
        const playerdetail = await statsdata.find();
        res.send(playerdetail);

    }
    catch (err) {
        console.log(err);
    }
})



// creating a page for trivia

app.get('/trivias', async (req, res) => {
    const keys = await triviadata.find({})


    res.render('trivia', { data: keys });




})
// creating discuss and news page
app.get('/discuss', async (req, res)=> {

    const newsinfo = await newsdata.find();
    
    
    // console.log(news[0].descript);
    res.render('discuss', {news:newsinfo});

})

// making a remiander features

// cron.schedule('*/5 * * * * *',async(req,res)=>{
//     const data=await Sechdule.find()
//     const mailist=await signupdata.find();
    
//     const info2=[];
//     const info=mailist.forEach(function(curr){
//         info2.push(curr.email);
//     })
    

    
    
//     data.forEach(function(currentval){
//         let date=new Date(currentval.date);
        
//         if(date.setHours(0,0,0,0)==new Date().setHours(0,0,0,0)){
            
//              var transporter = nodemailer.createTransport({
//                 service: 'gmail',
//                 auth: {
//                   user: 'madhavagrawal842@gmail.com',
//                   pass: 'oovcykkthoilvadd'
//                 }
//               });
            
//             console.log(mailist.email);              
//               var mailOptions = {
//                 from: 'madhavagrawal842@gmail.com',
//                 to:info2,
//                 subject: 'SPORTS-Bee',
//                 text: 'match is sechduled at time '+currentval.time,
//               };
              
//               transporter.sendMail(mailOptions, function(error, info){
//                 if (error) {
//                   console.log(error);
//                 } 
//               });
//         }
//     },{
//         scheduled: true,
//         timezone: "Asia/Kolkata"
//     })

// })
app.listen(5000, function () {
    console.log("server is running on the port 5000");
})
