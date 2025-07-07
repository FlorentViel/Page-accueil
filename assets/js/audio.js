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
  const $loopBtn = $('#loopBtn');
  const $autoSpeedCheckbox = $('#autoSpeed');
  const $speedDisplay = $('#speedDisplay');
  const $catSound = $('#catSound');
      
      let audioEnabled = false;
  let isLoopMode = true; // Mode boucle par défaut
  let isAutoSpeedEnabled = true; // Vitesse automatique activée par défaut

  // Système de visualisation audio
  let isVisualizerActive = false;

  function initAudioVisualizer() {
    // Vérifier si on peut utiliser l'API Web Audio
    const canUseWebAudio = typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined';
    
    if (!canUseWebAudio) {
      console.log('Web Audio API not supported, using simulated visualizer');
      createSimulatedVisualizer();
      return;
    }
    
    // Vérifier si l'audio est local (fichier local = CORS problématique)
    const audioElement = $catSound[0];
    const isLocalFile = audioElement.src.startsWith('file://') || 
                       audioElement.src.startsWith('./') || 
                       audioElement.src.startsWith('../') ||
                       audioElement.src.includes('localhost') ||
                       !audioElement.src.startsWith('http');
    
    if (isLocalFile) {
      console.log('Local audio file detected, using simulated visualizer (CORS limitation)');
      createSimulatedVisualizer();
      return;
    }
    
    // Essayer le visualiseur réel pour les fichiers distants
    try {
      console.log('Attempting to create real audio visualizer...');
      createRealAudioVisualizer();
    } catch (e) {
      console.log('Real visualizer failed, using simulated:', e);
      createSimulatedVisualizer();
    }
  }

  function createRealAudioVisualizer() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      window.audioContext = new AudioContext();
      const audioElement = $catSound[0];
      
      // Vérifier si l'audio est accessible (pas de CORS)
      if (audioElement.crossOrigin !== 'anonymous' && audioElement.src.startsWith('file://')) {
        console.log('Audio file is local, using simulated visualizer');
        createSimulatedVisualizer();
        return;
      }
      
      // Créer un nœud source à partir de l'élément audio
      const source = window.audioContext.createMediaElementSource(audioElement);
      const analyser = window.audioContext.createAnalyser();
      
      // Configuration de l'analyseur
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      
      // Connecter les nœuds
      source.connect(analyser);
      analyser.connect(window.audioContext.destination);
      
      // Créer un buffer pour les données de fréquence
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      isVisualizerActive = true;
      animateRealVisualizer(analyser, dataArray, bufferLength);
      
    } catch (e) {
      console.log('Real visualizer setup failed (likely CORS issue), using simulated:', e);
      createSimulatedVisualizer();
    }
  }

  function animateRealVisualizer(analyser, dataArray, bufferLength) {
    if (!isVisualizerActive || !audioEnabled || isPaused) return;
    
    const $visualizer = $('.audio-visualizer');
    const barCount = 20;
    
    // Obtenir les données de fréquence
    analyser.getByteFrequencyData(dataArray);
    
    let visualizerHTML = '';
    
    // Calculer la moyenne des données pour chaque barre
    const samplesPerBar = Math.floor(bufferLength / barCount);
    
    for (let i = 0; i < barCount; i++) {
      let sum = 0;
      const startIndex = i * samplesPerBar;
      const endIndex = Math.min(startIndex + samplesPerBar, bufferLength);
      
      for (let j = startIndex; j < endIndex; j++) {
        sum += dataArray[j];
      }
      
      const average = sum / samplesPerBar;
      const height = Math.max(10, Math.min(95, (average / 255) * 100));
      const opacity = 0.3 + (average / 255) * 0.7;
      
      visualizerHTML += `<div class="audio-bar" style="height: ${height}%; opacity: ${opacity};"></div>`;
    }
    
    $visualizer.html(visualizerHTML);
    requestAnimationFrame(() => animateRealVisualizer(analyser, dataArray, bufferLength));
  }

  function createSimulatedVisualizer() {
    isVisualizerActive = true;
    animateSimulatedVisualizer();
  }

  function animateSimulatedVisualizer() {
    if (!isVisualizerActive || !audioEnabled || isPaused) return;
    
    const $visualizer = $('.audio-visualizer');
    const barCount = 20;
    
    // Créer un pattern plus réaliste qui simule le rythme de la musique
    const time = Date.now() * 0.01;
    let visualizerHTML = '';
    
    // Simuler différents types de rythmes selon la musique sélectionnée
    const selectedMusic = $musicSelect.val();
    let rhythmPattern = 1;
    let intensity = 1;
    
    if (selectedMusic.includes('OIIA OIIA')) {
      // Rythme plus rapide et énergique pour la musique EDM
      rhythmPattern = 3;
      intensity = 1.5;
    } else if (selectedMusic.includes('Crash Bandicoot')) {
      // Rythme moyen pour la musique de jeu
      rhythmPattern = 2;
      intensity = 1.2;
    } else if (selectedMusic.includes('DELTARUNE')) {
      // Rythme plus lent et mélodique
      rhythmPattern = 0.5;
      intensity = 0.8;
    } else if (selectedMusic.includes('Bling-Bang-Bang-Born') || selectedMusic.includes('Creepy Nuts')) {
      // Rythme rapide et énergique pour l'anime
      rhythmPattern = 2.5;
      intensity = 1.4;
    }
    
    // Simuler le volume actuel (basé sur le slider de volume)
    const volumeLevel = parseInt($volumeSlider.val()) / 100;
    
    for (let i = 0; i < barCount; i++) {
      // Créer un pattern qui varie selon la position et le temps
      const baseValue = Math.sin(time * rhythmPattern + i * 0.3) * 0.5 + 0.5;
      const rhythmValue = Math.sin(time * 2 * rhythmPattern + i * 0.1) * 0.3 + 0.7;
      const randomValue = Math.random() * 0.2;
      
      // Ajouter des pics de rythme plus réalistes
      const beatValue = Math.sin(time * 4 * rhythmPattern + i * 0.05) * 0.4 + 0.6;
      
      // Simuler des basses plus fortes (premières barres)
      const bassBoost = i < 5 ? 1.3 : 1;
      
      // Simuler des aigus plus subtils (dernières barres)
      const trebleReduction = i > 15 ? 0.7 : 1;
      
      let value = (baseValue * rhythmValue * beatValue * bassBoost * trebleReduction + randomValue) * 100;
      
      // Appliquer l'intensité et le volume
      value = value * intensity * volumeLevel;
      
      const height = Math.max(10, Math.min(95, value)); // Entre 10% et 95%
      const opacity = 0.3 + (value / 100) * 0.7;
      
      visualizerHTML += `<div class="audio-bar" style="height: ${height}%; opacity: ${opacity};"></div>`;
    }
    
    $visualizer.html(visualizerHTML);
    setTimeout(() => animateSimulatedVisualizer(), 50); // 20 FPS pour une animation plus fluide
  }



  function stopVisualizer() {
    isVisualizerActive = false;
    $('.audio-visualizer').html('');
    
    // Nettoyer les ressources audio si elles existent
    if (window.audioContext) {
      try {
        window.audioContext.close();
        window.audioContext = null;
      } catch (e) {
        console.log('Audio context cleanup failed:', e);
      }
    }
  }
  
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
    if (isAutoSpeedEnabled) {
      // Vitesse automatique basée sur la musique
      updateAutoSpeed();
    } else {
      // Vitesse manuelle
      const sliderValue = parseInt($speedSlider.val());
        speed = 550 - sliderValue; // 550 - 150 = 400ms, 550 - 500 = 50ms
      $speedDisplay.text(`Speed: ${speed}ms`);
      startAnimation();
    }
  }

  function updateAutoSpeed() {
    const selectedMusic = $musicSelect.val();
    let autoSpeed;
    
    // Définir la vitesse automatique selon la musique
    if (selectedMusic.includes('OIIA OIIA')) {
      // Musique EDM rapide
      autoSpeed = 100; // 100ms = très rapide
    } else if (selectedMusic.includes('Crash Bandicoot')) {
      // Musique de jeu moyenne
      autoSpeed = 200; // 200ms = rapide
    } else if (selectedMusic.includes('DELTARUNE')) {
      // Musique mélodique lente
      autoSpeed = 350; // 350ms = lent
    } else if (selectedMusic.includes('Bling-Bang-Bang-Born') || selectedMusic.includes('Creepy Nuts')) {
      // Musique d'anime énergique
      autoSpeed = 120; // 120ms = rapide
    } else {
      // Vitesse par défaut
      autoSpeed = 250;
    }
    
    speed = autoSpeed;
    $speedDisplay.text(`Speed: ${speed}ms (Auto)`);
    
    // Mettre à jour le slider pour refléter la vitesse automatique
    const sliderValue = 550 - autoSpeed;
    $speedSlider.val(sliderValue);
    
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
    
    // Le visualiseur simulé se met à jour automatiquement avec le volume
    // car il lit la valeur du slider dans animateSimulatedVisualizer()
      }
  
      function updateMusic() {
    const selectedMusic = $musicSelect.val();
    $catSound.attr('src', selectedMusic);
        
    // Mettre à jour la vitesse automatique si activée
    if (isAutoSpeedEnabled) {
      updateAutoSpeed();
    }
    
    // Redémarrer le visualiseur pour s'adapter à la nouvelle musique
    if (isVisualizerActive) {
      stopVisualizer();
      setTimeout(() => {
        if (!isPaused && audioEnabled) {
          initAudioVisualizer();
        }
      }, 100);
    }
    
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
      // Arrêter le visualiseur
      stopVisualizer();
        } else if (audioEnabled) {
      $catSound[0].play().catch(e => console.log('Audio play failed:', e));
      // Démarrer l'animation de musique
      $('#bloc-choix-audio').addClass('music-playing');
      // Redémarrer le visualiseur
      if (!isVisualizerActive) {
        initAudioVisualizer();
      }
        }
      }
  
      function toggleReverse() {
        isReversed = !isReversed;
    $reverseBtn.text(isReversed ? '⏩ Forward' : '🔄 Reverse');
        
        // Redémarrer l'animation pour que le changement soit immédiat
        startAnimation();
      }

  function toggleLoopMode() {
    isLoopMode = !isLoopMode;
    // Afficher l'action qu'on va effectuer au prochain clic
    $loopBtn.text(isLoopMode ? '⏭️ Passer au suivant' : '🔄 Activer la boucle');
    $loopBtn.toggleClass('active', isLoopMode);
    
    // Mettre à jour le comportement de l'audio
    $catSound[0].loop = isLoopMode;
  }

  function toggleAutoSpeed() {
    isAutoSpeedEnabled = !isAutoSpeedEnabled;
    
    // Activer/désactiver le slider
    $speedSlider.prop('disabled', isAutoSpeedEnabled);
    
    // Mettre à jour la vitesse
    updateSpeed();
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
      // Démarrer le visualiseur
      if (!isVisualizerActive) {
        console.log('Starting visualizer...');
        initAudioVisualizer();
      }
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
  $loopBtn.on('click', toggleLoopMode);
  $autoSpeedCheckbox.on('change', toggleAutoSpeed);
  $audioBtn.on('click', enableAudio);
  
  // Gérer la fin de l'audio
  $catSound.on('ended', function() {
    if (isLoopMode) {
      // Mode boucle : relancer automatiquement
      $catSound[0].play().catch(e => console.log('Audio loop failed:', e));
    } else {
      // Mode suivant : passer à la musique suivante
      const currentIndex = $musicSelect[0].selectedIndex;
      const nextIndex = (currentIndex + 1) % $musicSelect[0].options.length;
      $musicSelect[0].selectedIndex = nextIndex;
      updateMusic();
      
      // Relancer la lecture si pas en pause
      if (!isPaused && audioEnabled) {
        $catSound[0].play().catch(e => console.log('Next music failed:', e));
      }
    }
  });

  // Keyboard controls - seulement si on n'est pas dans un champ de saisie
  $(document).on('keydown', function(e) {
    // Ne pas intercepter les touches si on est dans un champ de saisie
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
      return;
    }
    
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
  $loopBtn.addClass('active'); // Le mode boucle est actif par défaut
  $loopBtn.text('⏭️ Passer au suivant'); // Afficher l'action du prochain clic
  
  // Initialiser la vitesse automatique
  $speedSlider.prop('disabled', true); // Désactiver le slider par défaut
  updateAutoSpeed(); // Appliquer la vitesse automatique initiale
  
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

  // Le visualiseur sera initialisé quand l'audio sera activé

  // Le visualiseur sera initialisé quand l'audio sera activé
      });
  
  
  
  