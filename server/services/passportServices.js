const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("./../models/UserModel");

var extractCookieFn = function (req) {
  let jwt = null;
  console.log("req.headers", req.headers.authorization);
  // console.log("req.cookies", req.cookies);
  // if (req && req.cookies["jwt"]) {
  //   console.log("all cokkies present now are", req.cookies);
  //   jwt = req.cookies["jwt"];
  //   console.log("cookies from passport-jwt callback", req.cookies["jwt"]);
  //   return jwt;
  // }
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    //THE JAVASCRIPT IS with let and const is BLOCK SCOPED, NOT FUNCTION SCOPED
    console.log("oh yeahhh");
    jwt = req.headers.authorization.split(" ")[1];
    console.log("jwt is ", jwt);
    return jwt;
  }
  console.log("jwt is ", jwt);
  return jwt;
};
passport.use(
  new JwtStrategy(
    {
      // As the token can be either in the form of a cookie or a auth header, we use a custom token extractor fn
      jwtFromRequest: extractCookieFn,
      secretOrKey: process.env.JWT_SECRET,
      algorithms: ["HS256"],
      // passReqToCallback: true,
    },
    (jwtPayload, cb) => {
      // NOTE: As we are using a custom callback function, Here in the verify callback, we will only
      // get the decoded payload and pass it onto the custom callback function
      cb(null, jwtPayload);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
      proxy: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      try {
        if (!req.user) {
          // Case where the user signsup/ logsin  for the first time
          console.log("there is no req.user present");
          console.log(profile, accessToken);

          const user = await User.findOne({ googleId: profile.id });
          if (!user) {
            // Case where the user signs up for the first time
            const newUser = await User.create({
              name: profile.displayName,
              // NOTE: Make sure to only save the verified email address
              // email: profile.emails[0].value,
              avatar: profile.photos[0].value,
              googleId: profile.id,
            });
            console.log("A new user is created and saved onto the DB");
            return cb(null, { user: newUser, provider: "google" });
          }
          console.log("An existing user is trying to log in");
          return cb(null, { user: user, provider: "google" });
        } else {
          // the case where, he is trying to connect with other account
          // NOTE: there is some inconsistency while logging with other google account, when the cookie is already present.
          // It is replacing the googleId, which must not be done
          console.log(
            "The user is already authenticated, but trying to add the google details to his user profile"
          );

          const user = await User.findById(req.user._id);

          if (!user.googleId) {
            const updatedUser = await User.findByIdAndUpdate(
              req.user._id,
              {
                googleId: profile.id,
              },
              {
                new: true,
                runValidators: true,
              }
            );
            console.log(
              "Added the googleid to the existing authenticated user"
            );
            return cb(null, { user: updatedUser, provider: "google" });
          }
          console.log("Trying to replace the already present googleID");
          // throw new Error(
          //   "Trying to change the googleId of an existing authenticated user"
          // );
          cb(error, false);
        }
      } catch (error) {
        cb(error, false);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      try {
        if (!req.user) {
          // Case where the user signsup/ logsin  for the first time
          console.log("there is no req.user present");
          console.log(profile, accessToken);

          const user = await User.findOne({ githubId: profile.id });
          if (!user) {
            // Case where the user signs up for the first time
            const newUser = await User.create({
              name: profile.displayName,
              // NOTE: Make sure to only save the verified email address
              // email: profile.profileUrl,
              avatar: profile.photos[0].value,
              githubId: profile.id,
            });
            console.log("A new user is created and saved onto the DB");
            return cb(null, { user: newUser, provider: "github" });
          }
          console.log("An existing user is trying to log in");
          return cb(null, { user: user, provider: "github" });
        } else {
          // the case where, he is trying to connect with other account
          // NOTE: there is some inconsistency while logging with other google account, when the cookie is already present.
          // It is replacing the googleId, which must not be done
          console.log(
            "The user is already authenticated, but trying to add the github details to his user profile"
          );

          const user = await User.findById(req.user._id);

          if (!user.githubId) {
            const updatedUser = await User.findByIdAndUpdate(
              req.user._id,
              {
                githubId: profile.id,
              },
              {
                new: true,
                runValidators: true,
              }
            );
            console.log(
              "Added the githubId to the existing authenticated user"
            );
            return cb(null, { user: updatedUser, provider: "github" });
          }
          console.log("Trying to replace the already present githubId");
          // throw new Error(
          //   "Trying to change the githubId of an existing authenticated user"
          // );
          cb(error, false);
        }
      } catch (error) {
        cb(error, false);
      }
    }
  )
);

// cant use facbook right now
// passport.use(
//   new facebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//       callbackURL: process.env.FACEBOOK_CALLBACK_URL,
//       passReqToCallback: true,
//     },
//     (req, accessToken, refreshToken, profile, cb) => {
//       console.log(profile, accessToken);
//       cb(null, profile);
//     }
//   )
// );

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      try {
        if (!req.user) {
          // Case where the user signsup/ logsin  for the first time
          console.log("there is no req.user present");
          console.log(profile, accessToken);

          const user = await User.findOne({ facebookId: profile.id });
          if (!user) {
            // Case where the user signs up for the first time
            const newUser = await User.create({
              name: profile.displayName,
              // NOTE: Make sure to only save the verified email address
              // email: profile.profileUrl,
              avatar: profile.photos[0].value,
              facebookId: profile.id,
            });
            console.log("A new user is created and saved onto the DB");
            return cb(null, { user: newUser, provider: "facebook" });
          }
          console.log("An existing user is trying to log in");
          return cb(null, { user: user, provider: "facebook" });
        } else {
          // the case where, he is trying to connect with other account
          // NOTE: there is some inconsistency while logging with other google account, when the cookie is already present.
          // It is replacing the googleId, which must not be done
          console.log(
            "The user is already authenticated, but trying to add the facebook details to his user profile"
          );

          const user = await User.findById(req.user._id);

          if (!user.facebookId) {
            const updatedUser = await User.findByIdAndUpdate(
              req.user._id,
              {
                facebookId: profile.id,
              },
              {
                new: true,
                runValidators: true,
              }
            );
            console.log(
              "Added the facebookId to the existing authenticated user"
            );
            return cb(null, { user: updatedUser, provider: "facebook" });
          }
          console.log("Trying to replace the already present facebookId");
          // throw new Error(
          //   "Trying to change the facebookId of an existing authenticated user"
          // );
          cb(error, false);
        }
      } catch (error) {
        cb(error, false);
      }
    }
  )
);
