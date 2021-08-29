const express=require("express");
const https=require("https");
const bodyparser=require("body-parser");
const app=express();
app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static('public'));
app.use('/css',express.static(__dirname+'public/css')); 

app.use(express.static('public'));
app.use('/images',express.static(__dirname+'public/images'));


app.get("/",function(req,res)
{
   res.sendFile(__dirname+"/index.html");
 
})

app.post("/",function(req,res)
{   
    var a=String( req.body.cityname);
    console.log(a);

    var city=a;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=c830c5509fd4a46fec49a0e23f4674c4&units=metric";
    https.get(url,function(response)
    {  
       console.log(response.statusCode);
       response.on("data",function(data)
      {  
          const weatherapp=(JSON.parse(data));
          console.log(weatherapp);
          const temp=weatherapp.main.temp;
          console.log(temp);
          const icon=weatherapp.weather[0].icon;
          const weatherdata=weatherapp.weather[0].description;
          const humidity=weatherapp.main.humidity;
          const windspeed=weatherapp.wind.speed;
          const feelslike=weatherapp.main.feels_like;
          console.log(weatherdata);
          const imageurl="https://openweathermap.org/img/wn/"+ icon+"@2x.png"

          res.write("<div style='text-align: center;   margin: auto; margin-top:-100px; width: 50%; padding: 10px;   border: 3px solid black;   border-style: dotted;  height: auto;  position: relative;   top:200px;'>")
       res.write("<h1>Temperature in "+ city+ " is: "+temp +"</h1>");
         res.write("<body style=' background-color:#abe9cd; background-image: linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%);'>")
          res.write("<img src="+imageurl+" >"); 
          res.write("<p style='font-size:2rem;' >Current weather is "+weatherdata+"</p>");
          res.write("<p  style='font-size:2rem;'>Humidity is: "+humidity+"</p>");
          res.write("<p  style='font-size:2rem;'>Current windspeed is: "+ windspeed +"</p>");
          res.write("<p  style='font-size:2rem;'> The tempreature feels like: "+feelslike +"</p>");
          res.write("</div>");

          res.write("<div style='text-align: center;   margin: auto; width: 100%; padding: 10px; margin-left:0%; background-color:#bdd4e7;; background-image:linear-gradient(315deg, #bdd4e7 0%, #8693ab 74%);     height: auto;  position: relative; padding-bottom: 20px;   top:300px; right:10px;'>")
        res.write("<h2>Developed by Arya Nikale</h2>")
          res.write("<a href='https://github.com/arya232004/'><img src='/images/github.png' style='width:30px; margin-right:30px; '> </a>");
          res.write("<a href='https://www.linkedin.com/in/arya-nikale-6bb212191/'><img src='/images/linkedin.png' style='width:30px; margin-right:30px;'> </a>");
          res.write("<a href='mailto:arya232004@gmail.com'><img src='/images/mail.png' style='width:30px; '> </a>");
          res.write("</div>");
         res.write("</body>");

          res.send()
          
      })
    }); 



})


app.listen(3000,function()
{
    console.log("Heya!")
})
