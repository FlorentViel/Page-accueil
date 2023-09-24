    function redirectToSearchResults(query) {
        // Créez l'URL de recherche Google en ajoutant la requête à l'URL de base.
        var searchUrl = "https://www.google.com/search?q=" + encodeURIComponent(query);
        
        // Ouvrez la recherche Google dans une nouvelle fenêtre/onglet.
        window.open(searchUrl, '_blank');
        
        // Empêchez le formulaire de soumettre la recherche par défaut.
        return false;
    }
