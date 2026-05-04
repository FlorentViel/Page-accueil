/**
 * Recherche troll — mots-clés (sans tenir compte de la casse) :
 *   order, commande, fnac, penguin, candy — Penguin FNAC (« Can I take your order ? »), son Penguin_01 ×3.
 *   bonjour / salut — image welcome, légende 😊, son Welcome.
 *   komodo / boss — faux « phase de boss », texte uniquement quelques secondes.
 *   pizza / food — texte café fast-food désert (pas de son).
 *   help / aide — aide absente (pas de son).
 *   sudo — blague pseudo-admin (pas de son).
 *   42 — clin d’œil (pas de son).
 *   loading / chargement — message ironique (pas de son).
 *   toute autre saisie non vide — scène « fallback » (commande invalide + son pingouin ×1).
 */

const SCENE_FALLBACK = 'fallback';

const PENGUIN_IMG = 'assets/images/troll/penguin_01.webp';
const PENGUIN_AUDIO = 'audio/Penguin_01.ogg';
const WELCOME_AUDIO = 'audio/Welcome.wav';
const PIZZA_AUDIO = 'audio/Pizza.wav';
const WELCOME_IMG = 'assets/images/troll/welcome_b.png';
const PIZZA_IMG = 'assets/images/troll/pizza.jpg';
const ELSE_IMG = 'assets/images/troll/else.png';

const trollAudio = new Audio();
trollAudio.preload = 'auto';

let trollAbortToken = 0;
let trollTimerId = null;

const SCENES = {
    order: {
        caption: 'Penguin (Five Nights at Candy’s) — « Can I take your order ? »',
        image: PENGUIN_IMG,
        alt: 'Penguin',
        audio: PENGUIN_AUDIO,
        plays: 3,
        gapMs: 1500,
        sceneId: 'order',
    },
    welcome: {
        caption: 'Bienvenue 😊',
        image: WELCOME_IMG,
        alt: 'Smiley',
        audio: WELCOME_AUDIO,
        plays: 1,
        gapMs: 2800,
        sceneId: 'welcome',
    },
    boss: {
        caption: 'Phase de boss : imagine la musique des Komodo Bros. (Crash 2).',
        image: PENGUIN_IMG,
        alt: 'Boss',
        durationMs: 3800,
        sceneId: 'boss',
    },
    pizza: {
        caption: 'Pizza !!! 🍕',
        image: PIZZA_IMG,
        audio: PIZZA_AUDIO,
        plays: 1,
        gapMs: 2800,
        alt: 'Rien',
        durationMs: 2800,
        sceneId: 'pizza',
    },
    nohelp: {
        caption: 'Aide : fichier introuvable. Essayez « Order » pour un vrai service.',
        image: PENGUIN_IMG,
        alt: 'Aide',
        durationMs: 3200,
    },
    sudo: {
        caption: 'sudo : droits refusés. Le pingouin est root ici.',
        image: PENGUIN_IMG,
        alt: 'Sudo',
        durationMs: 2600,
        sceneId: 'sudo',
    },
    fortytwo: {
        caption: '42 — la question était « Ordre ? »',
        image: PENGUIN_IMG,
        alt: '42',
        durationMs: 3000,
        sceneId: 'fortytwo',
    },
    loadingJoke: {
        caption: 'Chargement… à jamais. (Sauf si vous fermez cette couche.)',
        image: PENGUIN_IMG,
        alt: 'Chargement',
        durationMs: 3500,
        sceneId: 'loadingJoke',
    },

    fallback: {
        caption: 'Erreur : commande invalide.',
        image: PENGUIN_IMG,
        alt: 'Erreur',
        audio: PENGUIN_AUDIO,
        plays: 1,
        gapMs: 0,
        sceneId: SCENE_FALLBACK,
    },
};

const QUERY_TO_SCENE = {
    order: 'order',
    commande: 'order',
    fnac: 'order',
    penguin: 'order',
    ordre: 'order',
    candy: 'order',
    bonjour: 'welcome',
    salut: 'welcome',
    komodo: 'boss',
    boss: 'boss',
    pizza: 'pizza',
    food: 'pizza',
    help: 'nohelp',
    aide: 'nohelp',
    sudo: 'sudo',
    42: 'fortytwo',
    loading: 'loadingJoke',
    chargement: 'loadingJoke',
};

function normalizeQuery(raw) {
    return (raw || '').trim().toLowerCase();
}

function abortTrollPlayback() {
    trollAbortToken++;
    if (trollTimerId !== null) {
        clearTimeout(trollTimerId);
        trollTimerId = null;
    }
    trollAudio.pause();
    trollAudio.currentTime = 0;
    trollAudio.onended = null;
    trollAudio.onerror = null;
}

function hideTrollOverlay() {
    $('#fake-page-loading').removeClass('is-visible');
}

function applySceneToDom(scene) {
    $('#fake-page-loading-caption').text(scene.caption);
    $('#fake-page-loading-img').attr('src', scene.image).attr('alt', scene.alt || '');
}

function finishAudioScene(token) {
    if (token !== trollAbortToken) return;
    trollAudio.onended = null;
    trollAudio.onerror = null;
    trollAudio.pause();
    trollAudio.currentTime = 0;
    hideTrollOverlay();
}

function playTimedScene(scene, token) {
    trollTimerId = window.setTimeout(function () {
        trollTimerId = null;
        if (token !== trollAbortToken) return;
        hideTrollOverlay();
    }, scene.durationMs);
}

function playAudioScene(scene, token) {
    let playsLeft = scene.plays;
    const gapMs = scene.gapMs != null ? scene.gapMs : 1500;

    function playOnce() {
        if (token !== trollAbortToken) return;
        trollAudio.src = scene.audio;
        trollAudio.currentTime = 0;
        try {
            const p = trollAudio.play();
            if (p && typeof p.catch === 'function') p.catch(function () {});
        } catch (_) {}
    }

    function onEnded() {
        if (token !== trollAbortToken) return;
        playsLeft--;
        if (playsLeft <= 0) {
            finishAudioScene(token);
            return;
        }
        trollTimerId = window.setTimeout(function () {
            trollTimerId = null;
            if (token !== trollAbortToken) return;
            playOnce();
        }, gapMs);
    }

    function onError() {
        if (token !== trollAbortToken) return;
        finishAudioScene(token);
    }

    trollAudio.onerror = onError;
    trollAudio.onended = onEnded;

    playOnce();
}

function runTrollScene(sceneId) {
    const scene = SCENES[sceneId];
    if (!scene) return;

    abortTrollPlayback();
    const token = trollAbortToken;

    applySceneToDom(scene);
    $('#fake-page-loading').addClass('is-visible');

    if (scene.audio && scene.plays > 0) {
        playAudioScene(scene, token);
    } else if (scene.durationMs) {
        playTimedScene(scene, token);
    } else {
        hideTrollOverlay();
    }
}

function updateFakeLoading() {
    const norm = normalizeQuery($('#troll-search-input').val());

    if (!norm) {
        abortTrollPlayback();
        hideTrollOverlay();
        return;
    }

    const sceneId = QUERY_TO_SCENE[norm];
    if (sceneId) {
        runTrollScene(sceneId);
    } else {
        runTrollScene(SCENE_FALLBACK);
    }
}

$(function () {
    $(document).on('submit', '#troll-search-form', function (event) {
        event.preventDefault();
        updateFakeLoading();
    });
});

window.addEventListener('pageshow', function (event) {
    if (!event.persisted) return;
    abortTrollPlayback();
    hideTrollOverlay();
});
