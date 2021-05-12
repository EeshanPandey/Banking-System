var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose  = require("mongoose");


//mongoose.connect("mongodb://localhost:27017/bank_app", {useNewUrlParser: true, useUnifiedTopology: true});

//after doing in terminal export DATABASEURL=mongodb://localhost:
//27017/yelp_camp
//mongoose.connect(process.env.DATABASEURL, {useNewUrlParser: true, useUnifiedTopology: true});
//this is the local database environment
//this is for the heroku production environment
//mongoose.connect("mongodb+srv://eeshan22:pandey123@cluster0-obntj.mongodb.net/yelp_camp?retryWrites=true&w=majority", {useNewUrlParser: true});


//const DB_url = process.env.DB_url || "mongodb://localhost:27017/bank_app";
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
mongoose.set('useFindAndModify', false);
//schema setup


var customerSchema = new mongoose.Schema({
	name: String,
	bank_id: Number,
	email: String,
	balance: Number
});

var Customer = mongoose.model("Customer", customerSchema);

mongoose.connect("mongodb+srv://eeshan22:pandey123@cluster0-obntj.mongodb.net/yelp_camp?retryWrites=true&w=majority", {useNewUrlParser: true});
// Customer.updateOne({name:"Eeshan"},{name: "Eeshan Pandey"}, function(err, changed){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(changed);
// 	}
// })

// Customer.updateOne({name:"John"},{name: "John MacDonald"}, function(err, changed){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(changed);
// 	}
// })
// Customer.create({
// 	name: "Pankaj Yadav",
// 	bank_id: 9,
// 	email: "pankaj@gmail.com",
// 	balance: 1200
// }, function(err, campground){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log("Newly created");
// 		console.log(campground);
// 	}
// })

// Customer.create({
// 	name:"Kapil Jha",
// 	bank_id: 7,
// 	email: "kapil99@gmail.com",
// 	balance: 1000
// }, function(serr, campground){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log("Newly created");
// 		console.log(campground);
// 	}
// })


app.get("/",function(req,res){
	Customer.find({}, function(err, allCustomers){
		if(err){
			console.log(error)
		}
		else{
			res.render("home", {customers: allCustomers});
		}
	})
});

app.get("/customers/:id/", function(req, res){
	//find the campground using provided ID
	Customer.findById(req.params.id, function(err, foundCustomer){
		if(err){
			console.log(err)
		}
		else{
			res.render("customer", {customer: foundCustomer});
		}
	});
})

app.get("/customers/:id/transaction/", function(req,res){
	Customer.findById(req.params.id, function(err, customer){
		//console.log(customer);
		var thiscustomer = customer.id;
		
	
		Customer.find({}, function(err, allCustomers){
		if(err){
			console.log(error)
		}
		else{
			res.render("transaction", {customers: allCustomers, thiscustomer: thiscustomer, customer: customer});
			//console.log(thiscustomer);
		}
	})
			
	})
	
})

app.post("/customers/:id/transaction", function(req,res){
	
	var add = parseInt(req.body.money);
	var name1 = req.body.name;
	
	
	Customer.findById(req.params.id, function(err, foundOg){
		var name2 = foundOg.name;
		var og = parseInt(foundOg.balance);
		var new_bal1 = og - add;
		
		
			
		
		Customer.findOneAndUpdate({name: name2}, {balance : 		new_bal1} , function(err, updateOg){
		
		//console.log(updateOg);
		})
		})
		
		Customer.findOne({name: name1}, function(err, foundCustomer){
			var bal = parseInt(foundCustomer.balance);
			
			var new_bal = bal + add;
			//console.log(foundCustomer);
			
			
			
			Customer.findOneAndUpdate({name: req.body.name}, {balance: new_bal}, function(err, updatedCustomer){
			
		//console.log("updated");
		console.log(updatedCustomer.balance);	
		res.redirect("/customers/" + req.params.id + "/transaction/")
	})
			
	})
	})


var port = process.env.PORT || 3000;
app.listen(port, function () {
console.log("Server Has Started!");
});




