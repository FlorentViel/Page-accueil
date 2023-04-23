//var test = SunCalc.getTimes(/*Date*/ date, /*Number*/ latitude, /*Number*/ longitude, /*Number (default=0)*/ height);

 (function(){'use strict';
    //Le code écrit est en mode strict

    soleil();
   clock();

   setInterval(soleil, 1000);
   setInterval(clock, 1000);



  })();



// Horloge

function clock(){
    //const date = new Date('March 23, 2019 6:10:10');
    const date = new Date();
    const hours = ((date.getHours() + 11) % 12 + 1);
    const AM = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const hour = hours * 30;
    const minute = minutes * 6;
    const second = seconds * 6;

    $('.petite-aiguille').css('transform', `rotate(${hour}deg)`);
    $('.grande-aiguille').css('transform', `rotate(${minute}deg)`);
    $('.seconde').css('transform', `rotate(${second}deg)`);

    $(".PM").html((AM < 12 ) ? `AM` : `PM`);
}



    function soleil(actuel){

        var times = SunCalc.getTimes(new Date(), 49.7534248, 3.3643912);
        const date = new Date();
        //const date = new Date('March 23, 2019 2:10:10');
        var background = $('#background-image');
        var menu = $('#background-menu');
        var entete = $('.bg');
        var btnShow = $('#show')

        //console.log(moonTime);

        //var times = SunCalc.getTimes(new Date('June 18, 2023 00:30:00'), 49.7534248, 3.3643912);
        //const date = new Date('April 08, 2023 20:25:52');

        var sunrise = times['sunrise'];
        var sunriseend= times['sunriseEnd']
        var goldenhourend= times['goldenHourEnd']
        var solarnoon= times['solarNoon']
        var goldenHour= times['goldenHour']    
        var sunsetstart= times['sunsetStart'];
        var sunset = times['sunset'];
        var dusk = times['dusk'];
        var nauticaldusk = times['nauticalDusk'];
        var night = times['night'];
        var nadir = times['nadir'];
        var nightEnd = times['nightEnd'];
        var nauticalDawn = times['nauticalDawn'];
        var dawn = times['dawn'];

        const months = {
            0:'Janvier',
            1:'Février',
            2:'Mars',
            3:'Avril',
            4:'Mai',
            5:'Juin',
            6:'Juillet',
            7:'Août',
            8:'Septembre',
            9:'Octobre',
            10:'Novembre',
            11:'Décembre'
        };

        const monthIndex = date.getMonth();
        const monthName = months[monthIndex];

        const days = {
            0:'Dimanche',
            1:'Lundi',
            2:'Mardi',
            3:'Mercredi',
            4:'Jeudi',
            5:'Vendredi',
            6:'Samedi'
        };

        const dayIndex = date.getDay();
        const dayName = days[dayIndex];

        var actuel = "";
        //console.log(sunrisePos);
        //console.log(sunriseAzimuth);
        //console.log(dusk);

        //console.log(nadir);
        //console.log(nightEnd);

        if(date>= night || date<= nadir && date >= nadir == false && isNaN(night) == false){
            $(".etat-soleil").html(`Nuit`);
            actuel = 'Lune';
        }

        if(date>= nadir && date >= nightEnd == false){
            $(".etat-soleil").html(`Nadir`);

            if(isNaN(nightEnd) == true){
                actuel = 'Lune';
            }
            else {
                actuel = 'Lune';
            }
        }

        if (date >= nightEnd && date >= nauticalDawn == false && isNaN(nightEnd) == false) {
            $(".etat-soleil").html("Aube astronomique");
            actuel = 'Lune';
        }
        
        if (date >= nauticalDawn && date >= dawn == false) {
            $(".etat-soleil").html("Aube nautique");
            actuel = 'Lune';
        }
        
        if (date >= dawn && date >= sunrise == false) {
            $(".etat-soleil").html("Début de l'Aube");
            actuel = 'Soleil';
        }
        
        if (date >= sunrise && date >= sunriseend == false) {
            $(".etat-soleil").html("Lever du soleil");
            actuel = 'Soleil';
        }
        
        if (date >= sunriseend && date >= goldenhourend == false) {
            $(".etat-soleil").html("Heure dorée matinale");
            actuel = goldenhourend;
            actuel = 'Soleil';
        }
        
        if (date >= goldenhourend && date >= solarnoon == false) {
            $(".etat-soleil").html("Matin");
            actuel = 'Soleil';
        }
        
        if (date >= solarnoon && date >= goldenHour == false) {
            $(".etat-soleil").html("Après midi");
            actuel = 'Soleil';
        }
        
        if (date >= goldenHour && date >= sunsetstart == false) {
            $(".etat-soleil").html("Heure dorée du soir");
            actuel = 'Soleil';
        }
        
        if (date >= sunsetstart && date >= sunset == false) {
            $(".etat-soleil").html("Couché de soleil");
            actuel = 'Soleil';
        }
        
        if (date >= sunset && date >= dusk == false) {
            $(".etat-soleil").html("Crépuscule civil");
            actuel = dusk;
            actuel = 'Lune';
        }
        
        if (date >= dusk && date >= nauticaldusk == false) {
            $(".etat-soleil").html("Crépuscule nautique");
            actuel = 'Lune';
        }
        
        if (date >= nauticaldusk && date >= night == false || isNaN(night) && date <= nadir) {
            $(".etat-soleil").html("Crépuscule astronomique");
        
            if (isNaN(night) == true) {
                actuel = 'Lune';
            } else {
                actuel = 'Lune';
            }
        }
        
        if (date >= sunrise && date <= goldenHour) {
            background.css("background-image", "var(--imageJour)");
            menu.addClass('block-day')
            //menu.css("background-color", "#8bdeff");
            //menu.css("box-shadow", "5px -4px 15px 5px #61b5ff");
            entete.css("background-color", "rgba(251, 175, 44, 0.245)");
            entete.addClass('jour');
            btnShow.addClass('btn-show-day');
            $('#hide').addClass('btn-show-day');
            $('#show').addClass('btn-show-day');
            $('#in').addClass('integrationInputDay');
            $('#video-btn').addClass('btn-show-day');
            $('#valide').addClass('btn-show-day');
            $('#choix-video').addClass('btn-show-day');
            $('#bloc-choix-video').addClass('block-day');
            $('.style-menu ').addClass('block-day');
            
        } else if (date >= goldenHour && date <= dusk) {


            menu.css("box-shadow", "5px -4px 15px 5px rgba(255, 207, 162, 0.5)");
            entete.addClass("sunset");
            //entete.css("background-color", "rgba(255, 118, 14, 0.35)");
            btnShow.removeClass('btn-show-day');
            $('#hide').removeClass('btn-show-day');
            $('#show').removeClass('btn-show-day');
            $('#in').removeClass('integrationInputDay');
            $('#video-btn').removeClass('btn-show-day');
            $('#valide').removeClass('btn-show-day');
            $('#choix-video').removeClass('btn-show-day');
            $('#bloc-choix-video').removeClass('block-day');
            $('.style-menu ').removeClass('block-day');
            

            background.css("background-image", "var(--imageCrespuscule)");
            menu.addClass("block-sunset");
            btnShow.addClass('btn-show-sunset');
            $('#hide').addClass('btn-show-sunset');
            $('#show').addClass('btn-show-sunset');
            $('#in').addClass('integrationInputSunset');
            $('#video-btn').addClass('btn-show-sunset');
            $('#valide').addClass('btn-show-sunset');
            $('#choix-video').addClass('btn-show-sunset');
            $('#bloc-choix-video').addClass('block-sunset');
            $('.style-menu ').addClass('menu-deroulant-sunset');
            $('#in').addClass('integrationInputSunset');
            }
            else{
            background.css("background-image", "var(--imageNuit)");
            menu.addClass('block-night');
            //menu.css("background-color", "var(--menuBgNuit), var(--menuNuit)");
           // entete.css("background-color", "rgba(75, 63, 246, 0.245)");
           entete.addClass('nuit');
            btnShow.addClass('btn-show-night');
            $('#hide').addClass('btn-show-night');
            $('#show').addClass('btn-show-night');
            $('#video-btn').addClass('btn-show-night');
            $('#valide').addClass('btn-show-night');
            $('#choix-video').addClass('btn-show-night');
            $('#bloc-choix-video').addClass('block-night');
            $('.style-menu ').addClass('block-night');
            $('#in').addClass('integrationInputNight');
            $('#label-integration-content').addClass('labelNight');

            $('.style-menu ').removeClass('menu-deroulant-sunset');
            $('#video-btn').removeClass('btn-show-sunset');
            $('#hide').removeClass('btn-show-sunset');
            $('#show').removeClass('btn-show-sunset');
            $('#in').removeClass('integrationInputSunset');
            $('#video-btn').removeClass('btn-show-sunset');
            $('#valide').removeClass('btn-show-sunset');
            $('#choix-video').removeClass('btn-show-sunset');
            $('#bloc-choix-video').removeClass('block-sunset');
            menu.remove('block-sunset');
            entete.remove('sunset');
            }
    // Vérification des valeurs pour dayName, date et monthName
    $('.date').html((dayName !== undefined && date.getDate !== undefined && monthName !== undefined) ? `${dayName + ' ' + date.getDate() + ' ' + monthName + ' ' + date.getFullYear()}` : "Une erreur est survenue");

// Changement de la couleur du texte en fonction de l'heure du jour
document.querySelector('.PM').style.color = (date >= sunrise && date <= sunset) ? "rgb(251, 175, 44)" : "rgb(46, 18, 173)";

// Changement de la couleur de fond en fonction de l'heure du jour
//document.querySelector('.bg').style.backgroundColor = (date >= dawn && date <= sunset) ? "rgba(251, 175, 44, 0.245)" : "rgba(75, 63, 246, 0.245)";

// Retour de la valeur de la variable actuel (peut-être à utiliser ailleurs dans votre code)
return actuel;

        }




    


        
