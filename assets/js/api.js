const AgendaDB = "AgendaDB"; // Nom de la base de données Agenda

// Retourner la base de données locale de l'agenda
function getLocalDB() {
    if (!localStorage.getItem(AgendaDB)) {
        localStorage.setItem(AgendaDB, JSON.stringify([]));
    }

    return JSON.parse(localStorage.getItem(AgendaDB));
}

// Mettre à jour la base de données de l'agenda
function updateDB(db) {
    localStorage.setItem(AgendaDB, JSON.stringify(db));
}

// Fonction d'ajout d'une entrée d'agenda
function addAgendaEntry(entry) {
    const db = getLocalDB();

    entry.id = Date.now() + "";
    db.push(entry);
    updateDB(db);
}

// Fonction de mise à jour d'une entrée d'agenda
function updateAgendaEntry(entry) {
    const db = getLocalDB();
    const updatedDb = db.map(function (curEntry) {
        if (curEntry.id === entry.id) {
            return {
                AgendaEntreprise: entry.AgendaEntreprise,
                AgendaObject: entry.AgendaObject,
                AgendaAdresse: entry.AgendaAdresse,
                AgendaDate: entry.AgendaDate,
                AgendaHeureDebut: entry.AgendaHeureDebut,
                AgendaHeureFin: entry.AgendaHeureFin,
                AgendaDatelimite: entry.AgendaDatelimite,
                AgendaLien: entry.AgendaLien,
                AgendaCommentary: entry.AgendaCommentary,
                id: entry.id
            };
        }
        return curEntry;
    });

    updateDB(updatedDb);
}

// Fonction pour supprimer une entrée d'agenda
function deleteAgendaEntry(entryId) {
    const db = getLocalDB();
    const updatedDb = db.filter(function (curEntry) {
        return curEntry.id !== entryId;
    });

    updateDB(updatedDb);
}

// Fonction pour récupérer une entrée d'agenda par son ID
function getAgendaEntry(entryId) {
    const db = getLocalDB();
    const filteredDb = db.filter((entry) => entry.id === entryId);
    if (filteredDb.length > 0) {
        return filteredDb[0];
    }

    return null;
}

// Fonction pour rechercher des entrées d'agenda par le nom de l'entreprise
function searchAgendaEntriesByEntreprise(entreprise) {
    const db = getLocalDB();
    const filteredDb = db.filter((entry) => {
        return entry.AgendaEntreprise.toLowerCase().includes(entreprise.toLowerCase());
    });

    return filteredDb;
}
