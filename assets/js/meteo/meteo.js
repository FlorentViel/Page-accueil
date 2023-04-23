let ville = "Moÿ-de-l'Aisne";
let sol = soleil();
let meteo;

// Appel initial de la fonction recevoirTemperature avec la fonction de rappel
recevoirTemperature(ville, sol, traiterTemperature);

// Appel de la fonction recevoirTemperature toutes les 5000 millisecondes (5 secondes) avec setInterval
setInterval(function() {
  recevoirTemperature(ville, sol, traiterTemperature);
}, 300000);

// Fonction pour recevoir la température et effectuer d'autres traitements
function recevoirTemperature(ville, sol, callback) {
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=eb3e55ca0093756f2541d5ad27c5021c&units=metric';
  

  console.log(url);

  const requete = new XMLHttpRequest();
  requete.open('GET', url);
  requete.responseType = 'json';
  requete.send();

  requete.onload = function() {
    if (requete.readyState === XMLHttpRequest.DONE) {
      if (requete.status === 200) {
        let reponse = requete.response;
        callback(reponse); // Appel de la fonction de rappel avec les données en argument
      }
    }
  }
}

// Fonction pour effectuer des traitements avec les données de température
function traiterTemperature(reponse) {
  let ville = reponse.name;
  let temperature = reponse.main.temp;
  let weatherId = reponse.weather[0].id;
  let weather = reponse.weather[0].description;
  let humidity = reponse.main.humidity; 
  let wind = reponse.wind.speed;
  let windkm = wind * 3.6;
  meteo = reponse.weather[0].main;
  
  // Utiliser les données dans votre code
  video(sol, meteo);

  
        
  switch (weatherId){

    case 800: 

    switch(sol){
      case "Soleil":
        weather = 'Ciel dégagé';
        document.querySelector('#icon-meteo').src="assets/images/icon/sun.png"
        document.querySelector('#icon-meteo').alt="Partiellement nuageux"
        document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);
        

        break;
      case "Lune":
        weather = 'Nuit ciel dégagé';
        document.querySelector('#icon-meteo').src="assets/images/icon/moon.png"
        document.querySelector('#icon-meteo').alt="Partiellement nuageux"
        document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);

        break;
    }
      break;
    case 801:
      switch(sol){
        case "Soleil":
          weather = 'Légèrement nuageux';
          document.querySelector('#icon-meteo').src="assets/images/icon/nuage_leger_soleil.png";
          document.querySelector('#icon-meteo').alt="Légèrement nuageux";
          document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);

          break;
        case "Lune":
          weather = 'Nuit légèrement nuageuse';
          document.querySelector('#icon-meteo').src="assets/images/icon/nuage_leger_lune.png";
          document.querySelector('#icon-meteo').alt="Partiellement nuageux";
          document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);
        break;
      }
      break;

      case 802:
        switch(sol){
          case "Soleil":
            weather = 'Partiellement nuageux';
            document.querySelector('#icon-meteo').src="assets/images/icon/nuage_soleil.png";
            document.querySelector('#icon-meteo').alt="Partiellement nuageux";
            document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);

            break;
          case "Lune":
            weather = 'Partiellement nuageux';
            document.querySelector('#icon-meteo').src="assets/images/icon/nuage_lune.png";
            document.querySelector('#icon-meteo').alt="Lune Partiellement nuageux";
            document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);
          break;
        }
        break;
    
    case 803:
        switch(sol){
          case "Soleil":
            weather = 'Globalement nuageux';
            document.querySelector('#icon-meteo').src="assets/images/icon/nuage_soleil.png"
            document.querySelector('#icon-meteo').alt="Globalement nuageux";
            document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);


            break;

          case "Lune":

            weather = 'Globalement nuageux';
            document.querySelector('#icon-meteo').src="assets/images/icon/nuage_lune.png"
            document.querySelector('#icon-meteo').alt="Lune avec nuage";
            document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);


            break;
        }

        break;


    case 804: 

    switch(sol){
      case "Soleil":
        weather = 'Nuageux';
        document.querySelector('#icon-meteo').src="assets/images/icon/cloud_weather.png"
        document.querySelector('#icon-meteo').alt="Nuageux";
        document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);

        break;
      case "Lune":
        weather = 'Nuit nuageuse';
        document.querySelector('#icon-meteo').src="assets/images/icon/cloud_weather.png"
        document.querySelector('#icon-meteo').alt=weather;
        document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);

        break;
    }
      break;

      case 500: 

      switch(sol){
        case "Soleil":
          weather = 'Pluie fine';
          
          document.querySelector('#icon-meteo').src="assets/images/icon/day_light_rain.png"
          document.querySelector('#icon-meteo').alt="Pluie fine";
          document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);

          break;
        case "Lune":
          weather = 'Pluie fine';

          document.querySelector('#icon-meteo').src="assets/images/icon/night_light_rain.png"
          document.querySelector('#icon-meteo').alt="Pluie fine";
          document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);

          break;
      }

      break;

      case 501: 


      switch(sol){
        case "Soleil":
          weather = 'Averse';

          document.querySelector('#icon-meteo').src="assets/images/icon/day_light_rain.png"
          document.querySelector('#icon-meteo').alt=weather;
          document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);

          break;
        case "Lune":
          weather = 'Averse';

          document.querySelector('#icon-meteo').src="assets/images/icon/night_light_rain.png"
          document.querySelector('#icon-meteo').alt=weather;
          document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);

          break;
      }

      case 502:

      switch(sol){
        case "Soleil":
          weather = 'Grande adverse';

          document.querySelector('#icon-meteo').src="assets/images/icon/icon_averse.png"
          document.querySelector('#icon-meteo').alt=weather;
          document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);
          break;

          case "Lune":
            weather = 'Grande adverse';
  
            document.querySelector('#icon-meteo').src="assets/images/icon/icon_averse.png"
            document.querySelector('#icon-meteo').alt=weather;
            document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);
  
            break;
      }

      default:

    case isNaN():
      weather = 'Une erreur est survenue';
      break;

  }
  
  document.querySelector('#ville').innerHTML = '<strong>' + ville + '</strong>';
  //document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);
  document.querySelector('#wind').innerHTML = windkm.toFixed(0) + ' km/h';



  
  // Autres traitements avec les données
  // ...
}
