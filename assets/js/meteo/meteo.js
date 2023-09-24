(function(){'use strict';
//Le code écrit est en mode strict


let ville = "Moÿ-de-l'aisne";
let meteo;
// Appel initial de la fonction recevoirTemperature avec la fonction de rappel
recevoirTemperature(ville, traiterTemperature);


// Appel de la fonction recevoirTemperature toutes les 5000 millisecondes (5 secondes) avec setInterval
setInterval(function() {
  recevoirTemperature(ville, traiterTemperature);
}, 60000);



// Fonction pour recevoir la température et effectuer d'autres traitements
function recevoirTemperature(ville, callback) {

  let url;

  if (url !== null) {
    // Créez l'objet URL avec la valeur
    url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=eb3e55ca0093756f2541d5ad27c5021c&units=metric';
    // Autres opérations avec l'objet URL
  } else {
    // Gérez le cas où la valeur est nulle
    url = 'Aucune valeur';
  }
  




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
  };
}

// Fonction pour effectuer des traitements avec les données de température
function traiterTemperature(reponse) {
  let ville = reponse.name;
  let temperature = reponse.main.temp;
  let weatherId = reponse.weather[0].id;
  let weather = reponse.weather[0].description;
  //let humidity = reponse.main.humidity; 
  let wind = reponse.wind.speed;
  let windkm = wind * 3.6;

  let sunrise = reponse.sys.sunrise;
  let sunset = reponse.sys.sunset;
  meteo = reponse.weather[0].main;
  

  let now; // variable jour nuit 
  
  const timestamp = (Date.now() / 1000).toFixed(0); //timestamp 




  if(timestamp <= sunrise || timestamp >= sunset){
    now  = "Lune";
  }

  else {
    now = "Soleil";
  }


  video(now, meteo);
        
  switch (weatherId){
     case 300: 
    case "Soleil":
      weather = 'Brouillard léger';

      console.log(weather);

      document.querySelector('#icon-meteo').src="assets/images/icon/day_light_rain.png";
      document.querySelector('#icon-meteo').alt=weather;
      document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);

      break;
    case "Lune":
      weather = 'Brouillard léger';

      document.querySelector('#icon-meteo').src="assets/images/icon/night_light_rain.png";
      document.querySelector('#icon-meteo').alt=weather;
      document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);

      break;

    case 800: 

    switch(now){
      case "Soleil":
        weather = 'Ciel dégagé';
        document.querySelector('#icon-meteo').src="assets/images/icon/sun.png";
        document.querySelector('#icon-meteo').alt="Partiellement nuageux";
        document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);
        

        break;
      case "Lune":
        weather = 'Nuit ciel dégagé';
        document.querySelector('#icon-meteo').src="assets/images/icon/moon.png";
        document.querySelector('#icon-meteo').alt="Partiellement nuageux";
        document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);

        break;
    }
      break;
    case 801:
      switch(now){
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
        switch(now){
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
        switch(now){
          case "Soleil":
            weather = 'Globalement nuageux';
            document.querySelector('#icon-meteo').src="assets/images/icon/nuage_soleil.png";
            document.querySelector('#icon-meteo').alt="Globalement nuageux";
            document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);


            break;

          case "Lune":

            weather = 'Globalement nuageux';
            document.querySelector('#icon-meteo').src="assets/images/icon/nuage_lune.png";
            document.querySelector('#icon-meteo').alt="Lune avec nuage";
            document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);


            break;
        }

        break;


    case 804: 

    switch(now){
      case "Soleil":
        weather = 'Nuageux';
        document.querySelector('#icon-meteo').src="assets/images/icon/cloud_weather.png";
        document.querySelector('#icon-meteo').alt="Nuageux";
        document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);

        break;
      case "Lune":
        weather = 'Nuit nuageuse';
        document.querySelector('#icon-meteo').src="assets/images/icon/cloud_weather.png";
        document.querySelector('#icon-meteo').alt=weather;
        document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);

        break;
    }
      break;

      case 500: 

      switch(now){
        case "Soleil":
          weather = 'Pluie fine';
          
          document.querySelector('#icon-meteo').src="assets/images/icon/day_light_rain.png";
          document.querySelector('#icon-meteo').alt="Pluie fine";
          document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);

          break;
        case "Lune":
          weather = 'Pluie fine';

          document.querySelector('#icon-meteo').src="assets/images/icon/night_light_rain.png";
          document.querySelector('#icon-meteo').alt="Pluie fine";
          document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);

          break;
      }

      break;

      case 501: 


      switch(now){
        case "Soleil":
          weather = 'Averse';

          document.querySelector('#icon-meteo').src="assets/images/icon/day_light_rain.png";
          document.querySelector('#icon-meteo').alt=weather;
          document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);

          break;
        case "Lune":
          weather = 'Averse';

          document.querySelector('#icon-meteo').src="assets/images/icon/night_light_rain.png";
          document.querySelector('#icon-meteo').alt=weather;
          document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);

          break;
      }

      break;


      case 502:

      switch(now){
        case "Soleil":
          weather = 'Grande adverse';

          document.querySelector('#icon-meteo').src="assets/images/icon/icon_averse.png";
          document.querySelector('#icon-meteo').alt=weather;
          document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);
          break;

          case "Lune":
            weather = 'Grande adverse';
  
            document.querySelector('#icon-meteo').src="assets/images/icon/icon_averse.png";
            document.querySelector('#icon-meteo').alt=weather;
            document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);
  
            break;
      }

      break;

      default:

    case isNaN():
      weather = 'Une erreur est survenue';
      break;

  }
  
  document.querySelector('#ville').innerHTML = '<strong>' + ville + '</strong>';
  //document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);
  document.querySelector('#wind').innerHTML = windkm.toFixed(0) + ' km/h';


}



var selectVideo1 = $('#Image1');
var selectVideo2 = $('#Image2');
var selectVideo3 = $('#Image3');
var selectVideo4 = $('#Image4');


var videoBalise = $('#video');
var source = $('<source>');
var url = $('<a>');

selectVideo1.on('click', modifierVideo);
selectVideo2.on('click', modifierVideo);
selectVideo3.on('click', modifierVideo);
selectVideo4.on('click', modifierVideo);


function modifierVideo(event) {

  var thisVideo = event.target.id;

  const contentVideo = $('#content-video');
  const blocChoixVideo = $('#bloc-choix-video');
  const btnChoixVideo = $('#choix-video');

  contentVideo.removeClass('none');
  videoBalise.removeClass('none');
  blocChoixVideo.addClass('none');
  btnChoixVideo.val('Choissez une video');

  // Réinitialiser le contenu HTML de la balise vidéo
  videoBalise.html('');

  switch (thisVideo) {
    case "Image1":
      source.attr('src', '../video/sunny_video.mp4');
      url.attr('href', '../video/sunny_video.mp4');
      videoBalise.get(0).load();
      break;

    case "Image2":
      source.attr('src', '../video/night_video.mp4');
      url.attr('href', '../video/night_video.mp4');
      videoBalise.get(0).load();
      break;

    case "Image3":
      source.attr('src', '../video/rain_video.mp4');
      url.attr('href', '../video/rain_video.mp4');
      videoBalise.get(0).load();
      break;

    case "Image4":
      source.attr('src', '../video/summer_forest.mp4');
      url.attr('href', '../video/summer_forest.mp4');
      videoBalise.get(0).load();
      break;

    default:
      // Faire quelque chose en cas de cas par défaut
      break;
  }

  source.attr('type', 'video/mp4');
  videoBalise.append(source);
  videoBalise.append(url);
}

function video(now, meteo) {
  var video = $('video');
  var source = $('<source>');
  var url = $('<a>');

  switch (meteo) {
    case "Rain":
      source.attr('src', '../video/rain_video.mp4');
      url.attr('href', '../video/rain_video.mp4');
      break;

    default:
      switch (now) {
        case "Soleil":
          source.attr('src', '../video/sunny_video.mp4');
          url.attr('href', '../video/sunny_video.mp4');
          break;

        case "Lune":
          source.attr('src', '../video/night_video.mp4');
          url.attr('href', '../video/night_video.mp4');
          break;

          default:
            source.attr('src', '../video/summer_forest.mp4');
            url.attr('href', '../video/summer_forest.mp4');
          break;
      }
  }

  source.attr('type', 'video/mp4');
  video.html('');
  video.append(source);
  video.append(url);
}


})();









