# TODO - Intégration Spinning Cat

## 🎯 Objectif Principal
Transformer le code Spinning Cat en jQuery et l'intégrer dans le site avec les thèmes jour/nuit/crépuscule

## 📋 Tâches à accomplir

### 1. **Création des fichiers CSS**
- [ ] Créer `assets/css/spinning-cat.css`
  - [ ] Adapter les couleurs pour le mode jour (bleu/blanc)
  - [ ] Adapter les couleurs pour le mode crépuscule (orange/jaune)
  - [ ] Adapter les couleurs pour le mode nuit (violet/noir)
  - [ ] Ajouter les transitions entre les thèmes
  - [ ] Rendre responsive pour mobile

### 2. **Création du JavaScript jQuery**
- [x] Créer `assets/js/spinning-cat.js`
  - [x] Convertir le code vanilla JS en jQuery
  - [ ] Intégrer la détection du thème actuel (jour/nuit/crépuscule)
  - [ ] Synchroniser les couleurs avec le thème du site
  - [ ] Gérer les contrôles audio
  - [ ] Ajouter les animations et effets

### 3. **Modification du HTML**
- [ ] Modifier `index.html`
  - [ ] Ajouter le lien vers le CSS spinning-cat
  - [ ] Ajouter le script jQuery spinning-cat
  - [ ] Créer la section HTML pour le spinning cat
  - [ ] Renommer "Youtube" en "Audio" ou "Musique" dans la navigation

### 4. **Intégration dans la navigation**
- [ ] Modifier le menu de navigation
  - [ ] Changer "Youtube" → "Audio" ou "Musique"
  - [ ] Ajouter l'événement click pour afficher le spinning cat
  - [ ] Gérer l'affichage/masquage de la section

### 5. **Gestion des thèmes**
- [ ] Synchroniser avec le système de thèmes existant
  - [ ] Détecter le thème actuel (jour/nuit/crépuscule)
  - [ ] Appliquer les bonnes couleurs CSS
  - [ ] Gérer les transitions entre thèmes

### 6. **Fichiers audio**
- [ ] Créer le dossier `assets/audio/` s'il n'existe pas
- [ ] Ajouter les fichiers audio :
  - [ ] `W&W - OIIA OIIA (Spinning Cat).mp3`
  - [ ] `Crash Bandicoot 2 - Komodo Bros. Boss Music.mp3`
  - [ ] `Its TV Time! (BW2 Soundfont) - DELTARUNE.mp3`
  - [ ] `musique-2.mp3`
  - [ ] `musique-3.mp3`

### 7. **Tests et optimisation**
- [ ] Tester sur différents navigateurs
- [ ] Vérifier la compatibilité mobile
- [ ] Optimiser les performances
- [ ] Tester les transitions de thèmes
- [ ] Vérifier le fonctionnement audio

### 8. **Documentation**
- [ ] Ajouter des commentaires dans le code
- [ ] Documenter les nouvelles fonctionnalités
- [ ] Créer un guide d'utilisation si nécessaire

## 🎨 Détails techniques

### Couleurs par thème :
- **Jour** : Bleu (#256aff), Blanc (#ffffff), Bleu clair (#baefff)
- **Crépuscule** : Orange (#ff8c21), Jaune (#ffc003), Rouge (#ff0000)
- **Nuit** : Violet (#6c5ffa), Blanc (#ffffff), Noir (#000000)

### Fonctionnalités à conserver :
- Animation du chat ASCII
- Contrôles de vitesse, taille, volume
- Sélection de musique
- Boutons pause, reverse, audio
- Contrôles clavier (espace, flèches, R, A)
- Effets visuels (glow, pulse)

## ⚠️ Notes importantes
- Utiliser jQuery au lieu de vanilla JavaScript
- Respecter la structure existante du site
- Maintenir la cohérence visuelle avec les thèmes
- Gérer les erreurs audio gracieusement
- Optimiser pour les performances

## 📅 Priorité
1. **Haute** : CSS et structure HTML
2. **Moyenne** : JavaScript jQuery et intégration
3. **Basse** : Tests et optimisation 