const jwtDecoder = require("jwt-decode");

const Key = require("../models/keyModel");
const User = require('../models/userModel');
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createKey = catchAsync(async (req, res, next) => { 
    const id = jwtDecoder(req.cookies.jwt).id;

    const newKey = await Key.create({
    name: req.body.keyName,
    user: id,
    passphrase: req.body.passphrase,
    passphraseConfirm: req.body.passphraseConfirm,
  });

  res.status(201).json({ status: "success" });
});

exports.getAllKey = catchAsync(async (req, res, next) => {
    const id = jwtDecoder(req.cookies.jwt).id;

    const key = await Key.find({user:id});

    if(!key) {
        next(new AppError('You dont have a key yet, just create one'), 404);
    }

    res.status(200).json({
        key
    })
});