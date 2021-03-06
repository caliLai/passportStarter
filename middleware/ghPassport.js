const GitHubStrategy = require('passport-github2').Strategy;
const passport = require("passport");
const userController = require("../controllers/userController");
require("dotenv").config();

passport.serializeUser(function(user, done) {
	if(!user){
		done({message:"not enough goats"}, null);
	}
 	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
 	// done(null, obj);
	// let user = userController.getUserById(id);
    // if (obj) {
    //   done(null, obj);
    // } else {
    //   done({ message: "User not found" }, null);
    // }
	let userExists = userController.getUserById(id);
    if (userExists) {
      done(null, user);
    } else {
      done({ message: "User not found" }, null);
    }
});

const ghLogin = new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
	callbackURL: "http://localhost:8000/auth/github/callback"
},
	function(accessToken, refreshToken, profile, done) {
		let user = {id: profile.id, name: profile.username};
		// console.log(`USER: ${user.id} ${user.name}`);
		userController.addUserByGh(profile.id, profile.username);
		return user
	      ? done(null, user)
	      : done(null, false, {
	          message: "Your login details are not valid. Please try again",
	        });

	}
);
// console.log(process.env);

module.exports = passport.use(ghLogin);
