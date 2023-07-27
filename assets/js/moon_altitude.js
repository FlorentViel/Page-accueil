var lat = 48.8566; // Paris, France
var lng = 2.3522;
var date = new Date();
var moon = $('#moon');
var diameter = 200;
var moonPosition = SunCalc.getMoonPosition(date, lat, lng);
var left = (moonPosition.altitude * diameter) / 2;
var top = (moonPosition.azimuth * diameter) / 2;

moon.css({
  'width': diameter + 'px',
  'height': diameter + 'px',
  'border-radius': '50%',
  'background-image': 'url(https://upload.wikimedia.org/wikipedia/commons/3/33/Lune_ico.png)',
  'background-size': '100% 100%',
  'left': left + 'px',
  'top': top + 'px',
  'transform': 'translate(-50%, -50%)',
  'position' : 'relative'
});


function updateMoonPosition() {
    var lat = 48.8566; // Paris, France
    var lng = 2.3522;
    var date = new Date();
    var moonPosition = SunCalc.getMoonPosition(date, lat, lng);
    
    var moon = $('#moon');
    var diameter = 200;
    var left = (moonPosition.altitude * diameter) / 2;
    var top = (moonPosition.azimuth * diameter) / 2;
    moon.css({
      'width': diameter + 'px',
      'height': diameter + 'px',
      'border-radius': '50%',
      'background-image': 'url(https://upload.wikimedia.org/wikipedia/commons/3/33/Lune_ico.png)',
      'background-size': '100% 100%',
      'left': left + 'px',
      'top': top + 'px',
      'transform': 'translate(-50%, -50%)',
      'position' : 'relative'
    });
    moon.css('opacity', Math.max(0, Math.min((altitude / -0.4) + 0.5, 1)));

  }
  
  console.log('test');

  // Appel de la fonction à intervalle régulier (toutes les 5 secondes)
  setInterval(updateMoonPosition, 5000);
  