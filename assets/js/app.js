const app = Vue.createApp({
    data() {
      return {
        messageVisible: false,
        errorEntreprise: false,

        newCandidature: {
          entreprise: "",
          adresse: "",
          tel: "",
          link: "",
          date: "",
          reponse: "",
          commentaire: "",
        },
        candidatures: [],



      };

    },


    computed: {
      lastUpdateDate() {
        if (this.candidatures.length === 0) {
          return "Aucune candidature disponible";
        }
  
        const sortedCandidatures = this.candidatures.slice().sort((a, b) =>
          new Date(b.date) - new Date(a.date)
        );
        const lastCandidature = sortedCandidatures[0];
  
        return lastCandidature.date;
      },
    },

    methods: {

      toggleMessage() {
        this.messageVisible = !this.messageVisible;
      },
      submitCandidature() {
        // Ajouter la nouvelle candidature à la liste des candidatures

        if(this.newCandidature.entreprise !== "" && this.newCandidature.entreprise !== null){
            this.candidatures.push({ ...this.newCandidature });
            this.errorEntreprise = false;
  
            // Réinitialiser le formulaire après la soumission
            this.resetForm();

      
            // Enregistrer les candidatures dans le stockage local (facultatif)
            localStorage.setItem('candidatures', JSON.stringify(this.candidatures));
        }

        else{


            this.errorEntreprise = true;
            console.log("pas de donnée dans entreprise");
            console.log(this.errorEntreprise);
        }



      },
      resetForm() {
        // Réinitialiser les valeurs du formulaire après la soumission
        this.newCandidature = {
          entreprise: "",
          adresse: "",
          tel: "",
          link: "",
          date: "",
          reponse: "",
          commentaire: "",
        };
      },

      deleteCandidature(index){
        this.candidatures.splice(index, 1);
        localStorage.setItem('candidatures', JSON.stringify(this.candidatures));
      }

    },
    mounted() {
      // Récupérer les candidatures depuis le stockage local lors de la première exécution
      const storedCandidatures = localStorage.getItem('candidatures');
      if (storedCandidatures) {
        this.candidatures = JSON.parse(storedCandidatures);
      }
  
      // Afficher les candidatures déjà postées dans la console
      console.log("Candidatures déjà postées : ", this.candidatures);
    },
  });
  
  app.mount('#app');
  