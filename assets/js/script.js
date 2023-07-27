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






    function soleil(){

        var times = SunCalc.getTimes(new Date(), 49.7534248, 3.3643912);
        const date = new Date();
        var background = $('#background-image');

        //var times = SunCalc.getTimes(new Date('May 6, 2023 0:52:00'), 49.7534248, 3.3643912);
        //const date = new Date('May 6, 2023 0:52:00');

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

        const Nowhours = date.getHours()
        const Nowsminutes = date.getMinutes();
        const Nowsseconds = date.getSeconds();


        //console.log(Nowhours+''+Nowsminutes+''+Nowsseconds);
        //console.log(times);


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
        var etat = 0

        if(date>= night && date<= nadir &&  isNaN(night) == false  || isNaN(night) == false && date >= night && Nowhours <= 23){
            $(".etat-soleil").html(`Nuit`);
            actuel = 'Lune';

        }

        else if(date>= nadir && date <= nightEnd || isNaN(night) == true  && isNaN(nightEnd) == true && date <= nauticalDawn ){
        
            etat = 1;
            $(".etat-soleil").html(`Nadir`);

            if(isNaN(nightEnd) == true){
                actuel = 'Lune';
            }
            else {
                actuel = 'Lune';
            }
        }

        else if (date >= nightEnd && date <= nauticalDawn && isNaN(nauticalDawn) == false) {
            $(".etat-soleil").html("Aube astronomique");
            actuel = 'Lune';
            etat = 1;
        }
        
        else if (date >= nauticalDawn && date <= dawn  && isNaN(dawn) == false ) {
            $(".etat-soleil").html("Aube nautique");
            actuel = 'Lune';
            etat = 1;
        }
        
        else if (date >= dawn && date <= sunrise && isNaN(sunrise) == false ) {
            $(".etat-soleil").html("Début de l'Aube");
            actuel = 'Soleil';
            etat = 2;
            console.log('test');

        }
        
        else if (date >= sunrise && date <= sunriseend && isNaN(sunriseend) == false) {
            $(".etat-soleil").html("Lever du soleil");
            actuel = 'Soleil';
            etat = 2;
        }
        
        else if (date >= sunriseend && date <= goldenhourend) {
            $(".etat-soleil").html("Heure dorée matinale");
            actuel = 'Soleil';
            etat = 2;
        }
         
        else if (date >= goldenhourend && date <= solarnoon || isNaN(sunsetstart) == true && date <= solarnoon  ) {
            $(".etat-soleil").html("Matin");
            actuel = 'Soleil';

        }
        
        else if (date >= solarnoon && date <= goldenHour) {
            $(".etat-soleil").html("Après midi");
            actuel = 'Soleil';

        }
        
        else if (date >= goldenHour && date <= sunsetstart) {
            $(".etat-soleil").html("Heure dorée du soir");
            actuel = 'Soleil';
        }
        
        else if (date >= sunsetstart && date <= sunset && isNaN(sunsetstart) == false ) {
            $(".etat-soleil").html("Couché de soleil");
            actuel = 'Soleil';
            console.log('test');

        }
        
        else if (date >= sunset && date <= dusk) {
            $(".etat-soleil").html("Crépuscule civil");
            actuel = 'Lune';
        }

        
        else if (date >= dusk && date <= nauticaldusk) {
            $(".etat-soleil").html("Crépuscule nautique");
            actuel = 'Lune';
        }
        
        else if (date >= nauticaldusk && date <= night || isNaN(night) == true && date >= nauticaldusk 
        && date <= nadir || isNaN(night) == true && Nowhours <= 23 ) {
            $(".etat-soleil").html("Crépuscule astronomique");

            if (isNaN(night) == true) {
                actuel = 'Lune';
            } else {
                actuel = 'Lune';
            }
        }
        
        if (date >= sunrise && date <= goldenHour) {
            background.addClass("background-jour");
            background.removeClass("background-crepuscule");
            background.removeClass("background-nuit");
            $('#background-menu').addClass('blockTimeDay');
            $('#background-menu').removeClass('blockTimeSunset');
            $('#background-menu').removeClass('blockTimeNight');
            $('#menu-deroulant').addClass('blockTimeDay');
            $('#menu-deroulant').removeClass('blockTimeNight');
            $('#menu-deroulant').removeClass('blockTimeSunset');
            $('#navBar').addClass('EnteteTimeDay');
            $('#navBar').removeClass('EnteteTimeSunset');
            $('#navBar').removeClass('EnteteTimeNight');
            $('#in').addClass('integrationInputDay');
            $('#in').removeClass('integrationInputNight');
            $('#in').removeClass('integrationInputSunset');
            $('#label-integration-content').addClass('labelDay');
            $('#label-integration-content').removeClass('labelNight');
            $('#label-integration-content').removeClass('labelSunset');
            $('#bloc-choix-video').addClass('block-choix-video-TimeDay');
            $('#bloc-choix-video').removeClass('block-choix-video-TimeSunset');
            $('#bloc-choix-video').removeClass('block-choix-video-TimeNight');
            $('figure').addClass('figureTimeDay');
            $('figure').removeClass('figureTimeSunset');
            $('figure').removeClass('figureTimeNight');
            $('figcaption').addClass('figcaptionTimeDay');
            $('figcaption').removeClass('figcaptionTimeSunset');
            $('figcaption').removeClass('figcaptionTimeNight');
            $('.btnStyle').addClass('btn-show-TimeDay');
            $('.btnStyle').removeClass('btn-show-TimeSunset');
            $('.btnStyle').removeClass('btn-show-TimeNight');
            $('#bloc-tableau').addClass('tableau-jour');

        } else if (date >= goldenHour && date <= dusk) {

            background.addClass("background-crepuscule");
            background.removeClass("background-jour");
            background.removeClass("background-nuit");    

            $('#background-menu').addClass('blockTimeSunset');
            $('#background-menu').removeClass('blockTimeDay');
            $('#background-menut').removeClass('blockTimeNight');
            $('#menu-deroulant').addClass('blockTimeSunset');
            $('#menu-deroulant').removeClass('blockTimeDay');
            $('#menu-deroulant').removeClass('blockTimeNight');
            $('#navBar').addClass('EnteteTimeSunset');
            $('#navBar').removeClass('EnteteTimeDay');
            $('#navBar').removeClass('EnteteTimeNight');
            $('#in').addClass('integrationInputSunset');
            $('#in').removeClass('integrationInputDay');
            $('#in').removeClass('integrationInputNight');

            $('#label-integration-content').addClass('labelSunset');
            $('#label-integration-content').removeClass('labelDay');
            $('#label-integration-content').removeClass('labelNight');

            $('#bloc-choix-video').addClass('block-choix-video-TimeSunset');
            $('#bloc-choix-video').removeClass('block-choix-video-TimeDay');
            $('#bloc-choix-video').removeClass('block-choix-video-TimeNight');
            $('figure').addClass('figureTimeSunset');
            $('figure').removeClass('figureTimeDay');
            $('figure').removeClass('figureTimeNight');

            
            $('figcaption').addClass('figcaptionTimeSunset');
            $('figcaption').removeClass('figcaptionTimeDay');
            $('figcaption').removeClass('figcaptionTimeNight');

            $('.btnStyle').addClass('btn-show-TimeSunset');
            $('.btnStyle').removeClass('btn-show-TimeDay');
            $('.btnStyle').removeClass('btn-show-TimeNight');
            

            $('#in').addClass('integrationInputSunset');
            $('#in').removeClass('integrationInputDay');
            $('#in').removeClass('integrationInputNight');


            $('#bloc-tableau').removeClass('tableau-jour');
            $('#bloc-tableau').removeClass('tableauNight');
            $('#bloc-tableau').addClass('tableauSunset');
    
            }

            else{

            background.addClass("background-nuit");
            background.removeClass("background-crepuscule");
            background.removeClass("background-jour");
            $('#background-menu').addClass('blockTimeNight');
            $('#menu-deroulant').addClass('blockTimeNight');
            $('#menu-deroulant').removeClass('blockTimeDay');
            $('#navBar').addClass('EnteteTimeNight');
            $('#navBar').removeClass('EnteteTimeSunset');
            $('#navBar').removeClass('EnteteTimeDay');
            $('#in').addClass('integrationInputNight');
            $('#in').removeClass('integrationInputSunset');
            $('#in').removeClass('integrationInputDay');
            $('#label-integration-content').addClass('labelNight');
            $('#label-integration-content').removeClass('labelSunset');
            $('#label-integration-content').removeClass('labelDay');
            $('.btnStyle').addClass('btn-show-TimeNight');
            $('.btnStyle').removeClass('btn-show-TimeDay');
            $('.btnStyle').removeClass('btn-show-TimeSunset');
            $('#bloc-choix-video').addClass('block-choix-video-TimeNight');
            $('#bloc-choix-video').removeClass('block-choix-video-TimeSunset');
            $('#bloc-choix-video').removeClass('block-choix-video-TimeDay');
            $('figcaption').addClass('figcaptionTimeNight');
            $('figcaption').removeClass('figcaptionTimeDay');
            $('figcaption').removeClass('figcaptionTimeSunset');

            $('#bloc-tableau').addClass('tableauNight');
            
            }
    // Vérification des valeurs pour dayName, date et monthName
    $('.date').html((dayName !== undefined && date.getDate !== undefined && monthName !== undefined) ? `${dayName + ' ' + date.getDate() + ' ' + monthName + ' ' + date.getFullYear()}` : "Une erreur est survenue");

// Changement de la couleur du texte en fonction de l'heure du jour
document.querySelector('.PM').style.color = (date >= sunrise && date <= sunset) ? "rgb(251, 175, 44)" : "rgb(46, 18, 173)";

// Changement de la couleur de fond en fonction de l'heure du jour
//document.querySelector('.bg').style.backgroundColor = (date >= dawn && date <= sunset) ? "rgba(251, 175, 44, 0.245)" : "rgba(75, 63, 246, 0.245)";

// Retour de la valeur de la variable actuel (peut-être à utiliser ailleurs dans votre code)

        }




    


        
