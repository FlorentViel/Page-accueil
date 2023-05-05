

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

  console.log(thisVideo);

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
          source.attr('src', '../video/default_video.mp4');
          url.attr('href', '../video/default_video.mp4');
          break;
      }
  }

  source.attr('type', 'video/mp4');
  video.html('');
  video.append(source);
  video.append(url);
}
