$(document).ready(function() {
  // Définissez une promesse pour l'API YouTube
  var youtubeAPIReadyPromise = new Promise(function(resolve) {
    // Vérifiez régulièrement si l'API YouTube est prête
    function checkAPI() {
      if (typeof YT !== "undefined" && YT.Player) {
        resolve();
      } else {
        // Réessayez dans 100 millisecondes (ajustez si nécessaire)
        setTimeout(checkAPI, 100);
      }
    }
    checkAPI();
  });

  // 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');
  tag.onload = function() {
    // Résolvez la promesse lorsque l'API YouTube est chargée
    youtubeAPIReadyPromise.then(function() {
      onYouTubeIframeAPIReady();
    });
  };
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;
  var playerReady = false;
  var currentIdVideo = 'jfKfPfyJRdk'; // ID de la vidéo par défaut

  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: currentIdVideo,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }

  function onPlayerReady(event) {
    playerReady = true;
    event.target.playVideo();
  }

  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
      // Action à effectuer lorsque la vidéo se termine
    }
  }

  function getYoutubeVideoId(url) {
    var youtubeRegex = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    var match = url.match(youtubeRegex);
    if (match && match[2]) {
      return match[2];
    } else {
      return null;
    }
  }

  function afficherVideo() {
    var youtubeUrl = $("#in").val();
    var youtubeVideoId = getYoutubeVideoId(youtubeUrl);

    if (youtubeVideoId !== null) {
      if (playerReady && player && typeof player.loadVideoById === 'function') {
        currentIdVideo = youtubeVideoId;
        player.loadVideoById(youtubeVideoId);

        // Afficher le message de validation
        $("#error-message").addClass("none").removeClass("block");
        $("#duplicate-error-message").addClass("none").removeClass("block");

        showError("#validation-message");


      } else {
        console.error("Le lecteur YouTube n'est pas prêt.");
      }
    } else {
      // Afficher le message d'erreur
      showError("#error-message");
    }
  }

  function updateYoutubeBtn() {
    var youtubeUrl = $("#in").val();
    var youtubeVideoId = getYoutubeVideoId(youtubeUrl);

    if (youtubeVideoId !== null) {
      if (isDuplicateVideo(youtubeVideoId)) {
        // Afficher le message d'erreur pour les doublons
        showError("#duplicate-error-message");
        $("#validation-message").addClass("none").removeClass("block");
        $("#error-message").addClass("none").removeClass("block");
      } else {
        if (playerReady && player && typeof player.loadVideoById === 'function') {
          currentIdVideo = youtubeVideoId;
          player.loadVideoById(youtubeVideoId);

          // Sauvegarder le lien de la vidéo dans le localStorage
          saveVideoLink(youtubeUrl, youtubeVideoId);

          // Afficher le message de validation
          $("#validation-message").removeClass("none").addClass("block");
          $("#error-message").addClass("none").removeClass("block");
          $("#duplicate-error-message").addClass("none").removeClass("block");
        } else {
          console.error("Le lecteur YouTube n'est pas prêt.");
        }
      }
    } else {
      // Afficher le message d'erreur
      showError("#error-message");
    }
  }

  function isDuplicateVideo(videoId) {
    var videos = JSON.parse(localStorage.getItem('videos')) || [];
    return videos.some(video => video.videoId === videoId);
  }

  function saveVideoLink(url, videoId) {
    var videos = JSON.parse(localStorage.getItem('videos')) || [];
    videos.push({ url: url, videoId: videoId });
    localStorage.setItem('videos', JSON.stringify(videos));
    displaySavedVideos();
  }

  function deleteVideoLink(videoId) {
    var videos = JSON.parse(localStorage.getItem('videos')) || [];
    videos = videos.filter(video => video.videoId !== videoId);
    localStorage.setItem('videos', JSON.stringify(videos));
    displaySavedVideos();
  }

  function displaySavedVideos() {
    var videos = JSON.parse(localStorage.getItem('videos')) || [];
    var videoList = $('#bloc-thumbnail');
    videoList.empty();
    videos.forEach(function(video) {
      var thumbnailUrl = `https://img.youtube.com/vi/${video.videoId}/0.jpg`;
      var videoItem = `
        <div class="video-item" data-url="${video.url}" data-id="${video.videoId}">
          <a href="#" class="video-link">
            <img src="${thumbnailUrl}" alt="Miniature de la vidéo" style="width: 150px;">
          </a>
          <button class="btnStyle delete-video-btn">Supprimer</button>
        </div>
      `;
      videoList.append(videoItem);
    });

    // Ajouter un gestionnaire d'événements pour les miniatures
    $('.video-link').on('click', function(e) {
      e.preventDefault();
      var videoUrl = $(this).parent().data('url');
      $('#in').val(videoUrl);
      var youtubeVideoId = getYoutubeVideoId(videoUrl);
      if (playerReady && player && typeof player.loadVideoById === 'function') {
        currentIdVideo = youtubeVideoId;
        player.loadVideoById(currentIdVideo); // Charge et joue la vidéo
      } else {
        console.error("Le lecteur YouTube n'est pas prêt.");
      }
    });

    // Ajouter un gestionnaire d'événements pour les boutons de suppression
    $('.delete-video-btn').on('click', function(e) {
      e.stopPropagation();
      var videoId = $(this).parent().data('id');
      deleteVideoLink(videoId);
    });
  }

  function showError(selector) {
    $(selector).removeClass("none").addClass("block show");
    setTimeout(function() {
      $(selector).removeClass("show").addClass("none");
    }, 5000);
  }

  // Afficher les vidéos sauvegardées au chargement de la page
  displaySavedVideos();

  // Ajoutez un gestionnaire d'événements pour les boutons
  $('#afficher-video-btn').on('click', afficherVideo);
  $('#save-video-btn').on('click', updateYoutubeBtn);

  // Conservez uniquement les fonctions pour le choix de vidéo YouTube
  function choixvideo() {
    if ($('#bloc-choix-video').hasClass("none")) {
      $('#bloc-choix-video').removeClass("none").addClass("OpacityAnimationIn");
      setTimeout(function() {
        $('#bloc-choix-video').removeClass("OpacityAnimationIn");
      }, 500); // Durée de l'animation
      $('#choix-video').val("Fermez le menu");
    } else {
      $('#bloc-choix-video').addClass("OpacityAnimation");
      setTimeout(function() {
        $('#bloc-choix-video').addClass("none").removeClass("OpacityAnimation");
        $('#choix-video').val("Choissez une video");
      }, 500); // Durée de l'animation
    }
  }



  // Définissez une constante pour l'élément que vous souhaitez observer
  const sessionVideo = $('#session-video');

  // Définissez les options pour l'observateur (ajustez-les selon vos besoins)
  const observerOptions = {
    root: null, // utilise la fenêtre comme conteneur par défaut
    rootMargin: '0px', // aucune marge autour de la fenêtre
    threshold: 0.5, // déclenche l'observation lorsque 50 % de l'élément est visible
  };

  // Fonction pour charger la vidéo lorsque l'élément est visible
  function loadVideoWhenVisible(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Charger la vidéo ici, par exemple :
        player.loadVideoById(currentIdVideo);
        // Arrêtez d'observer une fois la vidéo chargée si vous le souhaitez
        observer.unobserve(entry.target);
      }
    });
  }

  // Créez une instance de l'observateur
  const observer = new IntersectionObserver(loadVideoWhenVisible, observerOptions);

  // Observez l'élément que vous souhaitez surveiller (dans ce cas, sessionVideo)
  observer.observe(sessionVideo.get(0)); // Utilisez get(0) pour obtenir l'élément DOM sous-jacent

  // Variable de contrôle pour suivre si la vidéo doit être lue lorsqu'elle est visible
  let shouldPlayVideoWhenVisible = false;

  // ...

  // Fonction pour charger la vidéo lorsque l'élément est visible
  function loadVideoWhenVisible(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (shouldPlayVideoWhenVisible) {
          // Charger et lire la vidéo si shouldPlayVideoWhenVisible est vrai
          player.loadVideoById(currentIdVideo);
          player.playVideo();
          // Réinitialiser shouldPlayVideoWhenVisible pour éviter la lecture automatique
          shouldPlayVideoWhenVisible = false;
        }
        // Arrêtez d'observer une fois la vidéo chargée si vous le souhaitez
        observer.unobserve(entry.target);
      }
    });
  }

  // Lorsque l'utilisateur met en pause la vidéo manuellement
  function pauseVideoManually() {
    if (player.getPlayerState() === YT.PlayerState.PLAYING) {
      player.pauseVideo();
    }
  }

  // Lorsque l'utilisateur souhaite jouer la vidéo manuellement
  function playVideoManually() {
    shouldPlayVideoWhenVisible = true;
    // Si la vidéo est déjà chargée, jouez-la immédiatement
    if (player.getPlayerState() === YT.PlayerState.CUED || player.getPlayerState() === YT.PlayerState.PAUSED) {
      player.playVideo();
    }
  }




      
    // all const 

    //const menu 


    //all btn 

    const elementMenu =$('#menu-affichage');
    const hide = $('#hide');

    const show =$('#show');
    const choixVideoBtn = $('#video-btn');
    const accept =$('#valide');
    const clockBtn = $('#bloc-horloge');


    // menu footer

    const classMenu =$('#menu-deroulant');
    const footerMenuitem = $('#menu-deroulant-conteneur');

    const webcontener =$('#fav-site-bloc');
    const webAffiche =$('#web-affiche');

    // section google 

    const googleSection = $('#google-section');


    // youtube 

    const youtubeMenu =$('#youtube-affiche');


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
    






    $(".bloc").click(function() {
      var bloc = $(this);

      // Vérifier si le bloc a la classe slidein
      if (bloc.hasClass("slidein")) {
          // Retirez la classe slidein pour arrêter l'animation
          bloc.removeClass("slidein");
      } else {
          // Ajoutez la classe slidein pour démarrer l'animation
          bloc.addClass("slidein");
      }
  });


    webAffiche.on('click', function() {




      if (webcontener.hasClass('flex') || webcontener.hasClass("flex2")) {
        inputblocshow.addClass("none");
        blocVideo.addClass("none");
        videoChoix.addClass("none");
        menuVideo.addClass("none");
        sessionVideo.addClass("none");
        sessionVideo.removeClass("flex");
        blocTableau.addClass("none");
        blocTableau.removeClass("flex");
        btnChoixVideo.val("Fermez le menu");
        webcontener.removeClass("OpacityAnimationIn");
        webcontener.addClass("OpacityAnimation");


        setTimeout(function() {
          googleSection.removeClass("OpacityAnimationIn");
          webcontener.addClass("none");
          webcontener.removeClass("flex flex2 OpacityAnimation OpacityAnimationIn");
      }, 500);

    }
    
    
    else if (webcontener.hasClass("none") || webcontener.hasClass("none2")) {
      webcontener.addClass("flex");
      webcontener.removeClass("none");
      webcontener.removeClass('none2');
      googleSection.remove("none");
      sessionVideo.addClass("none");
      sessionVideo.removeClass("flex");
      blocTableau.addClass("none");
      blocTableau.removeClass("flex");
      googleSection.removeClass("none");
      googleSection.addClass("OpacityAnimationIn flex");
      sessionVideo.removeClass("flex flex2 OpacityAnimation");
      btnChoixVideo.val("Choissez une video");

      // Ajoutez une classe pour la translation vers la droite avec opacité initiale de 0
      webcontener.addClass("OpacityAnimationIn");


      
  }

    if(webcontener.hasClass('flex') && webcontener.hasClass('none')){
        webcontener.removeClass('none');
        inputblocshow.addClass("none");
        blocVideo.addClass("none");
        videoChoix.addClass("none");
        menuVideo.addClass("none");
        sessionVideo.addClass("none");
        blocTableau.addClass("none");
        blocTableau.removeClass("flex");
        googleSection.removeClass("none");

        webcontener.addClass("OpacityAnimation");
        webcontener.removeClass("OpacityAnimationIn");


        setTimeout(function() {
          webcontener.removeClass("OpacityAnimation");
        }, 500);


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
    
  if ( sessionVideo.hasClass('flex')) {
    
        googleSection.removeClass("none OpacityAnimation OpacityAnimationIn flex");
        blocTableau.addClass("none");
        blocTableau.removeClass("flex");

        // Ajoutez une classe pour l'animation de sortie
        sessionVideo.addClass("OpacityAnimation");
        sessionVideo.removeClass("OpacityAnimationIn");

        // À la fin de l'animation, masquez complètement le bloc et supprimez les classes d'animation
        setTimeout(function() {
            sessionVideo.addClass("none");
            sessionVideo.removeClass("flex flex2 OpacityAnimation");
        }, 500);
        
  
        

      
        


    } else if(sessionVideo.hasClass("none") || sessionVideo.hasClass("none2")){
      sessionVideo.removeClass("none");
      sessionVideo.addClass("flex");
      webcontener.addClass("none");
      webcontener.removeClass("flex");
      googleSection.addClass("none");   
      googleSection.removeClass("flex");
      blocTableau.addClass("none");
      blocTableau.removeClass("flex");
      blocVideo.removeClass("flex");
      blocVideo.addClass("none");
      blocChoixVideo.addClass("none");
      blocChoixVideo.removeClass("bloc flex");
      menuVideo.addClass("bloc");
      menuVideo.removeClass("none");
      videoYoutube.addClass("flex");
      videoYoutube.removeClass("none");

      // Ajoutez une classe pour la translation vers la droite avec opacité initiale de 0
      sessionVideo.addClass("OpacityAnimationIn");
      sessionVideo.removeClass("OpacityAnimation");



    }
});

tableauMenu.on('click', function(e) {
  
  if (blocTableau.hasClass('flex') || blocTableau.hasClass('flex2'))  {
    sessionVideo.addClass("none");
    sessionVideo.removeClass("flex");
    webcontener.addClass("none");
    webcontener.removeClass("flex");
    webcontener.removeClass("flex");
    googleSection.removeClass("none");

    blocTableau.removeClass("OpacityAnimationIn");
    blocTableau.addClass("OpacityAnimation");

    btnChoixVideo.val("Fermez le menu");

    setTimeout(function() {
      blocTableau.addClass("none");
      blocTableau.removeClass("flex  OpacityAnimation OpacityAnimationIn");
  }, 500);


  } 
  
  else if(blocTableau.hasClass("none") || blocTableau.hasClass('none2')){
    blocTableau.addClass("flex");
    blocTableau.removeClass("none");
    blocTableau.removeClass("none2");
    webcontener.removeClass("flex");
    webcontener.addClass("none");
    sessionVideo.addClass("none");
    sessionVideo.removeClass("flex");
    googleSection.addClass("none");

    blocTableau.addClass("OpacityAnimationIn");

    btnChoixVideo.val("Choissez une video");

  }
});


    function hideVideoBtn() {

        menuVideo.addClass("fade");
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
            $(webcontener).removeClass("fade");
            $(webcontener).addClass("none2");
            $(webcontener).removeClass('flex2');
            $(webcontener).removeClass('flex');
            $(blocTableau).removeClass("fade")


            if($(blocTableau).hasClass("none2")){
              $(blocTableau).removeClass("none2")
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
        menuVideo.addClass("fadeIn");
        $('#video-youtube').removeClass('fullscreen');
        $('#bloc-horloge').removeClass('none');
        $('video').removeClass('fullscreen');
        $(webcontener).removeClass("none2");
        $(webcontener).removeClass("flex");
        $(webcontener).addClass('flex2');
        $(blocTableau).removeClass("none2")
        

        if(!$('#video-youtube').hasClass('simplescreen')){
            $('#video-youtube').addClass('simplescreen');

            setTimeout(function(){
                $('#video-youtube').removeClass('simplescreen');
            }, 500);
        }



    }

      // fonction pour afficher le menu de choix de vidéo lié 

      function choixvideo() {
        const isNone = blocChoixVideo.hasClass("none");
        blocChoixVideo.toggleClass("none", !isNone);
        blocChoixVideo.toggleClass("flex", isNone);
        videoYoutube.toggleClass("none", isNone);
        videoYoutube.toggleClass("flex", !isNone);
        
        blocChoixVideo.toggleClass("OpacityAnimationIn", isNone);
        blocChoixVideo.toggleClass("OpacityAnimation", !isNone);
        videoYoutube.toggleClass("OpacityAnimationIn", !isNone);
        videoYoutube.toggleClass("OpacityAnimation", isNone);
      
        videoChoix.addClass("none");
        btnChoixVideo.val(isNone ? "Fermez le menu" : "Choissez une video");
      
        // Après l'animation, ajuster les classes
        setTimeout(() => {
          blocChoixVideo.removeClass("OpacityAnimation OpacityAnimationIn");
          videoYoutube.removeClass("OpacityAnimation OpacityAnimationIn");
        }, 500); // Durée de l'animation en millisecondes
      }

  // Fonction pour jouer la vidéo et lancer l'animation
  function playVideo() {
    $('#bloc-choix-video').addClass('OpacityAnimation');
    videoYoutube.addClass("OpacityAnimationIn");
    setTimeout(function() {
      videoYoutube.removeClass("OpacityAnimationIn none");
      videoYoutube.addClass("flex");
      $('#bloc-choix-video').addClass('none');
      $('#bloc-choix-video').removeClass('OpacityAnimation flex');
      $('#choix-video').val("Choissez une video"); // Changer l'état du bouton
    }, 500); // Durée de l'animation
  }

      // EventListener

      $('#choix-video').on('click', choixvideo);
      $('#show').on('click', function() {
        $('#menu-video').removeClass('none');
      });
    // Ajoutez un gestionnaire d'événements pour les éléments de vidéo
      $('.video-item').on('click', playVideo);
      $(accept).on('click', updateYoutubeBtn);
      $(hide).on('click', hideVideoBtn);
      $(show).on('click', showbtn);
      $(btnChoixVideo).on('click', choixvideo);

      $('#choix-video').on('click', choixvideo);

      // Ajoutez un gestionnaire d'événements pour les autres boutons existants
      $('#show').on('click', showbtn);
      $('#accept').on('click', updateYoutubeBtn);
    
      

});








