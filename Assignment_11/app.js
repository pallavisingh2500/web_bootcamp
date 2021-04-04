const apiKey="10be0965039bc9eb492b43547a89bf17";
let currentCity="";
let lat="";
let lon="";
$(document).ready(()=>{
    getAllData(true);
    $(".inputCityName").on("keypress",(e)=>{
        currentCity=e.target.value;
        if(currentCity.length > 0 && e.which==13) getAllData(false);
       
    });
});

function getAllData(byLocation){
    if(byLocation){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(takeWeatherBylocation);
        }
    }else{
    let weatherOfCity=`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=metric&appid=${apiKey}`;
    $.get(weatherOfCity, function (data){
        weatherOfData(data);
    });
    }
}
function takeWeatherBylocation(position){
    lat=position.coords.latitude;
    lon=position.coords.longitude;
    let weatherOfCityLocation=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    $.get(weatherOfCityLocation, function (data){
        weatherOfData(data);
    });
}
 function weatherOfData(data){
     console.log(data);
     let options={
         weekday:"long",
         year:"numeric",
         month:"long",
         day:"numeric"
     };
     let today=new Date().toLocaleTimeString("en-us",options).split(",");
     $("#cityName").html(data.name);
     $("#countryCode").html(data.sys.country);
     $("#today").html(`${today[0]},${today[1]},${today[2]}`);
     $(".temp").html(data.main.temp + "&deg;C");
     $("#tempBetween").html(data.main.temp_min + "/" + data.main.temp_max);
     $("#weatherIcon").attr("src",`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
     $("#weatherDescrip").html(data.weather[0].main);
     $('#sunSetRise').html("&#127749;" + " " + data.sys.sunrise + " " + "&#127751;" + " " + data.sys.sunset );
     $("#visibility").html(data.visibility);
     $("#humidity").html(data.main.humidity);
 }