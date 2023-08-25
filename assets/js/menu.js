
// Function add event listener

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
var currentIdVideo = 'jfKfPfyJRdk';

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '1000px',
    width: '562.57px',
    videoId: currentIdVideo,
    events: {
      //'onReady': onPlayerReady,
      //'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
//function onPlayerReady(event) {
  //event.target.playVideo();
  //}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
//var done = false;
//function onPlayerStateChange(event) {
  //if (event.data == YT.PlayerState.PLAYING && !done) {
    //setTimeout(stopVideo, 6000);
    //done = true;
 // }
//}
function stopVideo() {
  player.stopVideo();
}



function updateYoutubeBtn() {
  // Sélectionner l'élément input et récupérer sa valeur

  var youtubeUrl = $("#in").val();


  if(getYoutubeVideoId(youtubeUrl) !== null ){
    var youtubeVideoId = getYoutubeVideoId(youtubeUrl);

    // Mettre à jour la variable currentIdVideo avec l'ID de la vidéo YouTube récupérée

    currentIdVideo = youtubeVideoId;

    // Sélectionner l'élément avec l'ID "videoYoutube" et mettre à jour son contenu HTML avec la valeur de l'input

    player.loadVideoById(youtubeVideoId);

  }

  else if(getYoutubeVideoId(youtubeUrl) == null ) {

    alert('Erreur de saisi');

  }



  // Extraire le nom de la vidéo à partir de l'URL
  //var youtubeVideoName = youtubeUrl.match(/watch\?v=(.*)/)[1];

  // Afficher la valeur de l'URL et le nom de la vidéo

  function getYoutubeVideoId(url) {
    var youtubeRegex = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    var match = url.match(youtubeRegex);
    if (match && match[2]) {
      return match[2];
    } else {
      return null;
    }
  }

}


  



      
    // all const 

    //const menu 

    //all btn 

    const elementMenu =$('#menu-affichage');
    const hide = $('#hide');
    const show =$('#show');
    const choixVideoBtn =$('#video-btn');
    const accept =$('#valide');

    // menu footer

    const classMenu =$('#menu-deroulant');
    const footerMenuitem = $('#menu-deroulant-conteneur');

    const webcontener =$('#fav-site-bloc');
    const webAffiche =$('#web-affiche');


    // youtube 

    const youtubeMenu =$('#youtube-affiche');
    const sessionVideo =$('#session-video');


    // Tableau 

    const blocTableau = $('#session-tableau');
    const tableauMenu =$('#tableau-affiche');

    
    // add video youtube

    const videoYoutube =$ ('#video-youtube');
    const integrationYoutube =$ ('#integration-youtube');

    // hide and show menu add video


    


    //choix video 

    const blocChoixVideo = $('#bloc-choix-video');
    const videoChoix = $('#choix-content-video');
    const btnChoixVideo = $('#choix-video');
    
    // blocks videos 

    const menuVideo = $('#menu-video');
    const blocVideo = $('#bloc-video');
    const inputblocshow = $('#bloc-cacher');
    const cadreVideo = $('#video');
    



    // EventListener


    if (classMenu.hasClass('open')){
      $(footerMenuitem).on('click', closeMenu);
    }

    else if(!classMenu.hasClass('open')){
      $(footerMenuitem).on('click', openMenu);
    }

    $(accept).on('click', updateYoutubeBtn);
    $(hide).on('click', hideVideoBtn);
    $(show).on('click', showbtn);
    $(btnChoixVideo).on('click', choixvideo);
    $(choixVideoBtn).on('click', modeVideo);
    


    // <iframe width="887" height="499" loading="lazy" src="https://www.youtube.com/embed/jfKfPfyJRdk" title="lofi hip hop radio - beats to relax/study to" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

// Assurez-vous que vous avez inclus la bibliothèque jQuery dans votre code

 function openMenu() {
    
    classMenu.toggleClass("close open none block");

 };


 

 function closeMenu() {

  classMenu.removeClass('open');
  classMenu.addClass("close");





    }

    webAffiche.on('click', function() {


    if (webcontener.hasClass('flex')  || webcontener.hasClass("flex2") )  {
      webcontener.addClass("none");
      webcontener.removeClass("flex");
      webcontener.removeClass('flex2');

    } 
    
    else if(webcontener.hasClass("none") || webcontener.hasClass("none2") ){
      webcontener.addClass("flex");
      webcontener.removeClass("none");
      webcontener.removeClass('none2');

    } 

    

    if(webcontener.hasClass('flex') && webcontener.hasClass('none')){
        webcontener.removeClass('none');
        inputblocshow.addClass("none");
        menuVideo.removeClass("none");
        $('#video-youtube').removeClass('fullscreen');
        $('#bloc-horloge').removeClass('none');
        $('video').removeClass('fullscreen');
        

        if(!$('#video-youtube').hasClass('simplescreen')){
            $('#video-youtube').addClass('simplescreen');
        }

    
    }

});

youtubeMenu.on('click', function(e) {


  //sessionVideo.toggleClass("flex none")
    
  if (sessionVideo.css("display") == "flex") {
        sessionVideo.addClass("none");
        sessionVideo.removeClass("flex");
    } else {
      sessionVideo.removeClass("none");
      sessionVideo.addClass("flex");
    }
});

tableauMenu.on('click', function(e) {
  
  if (blocTableau.hasClass('flex') || blocTableau.hasClass('flex2'))  {
    blocTableau.addClass("none");
    blocTableau.removeClass("flex");
    blocTableau.removeClass("flex2");

  } 
  
  else if(blocTableau.hasClass("none") || blocTableau.hasClass('none2')){
    blocTableau.addClass("flex");
    blocTableau.removeClass("none");
    blocTableau.removeClass("none2");

  }
});








    function hideVideoBtn() {

        menuVideo.addClass("fade");
        $('#bloc-horloge').addClass('fade');
        $('#video-youtube').addClass('fullscreen');
        $('video').addClass('fullscreen');
        $(webcontener).addClass("fade");
        $(blocTableau).addClass("fade")

        if($('#video-youtube').hasClass('simplescreen')){
            $('#video-youtube').removeClass('simplescreen');
        }


        setTimeout(function(){
            menuVideo.addClass("none");
            inputblocshow.removeClass("none");
            menuVideo.removeClass("fade");
            $('#bloc-horloge').addClass('none');
            $('#bloc-horloge').removeClass('fade');
            $(webcontener).removeClass("fade");
            $(webcontener).addClass("none2");
            $(webcontener).removeClass('flex2');
            $(webcontener).removeClass('flex');
            $(blocTableau).removeClass("fade")


            if($(blocTableau).hasClass("none")){
          
            }

            else{
              $(blocTableau).addClass("none2")
              $(blocTableau).removeClass("fade");
              $(blocTableau).removeClass('flex');
              $(blocTableau).removeClass('flex2');  
            }



        }, 300);

    }



    function showbtn() {

        inputblocshow.addClass("none");
        menuVideo.removeClass("none");
        $('#video-youtube').removeClass('fullscreen');
        $('#bloc-horloge').removeClass('none');
        $('video').removeClass('fullscreen');
        $(webcontener).removeClass("none2");
        $(webcontener).removeClass("flex");
        $(webcontener).addClass('flex2');
        $(blocTableau).removeClass("none2")
        $(blocTableau).removeClass("flex");
        $(blocTableau).addClass('flex2');



        if(!$('#video-youtube').hasClass('simplescreen')){
            $('#video-youtube').addClass('simplescreen');
        }



    }

    // function pour passer en mode youtube ou en mode video 

    function modeVideo() {
        if (blocVideo.hasClass("none") && !videoYoutube.hasClass("none")) {
            videoYoutube.addClass("none");
            blocVideo.removeClass("none");
            btnChoixVideo.removeClass("none");
            integrationYoutube.addClass("none");
            stopVideo();
            choixVideoBtn.val("Passez en mode youtube");
        } else if (!blocVideo.hasClass("none") && videoYoutube.hasClass("none")) {
            videoYoutube.removeClass("none");
            blocVideo.addClass("none");
            btnChoixVideo.addClass("none");
            integrationYoutube.removeClass("none");
            choixVideoBtn.val("Passez en mode vidéo");
            cadreVideo[0].pause();
        }
    }
    
    

    // fonction pour afficher le menu de choix de vidéo lié 

    function choixvideo() {
        if (blocChoixVideo.hasClass("none")) {
            blocChoixVideo.removeClass("none");
            blocChoixVideo.hasClass("block")
            cadreVideo.addClass("none");
            videoChoix.addClass("none");
            btnChoixVideo.val("Fermez le menu");
        } else if (!blocChoixVideo.hasClass("none")) {
            blocChoixVideo.addClass("none");
            cadreVideo.removeClass("none");
            blocChoixVideo.removeClass("block")
            btnChoixVideo.val("Choissez une video");
            videoChoix.addClass("none");
        }
    }









