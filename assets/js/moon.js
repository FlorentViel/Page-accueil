let date = new Date(); // Note: les mois sont indexés à partir de 0 en JavaScript, donc 1 représente février
let lat = 50.633;
let lng = 3.0586;

let moonInfo = SunCalc.getMoonIllumination(date, lat, lng);
let phase = moonInfo.phase;

// Calculate the border radius of the shadow
let shadowWidth = Math.abs(1 - phase * 2) * 100;

console.log(phase);

let shadowBorderRadius = 100 - Math.abs((phase - 0.5) * 2) * 100;

// Update the border radius of the shadow
$("#shadow").css("border-radius", shadowBorderRadius + "%");

// Update the width of the shadow
$("#shadow").css("width", shadowWidth + "%");