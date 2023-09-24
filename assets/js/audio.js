
  $(document).ready(function() {
    var hoverSound = new Audio("../assets/sound/click-21156.mp3"); // Créez l'élément audio en dehors de la fonction clic
    var hasInteracted = false; // Variable pour suivre si l'utilisateur a interagi
    
    // Gérez la lecture du son lorsque l'utilisateur clique sur n'importe quel élément .logo
    $(".logo").click(function() {
      // Créez l'élément audio une seule fois
      if (!hasInteracted) {
        hasInteracted = true; // Marquez l'interaction
        hoverSound.currentTime = 0; // Remettez le son à 0
      }
  
      // Lecture du son
      hoverSound.play();
      setTimeout(function() {
        hoverSound.pause();
      }, 500);
    });
  });
  
  
  
  
  
  