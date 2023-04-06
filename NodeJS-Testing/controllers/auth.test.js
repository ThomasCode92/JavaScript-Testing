const jestGlobals = require('@jest/globals');
const mongoose = require('mongoose');

const User = require('../models/user');
const authController = require('./auth');

const { afterAll, afterEach, beforeAll, describe, expect, jest, test } =
  jestGlobals;

const { getUserStatus, login } = authController;

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Auth Controller - login', function () {
  test('should throw an error if accessing the database fails', function () {
    jest.spyOn(User, 'findOne');

    const req = {
      body: { email: 'test@test.com', password: 'tester' },
    };

    login(req, {}, err => err).then(result => {
      expect(result).toBeInstanceOf(Error);
      expect(result).toHaveProperty('statusCode', 401);
    });
  });
});

describe('Auth Controller - getUserStatus', function () {
  let db;
  let userDoc;

  beforeAll(function (done) {
    mongoose
      .connect('mongodb://localhost:27017/messages-test')
      .then(connection => {
        db = connection;

        const user = new User({
          name: 'Test',
          email: 'test@test.com',
          password: 'tester',
        });

        return user.save();
      })
      .then(user => {
        userDoc = user;
        done();
      });
  });

  afterAll(() => {
    User.deleteMany({}).then(() => {
      db.disconnect();
    });
  });

  test('should send a response with a valid user status for an existing user', function () {
    const req = { userId: userDoc._id.toString() };
    const res = {
      statusCode: 500,
      userStatus: null,
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.userStatus = data.status;
      },
    };

    getUserStatus(req, res, () => {}).then(() => {
      expect(res.statusCode).toBe(200);
      expect(res.userStatus).toBe('I am new!');
    });
  });
});
