$(document).ready(function() {
  // Définissez une promesse pour l'API YouTube

  console.log('hello');

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

  function updateYoutubeBtn() {
    var youtubeUrl = $("#in").val();
    var youtubeVideoId = getYoutubeVideoId(youtubeUrl);

    if (youtubeVideoId !== null) {
      if (isDuplicateVideo(youtubeVideoId)) {
        // Afficher le message d'erreur pour les doublons
        showError("#duplicate-error-message");
      } else {
        currentIdVideo = youtubeVideoId;
        player.loadVideoById(youtubeVideoId);

        // Sauvegarder le lien de la vidéo dans le localStorage
        saveVideoLink(youtubeUrl, youtubeVideoId);

        // Afficher le message de validation
        $("#validation-message").removeClass("none").addClass("block");
        $("#error-message").addClass("none").removeClass("block");
        $("#duplicate-error-message").addClass("none").removeClass("block");
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
          <button class="delete-video-btn">Supprimer</button>
        </div>
      `;
      videoList.append(videoItem);
    });

    // Ajouter un gestionnaire d'événements pour les miniatures
    $('.video-link').on('click', function(e) {
      e.preventDefault();
      var videoUrl = $(this).parent().data('url');
      $('#in').val(videoUrl);
      currentIdVideo = getYoutubeVideoId(videoUrl);
      player.cueVideoById(currentIdVideo); // Utilisez cueVideoById pour charger la vidéo sans la lire automatiquement
      player.playVideo(); // Jouez la vidéo après l'avoir chargée
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

  // Ajoutez un gestionnaire d'événements pour le nouveau bouton
  $('#save-video-btn').on('click', updateYoutubeBtn);
});

