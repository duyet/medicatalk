/**
 * Passport configuration file where you should configure strategies
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var EXPIRES_IN = '48h';
var SECRET = process.env.tokenSecret || '4ukI0uIVnB3iI1yxj646fVX1EAtl20J5F7Trtwe7OMduyetdev';
var ALGORITHM = 'HS256';
var ISSUER = 'medicatalk.com';
var AUDIENCE = 'medicatalk.com';
 
/**
 * Configuration object for local strategy
 */
var LOCAL_STRATEGY_CONFIG = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: false
};
 
/**
 * Configuration object for JWT strategy
 */
var JWT_STRATEGY_CONFIG = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  authScheme: 'MEDICA',
  tokenBodyField: 'access_token',
  secretOrKey: SECRET,
  issuer : ISSUER,
  audience: AUDIENCE,
  passReqToCallback: true
};
 
/**
 * Triggers when user authenticates via local strategy
 */
function _onLocalStrategyAuth(email, password, next) {
  User.findOne({email: email})
    .exec(function (error, user) {
      if (error) return next(error, false, {});
 
      if (!user) return next(null, false, {
        code: 'E_USER_NOT_FOUND',
        message: email + ' is not found'
      });
 
      // TODO: replace with new cipher service type
      if (!CipherService.comparePassword(password, user))
        return next(null, false, {
          code: 'E_WRONG_PASSWORD',
          message: 'Password is wrong'
        });
 
      return next(null, user, {});
    });
}
 
/**
 * Triggers when user authenticates via JWT strategy
 */
function _onJwtStrategyAuth(req /* TODO: Fix */, payload, next) {
  var user = payload.user;
  return next(null, user, {});
}
 
passport.use(
  new LocalStrategy(LOCAL_STRATEGY_CONFIG, _onLocalStrategyAuth));
passport.use(
  new JwtStrategy(JWT_STRATEGY_CONFIG, _onJwtStrategyAuth));
 
module.exports.jwtSettings = {
  expiresIn: EXPIRES_IN,
  secret: SECRET,
  algorithm : ALGORITHM,
  issuer : ISSUER,
  audience : AUDIENCE
};