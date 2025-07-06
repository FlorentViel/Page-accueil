$(document).ready(function() {
  // Fonction pour appliquer le thème au bloc audio
  function applyAudioTheme() {
    const $blocAudio = $('#bloc-choix-audio');
    
    // Détecter le thème actuel en se basant sur les classes ajoutées par script.js
    if ($('#background-image').hasClass('background-jour')) {
      $blocAudio.removeClass('sunset night').addClass('day');
    } else if ($('#background-image').hasClass('background-crepuscule')) {
      $blocAudio.removeClass('day night').addClass('sunset');
    } else if ($('#background-image').hasClass('background-nuit')) {
      $blocAudio.removeClass('day sunset').addClass('night');
    }
  }

  // Appliquer le thème au chargement
  applyAudioTheme();

  // Observer les changements de thème (si vous avez un système de changement de thème)
  // Vous pouvez appeler applyAudioTheme() quand le thème change

  const frames = [
    `            ／＞　  フ
            | 　_　_|
          ／\` ミ＿xノ
         /　　　　 |
        /　 ヽ　　 ﾉ
        │　　|　|　|
    ／￣|　　 |　|　|
    (￣ヽ＿_ヽ_)__)
     ＼二)`,
    `           ／＞　  フ
          ／\` ミ＿xノ
         /　 ＿　_|
        /／⌒　　|
        / -　　- |
       (　・∀・ )ﾉ
        >　　　/
       /　　/|
      (＿／／
       ＼二)`,
    `            ／＞　  フ
            |　⌒　_|
          ／\` ミ＿xノ
         /　　　　 |
        /　(・∀・)ﾉ
        │　　|　|　|
    ／￣|　　 |　|　|
    (￣ヽ＿_ヽ_)__)
     ＼二)`,
    `           ／＞　  フ
          ／\` ミ＿xノ
         /　 ＿　_|
        /／⌒　　|
        / -　　- |
       (　・∀・ )ﾉ
        >　　　/
       /　　/|
      (＿／／
       ＼二)`,
    `          ／＞　  フ
          ／\` ミ＿xノ
         /　 ⌒　_|
        / -　　- |
        /／・∀・|
       (　　　ﾉﾉ )
        >　　　/
       /　　/|
      (＿／／
       ＼二)`,
    `           ／＞　  フ
            | 　_　_|
          ／\` ミ＿xノ
         /　　　　 |
        /　(・∀・) |
    ／￣|　　 |　|　|
    (￣ヽ＿_ヽ_)__)
     ＼二)`,
    `          ／＞　  フ
          ／\` ミ＿xノ
         /　 ＿　_|
        /／⌒　　|
        / -　　- |
       (　・∀・ )ﾉ
        >　　　/
       /　　/|
      (＿／／
       ＼二)`,
    `           ／＞　  フ
            |　⌒　_|
          ／\` ミ＿xノ
         /　　　　 |
        /　(・∀・)ﾉ
        │　　|　|　|
    ／￣|　　 |　|　|
    (￣ヽ＿_ヽ_)__)
     ＼二)`,
    `          ／＞　  フ
          ／\` ミ＿xノ
         /　 ⌒　_|
        / -　　- |
        /／・∀・|
       (　　　ﾉﾉ )
        >　　　/
       /　　/|
      (＿／／
       ＼二)`,
    `           ／＞　  フ
            | 　_　_|
          ／\` ミ＿xノ
         /　　　　 |
        /　(・∀・) |
    ／￣|　　 |　|　|
    (￣ヽ＿_ヽ_)__)
     ＼二)`,
    `           ／＞　  フ
          ／\` ミ＿xノ
         /　 ＿　_|
        /／⌒　　|
        / -　　- |
       (　・∀・ )ﾉ
        >　　　/
       /　　/|
      (＿／／
       ＼二)`,
    `           ／＞　  フ
          ／\` ミ＿xノ
         /　 ⌒　_|
        / -　　- |
        /／・∀・|
       (　　　ﾉﾉ )
        >　　　/
       /　　/|
      (＿／／
       ＼二)`
  ];

  let index = 0;
  let isPaused = true; // En pause par défaut
  let isReversed = false;
  let animationInterval;
  let speed = 150;
  
  // jQuery selectors
  const $catDiv = $('#cat');
  const $speedSlider = $('#speed');
  const $sizeSlider = $('#size');
  const $volumeSlider = $('#volume');
  const $musicSelect = $('#musicSelect');
  const $pauseBtn = $('#pauseBtn');
  const $reverseBtn = $('#reverseBtn');
  const $audioBtn = $('#audioBtn');
  const $speedDisplay = $('#speedDisplay');
  const $catSound = $('#catSound');
  
  let audioEnabled = false;

  function animateCat() {
    if (!isPaused) {
      $catDiv.text(frames[index]);
      
      // Lancer le son seulement au début de l'animation
      if (index === 0 && audioEnabled) {
        createCatSound();
      }
      
      // Logique reverse simplifiée
      if (isReversed) {
        index = index - 1;
        if (index < 0) index = frames.length - 1;
      } else {
        index = (index + 1) % frames.length;
      }
    }
  }

  function startAnimation() {
    if (animationInterval) {
      clearInterval(animationInterval);
    }
    animationInterval = setInterval(animateCat, speed);
  }

  function updateSpeed() {
    const sliderValue = parseInt($speedSlider.val());
    // Inverser la logique : plus la barre est remplie, plus c'est rapide
    speed = 550 - sliderValue; // 550 - 150 = 400ms, 550 - 500 = 50ms
    $speedDisplay.text(`Speed: ${speed}ms`);
    startAnimation();
  }

  function updateSize() {
    const size = parseInt($sizeSlider.val());
    $catDiv.css('fontSize', size + 'px');
    
    // Ajuste aussi la hauteur du conteneur du chat de manière adaptative
    const isFullscreen = $('#bloc-choix-audio').hasClass('fullscreen');
    const baseHeight = isFullscreen 
      ? Math.max(400, window.innerHeight * 0.6) 
      : Math.max(120, window.innerHeight * 0.15);
    const catHeight = Math.max(baseHeight, 200 + size * 3);
    $('.cat-container').css('height', catHeight + 'px');
  }

  function updateVolume() {
    const volume = parseInt($volumeSlider.val());
    $catSound[0].volume = volume / 100;
  }

  function updateMusic() {
    const selectedMusic = $musicSelect.val();
    $catSound.attr('src', selectedMusic);
    
    // Relancer l'audio si il était en cours et que l'audio est activé
    if (!isPaused && audioEnabled) {
      $catSound[0].play().catch(e => console.log('Audio play failed:', e));
    }
  }

  function syncDisplay() {
    // Synchroniser l'affichage de la vitesse avec la logique inversée
    const sliderValue = parseInt($speedSlider.val());
    const currentSpeed = 550 - sliderValue;
    $speedDisplay.text(`Speed: ${currentSpeed}ms`);
    
    // Synchroniser l'affichage de la taille
    const currentSize = parseInt($sizeSlider.val());
    $catDiv.css('fontSize', currentSize + 'px');
    
    // Synchroniser la hauteur du conteneur du chat de manière adaptative
    const isFullscreen = $('#bloc-choix-audio').hasClass('fullscreen');
    const baseHeight = isFullscreen 
      ? Math.max(400, window.innerHeight * 0.6) 
      : Math.max(120, window.innerHeight * 0.15);
    const catHeight = Math.max(baseHeight, 200 + currentSize * 3);
    $('.cat-container').css('height', catHeight + 'px');
    
    // Réinitialiser le sélecteur de musique
    $musicSelect.val('./audio/W&W - OIIA OIIA (Spinning Cat).mp3');
  }

  function togglePause() {
    isPaused = !isPaused;
    $pauseBtn.text(isPaused ? '▶️ Play' : '⏸️ Pause');
    
    // Contrôle l'audio en même temps que l'animation
    if (isPaused) {
      $catSound[0].pause();
      // Arrêter l'animation de musique
      $('#bloc-choix-audio').removeClass('music-playing');
    } else if (audioEnabled) {
      $catSound[0].play().catch(e => console.log('Audio play failed:', e));
      // Démarrer l'animation de musique
      $('#bloc-choix-audio').addClass('music-playing');
    }
  }

  function toggleReverse() {
    isReversed = !isReversed;
    $reverseBtn.text(isReversed ? '⏩ Forward' : '🔄 Reverse');
    
    // Redémarrer l'animation pour que le changement soit immédiat
    startAnimation();
  }

  function enableAudio() {
    audioEnabled = true;
    isPaused = false; // Activer l'animation en même temps que l'audio
    $audioBtn.text('🔊 Audio On');
    $audioBtn.css('background', 'linear-gradient(45deg, #00FF88, #00CC66)');
    $pauseBtn.text('⏸️ Pause'); // Mettre à jour le bouton pause
    
    // Lancer l'animation et l'audio
    startAnimation();
    $catSound[0].play().then(() => {
      console.log('Audio started successfully');
      // Démarrer l'animation de musique
      $('#bloc-choix-audio').addClass('music-playing');
    }).catch(e => {
      console.log('Audio start failed:', e);
      $audioBtn.text('🔇 Click to Enable');
    });
  }

  // Créer un son simple pour le chat
  function createCatSound() {
    if (!audioEnabled) return;
    
    try {
      // Ne pas relancer le son s'il joue déjà
      if ($catSound[0].paused) {
        $catSound[0].play().catch(e => console.log('Audio play failed:', e));
      }
    } catch (e) {
      console.log('Audio not supported:', e);
    }
  }
  
  // Fonction pour jouer le son du chat
  function playCatSound() {
    if (!isPaused && audioEnabled) {
      createCatSound();
    }
  }

  // Event listeners jQuery
  $speedSlider.on('input', updateSpeed);
  $sizeSlider.on('input', updateSize);
  $volumeSlider.on('input', updateVolume);
  $musicSelect.on('change', updateMusic);
  $pauseBtn.on('click', togglePause);
  $reverseBtn.on('click', toggleReverse);
  $audioBtn.on('click', enableAudio);

  // Gérer la fin de l'audio
  $catSound.on('ended', function() {
    // Arrêter l'animation de musique quand l'audio se termine
    $('#bloc-choix-audio').removeClass('music-playing');
    isPaused = true;
    $pauseBtn.text('▶️ Play');
  });

  // Keyboard controls
  $(document).on('keydown', function(e) {
    switch(e.code) {
      case 'Space':
        e.preventDefault();
        togglePause();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        $speedSlider.val(Math.max(50, parseInt($speedSlider.val()) - 10));
        updateSpeed();
        break;
      case 'ArrowRight':
        e.preventDefault();
        $speedSlider.val(Math.min(500, parseInt($speedSlider.val()) + 10));
        updateSpeed();
        break;
      case 'ArrowUp':
        e.preventDefault();
        $volumeSlider.val(Math.min(100, parseInt($volumeSlider.val()) + 5));
        updateVolume();
        break;
      case 'ArrowDown':
        e.preventDefault();
        $volumeSlider.val(Math.max(0, parseInt($volumeSlider.val()) - 5));
        updateVolume();
        break;
      case 'KeyR':
        e.preventDefault();
        toggleReverse();
        break;
      case 'KeyA':
        e.preventDefault();
        if (!audioEnabled) {
          enableAudio();
        }
        break;
    }
  });

  // Add some fun effects
  let clickCount = 0;
  $catDiv.on('click', function() {
    clickCount++;
    if (clickCount % 5 === 0) {
      $catDiv.css('transform', 'scale(1.2) rotate(5deg)');
      playCatSound(); // Son quand on clique
      setTimeout(() => {
        $catDiv.css('transform', 'scale(1) rotate(0deg)');
      }, 200);
    }
  });

  // Initialize
  updateVolume(); // Initialiser le volume à 50%
  syncDisplay(); // Synchroniser l'affichage
  $pauseBtn.text('▶️ Play'); // Le bouton pause affiche "Play" au démarrage
  
  // Afficher le chat dès le début (première frame)
  $catDiv.text(frames[0]);

  // Rendre la fonction globale pour qu'elle puisse être appelée depuis script.js
  window.applyAudioTheme = applyAudioTheme;

  // Vérifier les changements de thème toutes les 500ms pour une réactivité maximale
  setInterval(applyAudioTheme, 500);

  // Recalculer la taille quand la fenêtre est redimensionnée
  $(window).on('resize', function() {
    updateSize();
  });

  // Fonction pour recalculer la taille quand on passe en mode plein écran
  window.recalculateAudioSize = function() {
    updateSize();
  };
});
  
  
  
  