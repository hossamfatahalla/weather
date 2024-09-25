function handaleError() {
  console.log(error);
}


window.addEventListener("load", function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successPosition, handaleError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});

function successPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  getTemp(`${latitude},${longitude}`);
}

document.getElementById("find").addEventListener("input", function (e) {
  if (e.target.value.length < 3) return;
  getTemp(e.target.value);
});




let weatherData = null;
async function getTemp(location) {
  try {
    const res = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=5ec62a31691447a7bce180014241609&q=${location}&days=3&aqi=no&alerts=no`
    );
    if (!res.ok) throw Error("failed to connect");
    const data = await res.json();
    weatherData = data;
    const {
      location: { name: countrName },
      forecast: { forecastday },
      
    } = weatherData;

    const [today, tomorrow, afterTomorrow] = forecastday;
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const todate = new Date(today.date);
    const ttodate = new Date(tomorrow.date);
    const atodate = new Date(afterTomorrow.date);

    const todayName = dayNames[todate.getDay()];
    const tomorrowName = dayNames[ttodate.getDay()];
    const afterTomorrowName = dayNames[atodate.getDay()];

    const formattedTodayDate = todate.toLocaleDateString(); 
    

   
    const {
      hour ,
      day: { avgtemp_c: atot , condition: {icon: todayIcon , text: todayText} , daily_chance_of_rain: rain  },
    } = today;
    const dir = hour[0].wind_dir;
    const windSpeed = hour[0].wind_kph; 
    
    const {
      
      day: { maxtemp_c: mxtomt, mintemp_c: mitomt , condition: { icon: tomorrowIcon , text: tomorrowText } },
    } = tomorrow;
    const {
      
      day: { maxtemp_c: mxatomt, mintemp_c: miatomt  , condition: { icon: afterTomorrowIcon , text: AfterText } },
    } = afterTomorrow;



const fullTodayIconUrl = `https:${todayIcon}`;
const fullTomorrowIconUrl = `https:${tomorrowIcon}`;
const fullAfterTomorrowIconUrl = `https:${afterTomorrowIcon}`;

    console.log(
      todayName,
      tomorrowName,
      afterTomorrowName,
      atot,
      mxtomt,
      mitomt,
      mxatomt,
      miatomt
    );
    const card = displayweth(
      todayName,
      formattedTodayDate,
      countrName,
      atot,
      fullTodayIconUrl,
      todayText,
      rain,
      windSpeed,
      dir,
      tomorrowName,
     
      fullTomorrowIconUrl,
      mxtomt,
      mitomt,
      tomorrowText,
      
      afterTomorrowName,
      fullAfterTomorrowIconUrl,
      mxatomt,
      miatomt,
      AfterText,
     
    );
    document.getElementById("row").innerHTML = card;
    console.log(weatherData);
  } catch (error) {
    handaleError(error);
  }
}

function displayweth(
  today,
  todayDate,
  region,
  temp,
  img,
  imgkind,
  humid,
  wind,
  winddir,
  tomorrow,
  img2,
  maxTTemp,
  minTTemp,
  imgkind2,
  afterTmmorow,
  img3,
  maxATemp,
  minATemp,
  imgkind3,
) {
  return `       <div class="col-md-4" style="background-color: #323544; color: white; height: 100%; ">
                <div class="inner ">
                    <div class="d-flex flex-wrap justify-content-between pb-3">
                        <h6>${today}</h6>
                        <p>${todayDate}</p>
                    </div>
                    <div class="pb-5">
                        <h6 class="gov">${region}</h6>
                        <h5>${temp} °C</h5>
                        <img src="${img}" alt="">
                        <span>${imgkind}</span>
                    </div>
                    <div class="d-flex justify-content-around mt-2 pb-3  mb-5">
                        <i class="fa-solid fa-umbrella"> ${humid} %</i>
                        <i class="fa-solid fa-wind"> ${wind} km/hr</i>
                        <i class="fa-regular fa-compass"> ${winddir}</i>
                    </div>

                </div>

            </div>
            <div class="col-md-4" style="background-color: #1E202B; color: white; height: 100%; ">
                <div class="inner ">
                    <div class="d-flex flex-wrap justify-content-center pb-5 mb-5">
                        <h6>${tomorrow}</h6>
                    </div>
                    <div class="pb-5 d-flex flex-column align-items-center">
                        <img src="${img2}" alt="">
                        <h5>${maxTTemp} °C</h5>
                        <h4>${minTTemp} °C</h4>
                        <span>${imgkind2}</span>
                    </div>
                </div>

            </div>
            <div class="col-md-4" style="background-color:  #323544; color: white; height: 100%; ">
                <div class="inner">
                    <div class="d-flex flex-wrap justify-content-center pb-5 mb-5">
                        <h6>${afterTmmorow}</h6>
                    </div>
                    <div class="pb-5 d-flex flex-column align-items-center">
                        <img src="${img3}" alt="">
                        <h5>${maxATemp} °C</h5>
                        <h4>${minATemp} °C</h4>
                        <span>${imgkind3}</span>
                    </div>
                </div>

            </div>
`;
}
