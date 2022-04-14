var express = require('express');
var config = require('config');
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const user_md = require('../model/users');

var router = express.Router();
/*
toSlug = (str) => {
    str = str.toLowerCase();     
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');
    str = str.replace(/([^0-9a-z-\s])/g, '');
    str = str.replace(/(\s+)/g, '-');
    str = str.replace(/^-+/g, '');
    str = str.replace(/-+$/g, '');
    return str;
}

sendMail = async (user) => {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9);
    let url =`https://app-chat-online.herokuapp.com/users/api/auth/verification/verify-account/${uniqueSuffix}/${toSlug(user.full_name)}-${user._id}.html`;

    const msg = {
        to: user.email, 
        from: config.get('email.userAd'),
        subject: 'Verify email.',
        html: `<div style="text-align:center;color:brown;"><h1>Welcome ${user.full_name}.</h1><a href="${url}">Verify now.</a></div>`,
    }
    return await sgMail.send(msg);
}


sendMailForgotPass = async (user) => {
    let url =`https://app-chat-online.herokuapp.com/users/forgot-password`;

    const msg = {
        to: user.email, 
        from: config.get('email.userAd'),
        subject: 'Forgot password.',
        html: `<div style="text-align:center;color:brown;"><h1>Welcome ${user.full_name}.</h1><a href="${url}">Forgot password now.</a></div>`,
    }
    return await sgMail.send(msg);
}

sendMailAd = async (user) => {
    const msg = {
        to: config.get('email.userAc'), 
        from: config.get('email.userAd'), 
        subject: 'New account sign up.',
        html: `<div style="text-align:center;color:brown;">
                    <h1>Account sign up.</h1>
                    <h4>Name: ${user.full_name}</h4>
                    <h4>Email: ${user.email}</h4>
                </div>`,
    }
    return await sgMail.send(msg);
}
*/
router.get("/sign-in",(req,res) => {
    res.render('signin');
});
/*
router.post("/sign-in",(req,res) => {
    let user = req.body.user;
    user_md.userLogin(user.email).then(result => {
        if(result === null){
            res.json({"message":"Email or Password wrong","statusCode":404});
        }
        else{
            if(result.active === false){
                sendMail(result).catch(console.error);
                res.json({"message":"Account un active","statusCode":404});
            }
            else if(result.password !== user.password){
                res.json({"message":"Email or Password wrong","statusCode":404});
            }
            else{
                req.session.userLogin = result;
                res.json({"user": result,"statusCode":200});
            }
        }
    });
});
*/
router.post("/sign-in-google",(req,res) => {
    let user = req.body.user;
    user_md.userLogin(user.email).then(result => {
        if(result === null){
            user_md.addNewUser(req.body.user).then(result => {
                if(result._id){
                    req.session.userLogin = result;
                    res.json({"user": result,"statusCode":200});
                }
                else{
                    res.json({"message":"Sign in failed","statusCode":500});
                }
            });
        }
        else{
            req.session.userLogin = result;
            res.json({"user": result,"statusCode":200});
        }
    });
});

router.get("/sign-out",(req,res) => {
    req.session.userLogin = null;
    res.redirect('/');
});
/*
router.get("/forgot-password",(req,res) => {
    res.render('forgotpass');
});

router.post("/forgot-password",(req,res) => {
    let user = req.body.user;
    user_md.userLogin(user.email).then(result => {
        if(result === null){
            res.json({"message":"Email not found","statusCode":404});
        }
        else{
            result.password = user.password;
            user_md.updatePass(result).then(data => {
                if(data){
                    res.sendStatus(200);
                } 
            }).catch(error => {
                res.json({"message":error,"statusCode":500});
            });
        }
    });
    
});
*/
router.get('/api/auth/verification/verify-account/*/*-:idUser.html', (req,res) => {
    user_md.verifyEmail(req.params.idUser).then(result => {
        if(result){
            res.render('success');
        }
    }).catch(err => {
        res.send(err);
    });
});

module.exports = router;