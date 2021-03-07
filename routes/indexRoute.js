const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
	if (req.user.type === "Admin") {
		res.redirect("/admin");
	} else {
		res.render("dashboard", {
			user: req.user,
		});
	}
	// console.log(req.user, res.user);
});

router.get("/admin", ensureAuthenticated, (req, res) => {
	// console.log("============================");
	// console.log(req.sessionStore);
	// console.log("----------------------------");
	// console.log(res);
	// console.log("============================");
	// const revoke = (key) => {
	// 	req.sessionStore.sessions.key.destroy();
	// }
  if (req.user.type === "Admin") {
	  res.render("admin", {
		  user: req.user,
		  sessionIDs: req.sessionStore,
		  // revoke: revoke,
	  })
<<<<<<< HEAD
	  // next();
=======
	  //next();
>>>>>>> second
  } else {
	  res.redirect("/dashboard");
  }
  // console.log(req.user, res.user);
});

router.post("/revoke", (req, res) => {
	if(req.user.type == "Admin"){
		// console.log("+++++++++++++++++++", req.body);
		// res.send("hey");
	    let key = req.body.sesKey;
	    delete req.sessionStore.sessions[key];
	    // req.sessionStore.sessions[key].destroy();
		res.redirect("/admin");
		// res.redirect("/admin");
	} else {
		res.redirect("/dashboard");
	}


});

module.exports = router;
