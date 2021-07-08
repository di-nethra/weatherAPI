const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const cityName = req.body.cityName;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=e2961953e98667e4c22a7ee3deb1bd35&units=metric";

  https.get(url, (responce) => {
    responce.on("data", (data) => {
      const whether = JSON.parse(data);
      const temp = whether.main.temp;
      const icon = whether.weather[0].icon;
      const description = whether.weather[0].description;
      const humidy = whether.main.humidity;
      const windSpeed = whether.wind.speed;
      const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      // res.write("<img src=" + iconUrl + "/>");
      // res.write(

      // );
      res.write("<p>" + description + "</p>");
      res.write("<img src=" + iconUrl + ">");
      res.write(
        "<p>Temperature of " +
          cityName +
          " is " +
          temp +
          " degrees celsius </p>"
      );

      res.write("<div><h1 style={{color: "red"}}>Humidy of " + cityName + " is " + humidy + "%  </p></div>");
      res.write("<p>Wind speed of " + cityName + " is " + windSpeed + "  </p>");

      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log("port 3000 started");
});
