var express = require("express");
var app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,  authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
  next();
});

const port =process.env.PORT || 2410;

app.listen(port, () => console.log(`Node app listening on port ${port}!`));


const {movies,loginData,orders,theathreData}=require("./data");


app.get("/movies/:city",function(req,res){
    let city=req.params.city;
    let q=req.query.q;
    let genre=req.query.genre;
    let lang=req.query.lang;
    let format=req.query.format;
    console.log(city);
    let movies1=movies
    let arr1=movies1.filter((n)=>n.location.includes(city));;
    if(q){
        arr1=arr1.filter((n)=>(n.movieName===q))
    }

    // if(lang){
    //     arr1=arr1.filter((n)=>(n.langauge==lang))
    // }
    if(lang!= undefined)
    {
        lang= lang.split(',');
      //console.log(language);
      let arr2= arr1.filter(obj=>
        lang.find(obj1=> obj1===obj.langauge)
     );
     arr1= arr2;
    }
    if(format){
        arr1=arr1.filter((n)=>(n.format.includes(format)))
    }
    if(genre){
        arr1=arr1.filter((n)=>(n.genre.includes(genre)))
    }
    // console.log(arr1);
    res.send(arr1);
})

app.get("/movie/:id",function(req,res){
    let id=req.params.id;
    console.log(id);
 let data=movies.find((n)=> n.id === +id);
 console.log(data);
 data ? res.send(data) : res.send("not found");

})

app.get("/th/:city",function(req,res){
    let city=req.params.city;

    let data=theathreData.find((n)=>n.city===city);
    console.log(data);
    data ? res.send(data) : res.send("not found");
})


app.post("/seat",function(req,res){
    let body=req.body;
  orders.push(body);
  res.send(body);
})

app.get("/orders",function(req,res){
    res.send(orders);
})


app.post("/login",function(req,res){
    let email=req.body.email;
let loginData1=loginData.find((n)=>n.email===email);
res.send(loginData1);
})

app.get("/login/:email",function(req,res){
    let email=req.params.email;
    let loginData1=loginData.find((n)=>n.email===email);
    res.send(loginData1)
})