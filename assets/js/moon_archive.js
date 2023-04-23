// Récupère l'élément de la lune
const moonEl = document.querySelector(".moon");

// Met à jour la phase de la lune toutes les 30 minutes
setInterval(() => {
  // Obtient la date et l'emplacement actuels
  const date = new Date();
  const latitude = 48.85; // Latitude de Paris
  const longitude = 2.35; // Longitude de Paris

  // Calcule la phase de la lune à partir de la bibliothèque suncalc.js
  const moonIllumination = SunCalc.getMoonIllumination(date);
  const phase = moonIllumination.phase;

  // Met à jour le style CSS de la lune en fonction de la phase
  moonEl.setAttribute("data-luminosity", phase);
}, 30 * 60 * 1000); // 30 minutes


// Récupère l'élément de la lune
const moon = document.querySelector(".moon");

// Détermine la phase de la lune actuelle avec suncalc.js
const moonPhase = SunCalc.getMoonIllumination(new Date());

// Met à jour la phase de la lune
moon.dataset.luminosity = moonPhase.phase;

// Met à jour la position du marqueur de la phase éclairée
const phaseMarker = moon.querySelector("::after");
if (phaseMarker) {
  const phaseAngle = 180 * moonPhase.angle / Math.PI;
  phaseMarker.style.transform = `rotate(${phaseAngle}deg)`;
}
