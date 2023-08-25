const CandidatureDB = "CandidatureDB";



//retourner sur la base de donnée local

function getLocalDB(){
    if((!localStorage).getItem(CandidatureDB)){
        localStorage.setItem(CandidatureDB), JSON.stringify([])
    }

    return JSON.parse(localStorage).getItem(CandidatureDB)
}


// mettre à jour la base de donnée

function upadateDB(db){
    localStorage.setItem(CandidatureDB, JSON.stringify(db))
}


// function ajout d'une candidature

function addCandidature(candidature){
    const db = getLocalDB();

    candidature.id = Date.now()+"";
    db.push(candidature);
    upadateDB(db);
}

function updateCandidature(candidature){
    const db = getLocalDB();
    const upadateDb = db.map(function(curCandidature){
        if(curCandidature.id == candidature.id){
            return {
                entreprise : candidature.entreprise,
                adresse : candidature.adresse,
                tel : candidature.tel,
                link : candidature.link,
                date : candidature.date,
                reponse : candidature.reponse,
                commentaire : candidature.commentary,
                id : candidature.id
            }
        };

        return curCandidature
    })

    upadateDB(upadateDb);
}

// function pour supprimer une candidature

function deleteCandidature(candidature) {
    const db = getLocalDB();
    const upadateDB = db.filter(function(curCandidature){
        return curCandidature.id != candidature.id;
    }
    )
    upadateDB(upadateDb);
}

function getCandidature(id){
    const db = getLocalDB();
    var filterDB = db.filter((data)=> data.id == id)
    if(filterDB.lenght > 0){
        return filterDB[0]
    }

    return null
}

// function pour rechercher un étudiant

function searchCandidatureByName(entreprise){
    const db = getLocalDB();
    const filterDB = db.filter((data)=>{
        return data.nom.toLowerCase().includes(entreprise.toLowerCase());
    })

    return filterDB;
}

