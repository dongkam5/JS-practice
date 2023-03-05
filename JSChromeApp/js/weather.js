const API_KEY='8d997dcb793ecea9084a445d48cff61b';

function onGeoOk(position){
    const lat=position.coords.latitude;
    const lon=position.coords.longitude;
    const weather_=document.querySelector('#weather');
    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url).then(response => response.json().then(data=>{ 
        const weather=document.querySelector('#weather span:first-child');
        const City=document.querySelector('#weather span:last-child');
        City.innerText=data.name;
        weather.innerText=`${data.weather[0].main} / ${data.main.temp}`;
    }));
    weather_.classList.add('weather_pos');
}

function onGeoError(){
    alert("Can't find you. No weather for you.");
}
navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError)