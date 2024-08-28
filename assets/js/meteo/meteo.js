(function() {
    'use strict';
    // Le code écrit est en mode strict
  
    let meteo;
  
    // Fonction pour recevoir la température et effectuer d'autres traitements
    function recevoirTemperature(ville, callback) {
        let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=eb3e55ca0093756f2541d5ad27c5021c&units=metric';
  
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
        let wind = reponse.wind.speed;
        let windkm = wind * 3.6;
  
        let sunrise = reponse.sys.sunrise;
        let sunset = reponse.sys.sunset;
        meteo = reponse.weather[0].main;
  
        let now; // variable jour nuit 
        const timestamp = (Date.now() / 1000).toFixed(0); // timestamp 
  
        if (timestamp <= sunrise || timestamp >= sunset) {
            now = "Lune";
        } else {
            now = "Soleil";
        }
  
        video(now, meteo);
  
        switch (weatherId) {
            case 300:
            case "Soleil":
                weather = 'Brouillard léger';
                document.querySelector('#icon-meteo').src = "assets/images/icon/day_light_rain.png";
                document.querySelector('#icon-meteo').alt = weather;
                document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);
                break;
            case "Lune":
                weather = 'Brouillard léger';
                document.querySelector('#icon-meteo').src = "assets/images/icon/night_light_rain.png";
                document.querySelector('#icon-meteo').alt = weather;
                document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);
                break;
            case 800:
                switch (now) {
                    case "Soleil":
                        weather = 'Ciel dégagé';
                        document.querySelector('#icon-meteo').src = "assets/images/icon/sun.png";
                        document.querySelector('#icon-meteo').alt = "Partiellement nuageux";
                        document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);
                        break;
                    case "Lune":
                        weather = 'Nuit ciel dégagé';
                        document.querySelector('#icon-meteo').src = "assets/images/icon/moon.png";
                        document.querySelector('#icon-meteo').alt = "Partiellement nuageux";
                        document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);
                        break;
                }
                break;
            case 801:
                switch (now) {
                    case "Soleil":
                        weather = 'Légèrement nuageux';
                        document.querySelector('#icon-meteo').src = "assets/images/icon/nuage_leger_soleil.png";
                        document.querySelector('#icon-meteo').alt = "Légèrement nuageux";
                        document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);
                        break;
                    case "Lune":
                        weather = 'Nuit légèrement nuageuse';
                        document.querySelector('#icon-meteo').src = "assets/images/icon/nuage_leger_lune.png";
                        document.querySelector('#icon-meteo').alt = "Partiellement nuageux";
                        document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);
                        break;
                }
                break;
            case 802:
                switch (now) {
                    case "Soleil":
                        weather = 'Partiellement nuageux';
                        document.querySelector('#icon-meteo').src = "assets/images/icon/nuage_soleil.png";
                        document.querySelector('#icon-meteo').alt = "Partiellement nuageux";
                        document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);
                        break;
                    case "Lune":
                        weather = 'Partiellement nuageux';
                        document.querySelector('#icon-meteo').src = "assets/images/icon/nuage_lune.png";
                        document.querySelector('#icon-meteo').alt = "Lune Partiellement nuageux";
                        document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);
                        break;
                }
                break;
            case 803:
                switch (now) {
                    case "Soleil":
                        weather = 'Globalement nuageux';
                        document.querySelector('#icon-meteo').src = "assets/images/icon/nuage_soleil.png";
                        document.querySelector('#icon-meteo').alt = "Globalement nuageux";
                        document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);
                        break;
                    case "Lune":
                        weather = 'Globalement nuageux';
                        document.querySelector('#icon-meteo').src = "assets/images/icon/nuage_lune.png";
                        document.querySelector('#icon-meteo').alt = "Lune avec nuage";
                        document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);
                        break;
                }
                break;
            case 804:
                switch (now) {
                    case "Soleil":
                        weather = 'Nuageux';
                        document.querySelector('#icon-meteo').src = "assets/images/icon/cloud_weather.png";
                        document.querySelector('#icon-meteo').alt = "Nuageux";
                        document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);
                        break;
                    case "Lune":
                        weather = 'Nuit nuageuse';
                        document.querySelector('#icon-meteo').src = "assets/images/icon/cloud_weather.png";
                        document.querySelector('#icon-meteo').alt = weather;
                        document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);
                        break;
                }
                break;
            case 500:
                switch (now) {
                    case "Soleil":
                        weather = 'Pluie fine';
                        document.querySelector('#icon-meteo').src = "assets/images/icon/day_light_rain.png";
                        document.querySelector('#icon-meteo').alt = "Pluie fine";
                        document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);
                        break;
                    case "Lune":
                        weather = 'Pluie fine';
                        document.querySelector('#icon-meteo').src = "assets/images/icon/night_light_rain.png";
                        document.querySelector('#icon-meteo').alt = "Pluie fine";
                        document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);
                        break;
                }
                break;
            case 501:
                switch (now) {
                    case "Soleil":
                        weather = 'Averse';
                        document.querySelector('#icon-meteo').src = "assets/images/icon/day_light_rain.png";
                        document.querySelector('#icon-meteo').alt = weather;
                        document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);
                        break;
                    case "Lune":
                        weather = 'Averse';
                        document.querySelector('#icon-meteo').src = "assets/images/icon/night_light_rain.png";
                        document.querySelector('#icon-meteo').alt = weather;
                        document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);
                        break;
                }
                break;
            case 502:
                switch (now) {
                    case "Soleil":
                        weather = 'Grande averse';
                        document.querySelector('#icon-meteo').src = "assets/images/icon/icon_averse.png";
                        document.querySelector('#icon-meteo').alt = weather;
                        document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);
                        break;
                    case "Lune":
                        weather = 'Grande averse';
                        document.querySelector('#icon-meteo').src = "assets/images/icon/icon_averse.png";
                        document.querySelector('#icon-meteo').alt = weather;
                        document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);
                        break;
                }
                break;
            case 600:
                switch (now) {
                    case "Soleil":
                        weather = 'Neige';
                        document.querySelector('#icon-meteo').src = "assets/images/icon/snow_weather.png";
                        document.querySelector('#icon-meteo').alt = weather;
                        document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);
                        break;
                    case "Lune":
                        weather = 'Neige';
                        document.querySelector('#icon-meteo').src = "assets/images/icon/snowingcloudwith_moon.png";
                        document.querySelector('#icon-meteo').alt = weather;
                        document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);
                        break;
                }
                break;
            case 601:
                switch (now) {
                    case "Soleil":
                        weather = 'Neige';
                        document.querySelector('#icon-meteo').src = "assets/images/icon/snow_weather.png";
                        document.querySelector('#icon-meteo').alt = weather;
                        document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);
                        break;
                    case "Lune":
                        weather = 'Neige';
                        document.querySelector('#icon-meteo').src = "assets/images/icon/snowingcloudwithmoon.png";
                        document.querySelector('#icon-meteo').alt = weather;
                        document.querySelector('#temperature_label').innerHTML = weather + ' </br> ' + temperature.toFixed(0);
                        break;
                }
                break;
            default:
                weather = 'Une erreur est survenue';
                break;
        }
  
        document.querySelector('#ville').innerHTML = '<strong>' + ville + '</strong>';
        document.querySelector('#wind').innerHTML = windkm.toFixed(0) + ' km/h';
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
  
    // Fonction pour gérer la soumission du formulaire de choix de ville
    function handleCityFormSubmit(event) {
        event.preventDefault();
        const cityInput = document.getElementById('city-input');
        const city = cityInput.value.trim(); // Supprime les espaces blancs en début et en fin
  
        console.log("Valeur de la ville saisie : '" + city + "'"); // Log pour déboguer
  
        if (city) {
            localStorage.setItem('city', city);
            showAlert('Ville mise à jour.');
            recevoirTemperature(city, traiterTemperature);
            console.log("Ville saisie : " + city);
        } else {
            console.log("Aucune ville saisie");
        }
  
        cityInput.value = ''; // Efface le champ de saisie
    }
    document.getElementById('city-form').addEventListener('submit', handleCityFormSubmit);
  
    // Initialisation
    document.addEventListener('DOMContentLoaded', function() {
        const storedCity = localStorage.getItem('city');
        if (storedCity) {
            recevoirTemperature(storedCity, traiterTemperature);
        } else {
            getLocationAndStore();
        }
  
        // Mettre à jour la météo toutes les 60 secondes
        setInterval(() => {
            const city = localStorage.getItem('city') || 'Moÿ-de-l\'aisne'; // Ville par défaut
            recevoirTemperature(city, traiterTemperature);
        }, 300000);
    });
  
    // Fonction pour obtenir la géolocalisation et stocker les coordonnées
    function getLocationAndStore() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                localStorage.setItem('latitude', position.coords.latitude);
                localStorage.setItem('longitude', position.coords.longitude);
                showAlert('Géolocalisation mise à jour.');
                const defaultCity = 'Moÿ-de-l\'aisne'; // Ville par défaut
                recevoirTemperature(defaultCity, traiterTemperature);
            }, function(error) {
                console.error("Erreur de géolocalisation : ", error);
                showAlert('Erreur de géolocalisation.');
            });
        } else {
            console.error("La géolocalisation n'est pas supportée par ce navigateur.");
            showAlert('La géolocalisation n\'est pas supportée par ce navigateur.');
        }
    }
  
    function showAlert(message) {
        const alertMessage = document.getElementById('alert-message');
        if (alertMessage) {
            alertMessage.textContent = message;
            setTimeout(() => {
                alertMessage.textContent = '';
            }, 3000);
        } else {
            alert("L'élément alert-message n'a pas été trouvé dans le DOM.");
            console.error("L'élément alert-message n'a pas été trouvé dans le DOM.");
        }
    }
  
  })();