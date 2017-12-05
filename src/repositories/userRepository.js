'use strict';

const _ = require('lodash');
const User = require('../models/userModel').User;
const MongoService = require('../services/mongoService');

class UserRepository {

    * findOne(user) {
        return yield User.findById(user._id);
    }

    * find(name, enrolment) {
        let $or = [];
        if (name) {
            $or.push({
                'name': MongoService.regexExpression(name)
            });
        }

        if (enrolment) {
            $or.push({
                'enrolment': MongoService.regexExpression(enrolment)
            });
        }
        return yield User.find({
            $or: $or,
            status: true
        }).select('-password')
            .sort({ name: 1 })
            .lean();
    }

    * findAll() {
        return yield User.find()
            .select('-password')
            .lean();
    }

    * findOneByEmail(email) {
        return yield User.findOne({
            email
        })
        .select('name email photo -_id')
        .lean();
    }

    * findOneByEnrolment(enrolment) {
        return yield User.findOne({
            enrolment
        });
    }

    * create(user) {
        return yield User.create(user);
    }

    * changeUserStatus(user, status) {
        user.status = status;
        yield user.save();

        let result = yield User.findById(user._id).lean();
        delete result.password;
        return result;
    }

    * update(newUser) {
        let user = yield User.findById(newUser._id);

        if (!user)
            throw new Error("usuario não encontrado para fazer alteração");

        if (newUser.hasOwnProperty('password'))
            user.password = newUser.password;
        user.status = newUser.status;
        user.isFullRegister = newUser.status;
        user.phone = newUser.phone;
        user.email = newUser.email;
        user.photo = newUser.photo;
        yield user.save();

        let result = yield User.findById(newUser._id).lean();
        delete result.password;
        return result;
    }

}

module.exports = new UserRepository();
