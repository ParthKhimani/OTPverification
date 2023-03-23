const express = require('express');
const controller = require('../Controller/controller');

const router = express();

router.get('/registration', controller.registration);

router.post('/registration',controller.getData);

router.post('/login',controller.loginPost);

router.get('/login',controller.login);

router.post('/delete', controller.deleteData);

router.post('/update', controller.updateData);

router.post('/updated', controller.updatedData);

router.post('/forgotPassword', controller.forgotPassword);

router.post('/otpCheck', controller.otpCheck);

router.post('/otpSubmitted', controller.otpSubmitted);

router.post('/changedPassword', controller.changedPassword);

router.get('/account', controller.getHomePage);

module.exports = router;