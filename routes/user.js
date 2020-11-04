var express       =  require('express');
var router        =  express.Router();
var User          =  require('../schema/user');
const TokenMaker  =  require('../helpers/tokenMaker');

var secretKey     =  "MyEventAPI"
var tokenMaker    =  new TokenMaker(secretKey);


//--------------------------------------------------
//     ADD USER
//--------------------------------------------------
router.post('/', function(req, res, next){
	var user = new User({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	});

	var token = tokenMaker.createUserToken(user);
	user.save(function(err, user){
		if(err){
			console.log("user save error: " + err);
			res.json({success: false, error: ""+ err});
		} 
		else {
			res.json({ success: true, message: 'user created !', User: user});
			console.log("suceessss")
		}
	});
});


//--------------------------------------------------
//     USER LOGIN
//--------------------------------------------------
router.post('/login', function(req, res, next){
	var email = req.body.email;
	User.findOne({email: email})
	.exec(function(err, user){
		if(err) throw err;
		if(!user){
			console.log("error" + err);
			res.json({success: false, message: "User Not Found!"});	
		}
		else if(user){
			var validPassword = user.comparePassword(req.body.password);

			if(!validPassword){
				res.status(403).json({ success: false, message: 'Invalid Password !'});
			}
			else{
				console.log("user" + user);
				var token = tokenMaker.createUserToken(user);
				res.json({success: true, message: "User Login !", token: token});
			}
		}
	});	
});


module.exports = router;
