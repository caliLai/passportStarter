const GitHubStrategy = require('passport-github2').Strategy;
const passport = require("passport");
require("dotenv").config();

passport.serializeUser(function(user, done) {
	if(!user){
		done({message:"your shitd dont work"}, null);
	}
 	done(null, user.id);
});

passport.deserializeUser(function(obj, done) {
 	done(null, obj);
});

const ghLogin = new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
	callbackURL: "http://localhost:8000/auth/github/callback"
},
	function(accessToken, refreshToken, profile, done) {
		// User.findOrCreate({githubID: profile.id},
		// 	function(err, user) {
		// 		return done(err, profile);
		// 	}
		// );
		
		done(null, profile);

	}
);
// console.log(process.env);

module.exports = passport.use(ghLogin);
