
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


$(document).ready(function () {
    // Variable globale pour la vidéo actuelle
    var currentIdVideo = 'jfKfPfyJRdk';
  
    // Créez l'observateur Intersection Observer
    var options = {
      root: null, // Utilisez la fenêtre principale comme zone d'observation
      rootMargin: '0px', // Aucune marge
      threshold: 0.1 // Détectez lorsque 10% de l'élément est visible
    };
  
    var observer = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // L'élément est maintenant visible, exécutez le code YouTube API
          loadYouTubeAPI();
          // Arrêtez d'observer une fois que l'action est effectuée
          observer.unobserve(entry.target);
        }
      });
    }, options);
  
    // Commencez à observer l'élément sessionVideo
    observer.observe($('#session-video')[0]);
  
    // Fonction pour charger la vidéo YouTube lorsque l'API est prête
    function loadYouTubeAPI() {
      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = $('<script></script>');
      tag.attr('src', 'https://www.youtube.com/iframe_api');
      var firstScriptTag = $('script')[0];
      firstScriptTag.parentNode.insertBefore(tag[0], firstScriptTag);
  
      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
  
      window.onYouTubeIframeAPIReady = function () {
        player = new YT.Player('player', {
          height: '1000px',
          width: '562.57px',
          videoId: currentIdVideo,
          events: {
            //'onReady': onPlayerReady,
            //'onStateChange': onPlayerStateChange
          }
        });
      };
  
      // ... (le reste de votre code YouTube)
  
      // Fonction pour mettre à jour la vidéo YouTube
      function updateYoutubeBtn() {
        var youtubeUrl = $("#in").val();
  
        if (getYoutubeVideoId(youtubeUrl) !== null) {
          var youtubeVideoId = getYoutubeVideoId(youtubeUrl);
          currentIdVideo = youtubeVideoId;
          player.loadVideoById(youtubeVideoId);
        } else if (getYoutubeVideoId(youtubeUrl) == null) {
          alert('Erreur de saisi');
        }
      }
  
      // Fonction pour arrêter la vidéo YouTube
      function stopVideo() {
        player.stopVideo();
      }
  
      // Fonction pour extraire l'ID de la vidéo YouTube de l'URL
      function getYoutubeVideoId(url) {
        var youtubeRegex = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
        var match = url.match(youtubeRegex);
        if (match && match[2]) {
          return match[2];
        } else {
          return null;
        }
      }
  
      // Gestionnaire d'événements pour le bouton de mise à jour de la vidéo YouTube
      $("#valide").on('click', updateYoutubeBtn);
  
      // Gestionnaire d'événements pour le bouton d'arrêt de la vidéo YouTube
      // Vous pouvez ajouter d'autres gestionnaires d'événements au besoin.
    }
    
    // ...
  
    // Votre code existant ici
  
  });
  