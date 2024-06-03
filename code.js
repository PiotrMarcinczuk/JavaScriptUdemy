let lat;
let long;
var apiKey = '02e9b4c2740eec01c3fa02b3790b713b';
function startApp(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                lat = position.coords.latitude;
                long = position.coords.latitude;
                console.log('lat: ', lat, 'long: ', long);
            }
        );
    }
    getWeatherData();
}

function getWeatherData(){
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;
    fetch(url).then( function(response){
        response.json().then( function(data){
            console.log(data);
        })
    })
}


