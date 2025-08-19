// config/passport.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const initPassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL, // e.g. http://localhost:8000/api/auth/google/callback
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
          const name = profile.displayName || profile.name?.givenName || "User";
          if (!email) return done(new Error("Google email not found"));

          let user = await User.findOne({ email });

          if (!user) {
            // random passwd (not used), just to satisfy schema
            const hash = await bcrypt.hash(profile.id, 10);
            user = await User.create({
              name,
              email,
              password: hash,
              role: "user",
            });
          }

          return done(null, user); // will be available as req.user
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // if you ever use sessions later:
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (e) {
      done(e);
    }
  });

  return passport;
};

module.exports = initPassport;
