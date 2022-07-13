const express = require("express");
const bodyParser = require("body-parser")

const app = express();

var items = ["Buy food", "Cook food"];
var workList = []

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){
  var d = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }
  var today = d.toLocaleDateString("en-US", options)


  res.render("list", {today: today, items: items });
});


app.get("/work", function(req, res){
  res.render("work", {today: "Work list", items: workList})
});

app.post("/", function(req, res){
  var item = req.body.newItem
  if(req.body.list === "work"){
    workList.push(item)
    res.redirect("/work")
  }else{
    items.push(item)
    res.redirect("/")
  }
});

app.post("/work", function(req, res){
  let item = req.body.newItem
  workList.push(item);
  res.redirect("/work")

});
app.listen(3000, function(){
  console.log("Server is started")
});
