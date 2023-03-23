const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const user = require('../Model/users');
const path = require('path');
const nodemailer = require('nodemailer');

exports.registration = (req, res, next) => {
    res.render('account1.ejs')
}

exports.getData = (req, res, next) => {
    var name = req.body.name;
    var email = req.body.email;
    var contactNumber = req.body.contactNumber;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;
    var dateOfBirth = req.body.dateOfBirth;
    var country = req.body.country;

    var err = false;

    var passCheck = password.localeCompare(confirmPassword);

    if (passCheck != 0 && err == false) {
        err = true;
        res.render('account1', { passError: "*Password Doen't matched" });
    }
    if (err == false) {
        user.findOne({
            where: {
                emailId: email
            }
        })
            .then(result => {
                if (result != null) {
                    res.render('account1', { emailError: "*Email already exist!" });
                    err = true;
                }
                else {
                    user.create({
                        name: name,
                        emailId: email,
                        contactNumber: contactNumber,
                        password: password,
                        confirmPassword: confirmPassword,
                        dateOfBirth: dateOfBirth,
                        country: country
                    }).then(result => {
                        console.log(result);
                        res.render('account');

                    }).catch((error) => {
                        console.error('Failed to create a new record : ', error);
                    });
                }
            })
            .catch(err => console.log(err))
    }
}

exports.login = (req, res, next) => {
    res.render('account.ejs')
}

exports.loginPost = (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;
    user.findOne({
        where: {
            emailId: email,
            password: password
        }
    }).then((result) => {
        if (result != null) {
            user.findAll()
                .then(result => {
                    var user = result
                    res.render('about', {
                        data: user
                    })
                })
        }
        else (
            res.sendFile(path.join(__dirname, '../', 'views', '404-page.html'))
        )
    })
}

exports.deleteData = (req, res, next) => {
    var delIndex = req.body.del;
    user.destroy({
        where: {
            id: delIndex
        }
    })
        .then(
            res.redirect('/account')
        )
}

exports.updateData = (req, res, next) => {
    var updIndex = req.body.upd;
    user.findOne({
        where: {
            id: updIndex
        },
    })
        .then(result => {
            res.render('account2', {
                data: result
            })
        })
}

exports.updatedData = (req, res, next) => {
    var updatedId = req.body.updated

    var name = req.body.name
    var email = req.body.email
    var contactNumber = req.body.contactNumber
    var password = req.body.password
    var confirmPassword = req.body.confirmPassword
    var dateOfBirth = req.body.dateOfBirth
    var country = req.body.country
    user.update({
        name: name,
        emailId: email,
        contactNumber: contactNumber,
        password: password,
        confirmPassword: confirmPassword,
        dateOfBirth: dateOfBirth,
        country: country
    },
        {
            where: {
                id: updatedId
            }
        })
        .then(
            res.redirect('account')
        )
}

var message = String(Math.floor((Math.random() * 10000) + 1));

exports.forgotPassword = (req, res, next) => {
    res.render('forgotPasswordLogin');
}
var otpCheck = false;
var email = 'email';

exports.otpCheck = (req, res, next) => {
    res.render('otpCheck');
    email = String(req.body.email)
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'parthkhimani48@gmail.com',
            pass: 'appKey'
        }
    });

    let mailDetails = {
        from: 'parthkhimani48@gmail.com',
        to: email,
        subject: 'OTP for verification',
        text: message
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent successfully');
        }
    });
}

exports.otpSubmitted = (req, res, next) => {
    var OTP = req.body.otp
    otpCheck = message.localeCompare(OTP);
    if (otpCheck == 0) {
        res.render('newPass')
    }
    else {
        res.sendFile(path.join(__dirname, '../', 'views', '404-page.html'))
    }
}

exports.changedPassword = (req, res, next) => {
    var password = req.body.password
    var confirmPassword = req.body.confirmPassword
    console.log(email)
    var passCheck = password.localeCompare(confirmPassword);
    if (passCheck != 0) {
        err = true;
        res.render('account1', { passError: "*Password Doen't matched" });
    }
    else {
        user.update(
            {
                password: password,
                confirmPassword: password
            },
            {
                where: {
                    emailId: email
                }
            }
        )
        res.redirect('account')
    }
}

exports.getHomePage = (req, res, next) => {
    res.render('account.ejs')
}