const jestGlobals = require('@jest/globals');
const jwt = require('jsonwebtoken');

const isAuth = require('./is-auth');

const { describe, expect, jest, test } = jestGlobals;

const verifyFn = jest.fn().mockReturnValue({ userId: 'abc' });

describe('Auth middleware', function () {
  test('should throw an error if no authorization header is present', function () {
    const req = {
      get: function () {
        return null;
      },
    };

    const isAuthFn = function () {
      return isAuth(req, {}, () => {});
    };

    expect(isAuthFn).toThrow('Not authenticated.');
  });

  test('should throw an error if the authorization header is only one string', function () {
    const req = {
      get: function (headerName) {
        return 'xyz';
      },
    };

    const isAuthFn = function () {
      return isAuth(req, {}, () => {});
    };

    expect(isAuthFn).toThrow();
  });

  test('should throw an error if the token cannot be verified', function () {
    const req = {
      get: function (headerName) {
        return 'Bearer xyz';
      },
    };

    const isAuthFn = function () {
      return isAuth(req, {}, () => {});
    };

    expect(isAuthFn).toThrow();
  });

  test('should yield a userId after decoding the token', function () {
    jwt.verify = verifyFn;
    const req = {
      get: function (headerName) {
        return 'Bearer xyz';
      },
    };

    isAuth(req, {}, () => {});

    expect(verifyFn).toHaveBeenCalled();

    expect(req).toHaveProperty('userId');
    expect(req).toHaveProperty('userId', 'abc');

    verifyFn.mockRestore();
  });
});
