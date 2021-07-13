"use strict";
var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
module.exports = function (passport) {
    /* GET login page. */
    router.get('/', function (req, res) {
        // 显示带有任何flash message的登录页(如果有的话)
        res.send('index', {});
    });
    /* GET Registration Page */
    router.get('/register', function (req, res) {
        res.render('register', {});
    });
    /* Handle Registration POST */
    router.post('/register', function (req, res) {
        Account.register(new Account({ username: req.body.username }), req.body.password, function (err, account) {
            if (err) {
                return res.render('register', { account: account });
            }
            passport.authenticate('local')(req, res, function () {
                res.redirect('/');
            });
        });
    });
    /* Handle Login POST */
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: true
    }));
    // As with any middleware it is quintessential to call next()
    // if the user is authenticated
    var isAuthenticated = function (req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    };
    /* GET Home Page */
    router.get('/home', isAuthenticated, function (req, res) {
        res.render('home', { user: req.user });
    });
    return router;
};
