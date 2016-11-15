var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");

app.use(express.static(__dirname));// встановлення каталогу статичного контенту
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get("/", 
	function(req, res){
	res.sendFile(__dirname + "/index.html")
});

app.get("/list", function(req, res){
	res.sendFile(__dirname + "/data.json")
});

app.get("/form", function(req, res){
	res.sendFile(__dirname + "/form.html")
});
app.get("/delete",function(req,res){
	console.log(req.query);
	res.send("delete!");
})


app.get("/formget",  function(req, res){
	console.log(req.query);
	var file = require("./data.json");
	console.log(file);
	file.push(req.query);
	console.log(file);
	var str = JSON.stringify(file);
	fs.writeFileSync("data.json", str);
	res.send("дані збережено на сервері");
});

app.post("/formsendpost", function(req, res){
	// console.log(req.body);
	var file = require("./data.json");
	// console.log(file);
	file.splice(req.body.id,1);
	// console.log(file);
	var str = JSON.stringify(file);
	fs.writeFileSync("data.json", str);
	res.send(file);
});
app.post("/postsend", function(req, res){
	console.log(req.body);
	console.log(req.body.myInput);
	res.send(req.body.myInput);
});
app.get("/myget", function(req, res){
	console.log(req.query);
	res.send("success");
})
app.post("/mypost", function(req, res){
	console.log(req.body);
	res.send("success");
})

app.listen(process.env.PORT || 8080);
console.log("server is running");



