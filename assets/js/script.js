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
            background.css("--backgroundImage", "url(../images/background/Kollab_s_DrugStuck.png)");
            $('#in').addClass('integrationInputDay');
            $(':root').css("--colorentete", "#ffffff");
            $(':root').css("--entetebg", "rgba(251, 175, 44, 0.245)");
            $(':root').css("--enteteshadow", "1px 2px 5px 2px #ffefbb");
            //$(':root').css("--menu" , "linear-gradient(90deg, rgba(252,252,252,1) 0%, rgba(129,182,249,1) 100%)");
            //$(':root').css("--menushadow" , "5px -4px 15px 5px #ebf0ff");
            $(':root').css("--textShadow" , "2px 1px 1px #fff7a4");
            $(':root').css("--menuBorder" , "1px solid #baefff");
            $(':root').css("--colorglobal", "#256aff");
            $(':root').css("--filter", "progid:DXImageTransform.Microsoft.gradient(startColorstr='#3f3fda', endColorstr='#9b78c1',GradientType=0)");
            $(':root').css("--btnShow", "linear-gradient(90deg, rgba(0,209,254,1) 28%, rgba(128,184,247,1) 100%)");
            $(':root').css("--btnShowwebkit", " -webkit-linear-gradient(90deg, rgba(0,209,254,1) 28%, rgba(128,184,247,1) 100%);");
            $(':root').css("--btnShowmoz", "-moz-linear-gradient(0deg, rgba(0,209,254,1) 0%, rgba(128,184,247,1) 100%)");
            $(':root').css("--btnShowlinear", "-o-linear-gradient(0deg, rgba(0,209,254,1) 0%, rgba(128,184,247,1) 100%)");

            
        } else if (date >= goldenHour && date <= dusk) {



            background.css("--backgroundImage", "url(../images/background/Kollab_s_DrugStuck.png)");
        
            $('#in').removeClass('integrationInputDay');
            $('#in').removeClass('integrationInputNight');
            $('#in').addClass('integrationInputSunset');
        

            $(':root').css("--colorentete", "#020705");
            $(':root').css("--entetebg", "rgba(255, 118, 14, 0.35)");
            $(':root').css("--enteteshadow", "1px 2px 5px 2px #ff9e27");
            $(':root').css("--menu" , "linear-gradient(90deg, rgba(254,166,84,1) 5%, rgba(255, 138, 13, 0.788) 100%)");
            $(':root').css("--menushadow" , "5px -4px 15px 5px #ff8c21");
            $(':root').css("--textShadow" , "2px 1px 1px #a46d36");
            $(':root').css("--menuBorder" , "1px solid #ffc003");
            $(':root').css("--colorglobal", "#020705");
            $(':root').css("--filter", 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#fea654",endColorstr="#f1f780",GradientType=1)');
            $(':root').css("--btnShowBg", "rgb(255,183,115)");
            $(':root').css("--btnShow", " linear-gradient(90deg, rgba(255,183,115,1) 0%, rgba(137,128,247,1) 100%)");
            $(':root').css("--btnShowwebkit", "-webkit-linear-gradient(90deg, rgba(255,183,115,1) 0%, rgba(137,128,247,1) 100%)");
            $(':root').css("--btnShowmoz", "-moz-linear-gradient(90deg, rgba(255,183,115,1) 0%, rgba(137,128,247,1) 100%)");
            $(':root').css("--btnShowlinear", "-o-linear-gradient(0deg, rgba(63,67,218,1) 0%, rgba(155,120,193,1) 100%)");
            $(':root').css("--enteteborder", "1px solid rgb(209, 224, 152)");
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
            $('#label-integration-content').addClass('labelNight');
            $('#label-integration-content').removeClass('labelSunset');
            $('#label-integration-content').removeClass('labelSunset');
            $('#label-integration-content').removeClass('labelSunset');
            $('#label-integration-content').removeClass('labelSunset');
            $('.btnStyle').addClass('btn-show-TimeNight');
            $('.btnStyle').removeClass('btn-show-TimeDay');
            $('.btnStyle').removeClass('btn-show-TimeSunset');


            //$(':root').css("--colorglobal", "#ffffff");
            //$(':root').css("--menu" , "linear-gradient(0deg, rgba(63,67,218,1) 0%, rgba(111,34,195,1) 100%)");
            //$(':root').css("--menuwebkit" , "-webkit-linear-gradient(0deg, rgba(63,67,218,1) 0%, rgba(111,34,195,1) 100%)");
            //$(':root').css("--menumoz" , "-moz-linear-gradient(0deg, rgba(63,67,218,1) 0%, rgba(111,34,195,1) 100%)");
            //$(':root').css("--menulinear" , "-o-linear-gradient(0deg, rgba(63,67,218,1) 0%, rgba(111,34,195,1) 100%)");
            //$(':root').css("--menuBg" , "rgb(63,67,218)");
            //$(':root').css("--filter", "progid:DXImageTransform.Microsoft.gradient(startColorstr='#3f3fda', endColorstr='#9b78c1',GradientType=0)");

            //$(':root').css("--menushadow" , "5px -4px 15px 5px #000");
            //$(':root').css("--textShadow" , "2px 1px 1px #283966");
            //$(':root').css("--menuBorder" , "1px solid #4e6096");

            //$(':root').css("--btnShow", "linear-gradient(0deg, rgba(63,67,218,1) 0%, rgba(155,120,193,1) 100%)");

            //$(':root').css("--btnShowwebkit", " -webkit-linear-gradient(90deg, rgba(0,209,254,1) 28%, rgba(128,184,247,1) 100%);");
            //$(':root').css("--btnShowmoz", "-webkit-linear-gradient(0deg, rgba(63,67,218,1) 0%, rgba(155,120,193,1) 100%)");
            //$(':root').css("--btnShowlinear", "-o-linear-gradient(0deg, rgba(63,67,218,1) 0%, rgba(155,120,193,1) 100%)");
            //$(':root').css("--btnShowBg", "rgb(63,67,218)");

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




    


        
