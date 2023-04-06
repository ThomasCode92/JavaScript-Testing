const jestGlobals = require('@jest/globals');
const mongoose = require('mongoose');

const User = require('../models/user');
const Post = require('../models/post');
const FeedController = require('./feed');

const { afterAll, afterEach, beforeAll, describe, expect, jest, test } =
  jestGlobals;

const { createPost } = FeedController;

describe('Feed Controller', function () {
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

  afterAll(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});

    db.disconnect();
  });

  test('should add a created post to the posts of the creator', function (done) {
    const req = {
      body: { title: 'Test Post', content: 'A Test Post' },
      file: { path: 'abc' },
      userId: userDoc._id.toString(),
    };
    const res = {
      status: function () {
        return this;
      },
      json: function () {},
    };

    createPost(req, res, () => {}).then(savedUser => {
      expect(savedUser).toHaveProperty('posts');
      expect(savedUser.posts).toHaveLength(1);

      done();
    });
  });
});
