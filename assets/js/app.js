const app = Vue.createApp({
  data() {
      return {
          messageVisible: false,
          errorEntreprise: false,
          newAgendaEntry: {
              AgendaEntreprise: "",
              AgendaObject: "",
              AgendaAdresse:"",
              AgendaDate: "",
              AgendaHeureDebut: "",
              AgendaHeureFin: "",
              AgendaDatelimite: "",
              AgendaLien: "",
              AgendaCommentary: "",
          },
          agendaEntries: [],
      };
  },
  computed: {
    firstUpdateDate() {
        if (this.agendaEntries.length === 0) {
            return "Aucune entrée d'agenda réalisée";
        }

        const sortedEntries = this.agendaEntries.slice().sort((a, b) =>
            new Date(a.AgendaDate + " " + a.AgendaHeureDebut) - new Date(b.AgendaDate + " " + b.AgendaHeureDebut)
        );
        const firstEntry = sortedEntries[0];

        // Validation des dates
        const startDate = new Date(firstEntry.AgendaDate);
        const endDate = new Date(firstEntry.AgendaDatelimite);
        const startTime = firstEntry.AgendaHeureDebut;
        const endTime = firstEntry.AgendaHeureFin;

        if (
            startDate >= endDate || // La date de début doit être inférieure à la date limite
            (startTime >= endTime && startDate.toString() === endDate.toString()) // L'heure de début doit être inférieure à l'heure de fin
        ) {
            alert("Veuillez vérifier les dates et heures !");
            return; // Ne pas ajouter l'entrée si les validations échouent
        }

        // Parsez la date et l'heure de début de l'entrée en utilisant new Date()
        const entryDateTime = new Date(firstEntry.AgendaDate + " " + firstEntry.AgendaHeureDebut);
        const monthIndex = entryDateTime.getMonth();
        const dayIndex = entryDateTime.getDay();

        // Utilisez les dictionnaires pour obtenir les noms des mois et des jours en français
        const months = {
            0: 'Janvier',
            1: 'Février',
            2: 'Mars',
            3: 'Avril',
            4: 'Mai',
            5: 'Juin',
            6: 'Juillet',
            7: 'Août',
            8: 'Septembre',
            9: 'Octobre',
            10: 'Novembre',
            11: 'Décembre'
        };

        const days = {
            0: 'Dimanche',
            1: 'Lundi',
            2: 'Mardi',
            3: 'Mercredi',
            4: 'Jeudi',
            5: 'Vendredi',
            6: 'Samedi'
        };

        const monthName = months[monthIndex];
        const dayName = days[dayIndex];

        const Nowhours = entryDateTime.getHours();
        const Nowsminutes = entryDateTime.getMinutes();

        const formattedDate = `${dayName}, ${entryDateTime.getDate()} ${monthName} ${entryDateTime.getFullYear()} à ${Nowhours}h${Nowsminutes}m`;

        return formattedDate;
    },
},



  methods: {
      toggleMessage() {
          this.messageVisible = !this.messageVisible;
      },
      submitAgendaEntry() {

          // Validation des dates
          const startDate = new Date(this.newAgendaEntry.AgendaDate);
          const endDate = new Date(this.newAgendaEntry.AgendaDatelimite);
          const startTime = this.newAgendaEntry.AgendaHeureDebut;
          const endTime = this.newAgendaEntry.AgendaHeureFin;

          if (
            (startDate > endDate && startTime >= endTime) || // La date de début doit être strictement inférieure à la date limite et l'heure de début doit être inférieure à l'heure de fin
            (startTime >= endTime && startDate.toString() === endDate.toString()) || // L'heure de début doit être inférieure à l'heure de fin
            !this.newAgendaEntry.AgendaAdresse // Vérification que l'adresse n'est pas vide
        ) {
            alert("Veuillez vérifier les dates, heures, et l'adresse !");
            return; // Ne pas ajouter l'entrée si les validations échouent
          }
        
          if (
              this.newAgendaEntry.AgendaEntreprise !== "" &&
              this.newAgendaEntry.AgendaEntreprise !== null
          ) {
              this.agendaEntries.push({ ...this.newAgendaEntry });
              this.errorEntreprise = false;

              // Réinitialiser le formulaire après la soumission
              this.resetForm();

              // Enregistrer les entrées d'agenda dans le stockage local (facultatif)
              localStorage.setItem("agendaEntries", JSON.stringify(this.agendaEntries));
          } else {
              this.errorEntreprise = true;
              console.log("Pas de donnée dans l'entreprise");
              console.log(this.errorEntreprise);
          }
      },
      resetForm() {
          // Réinitialiser les valeurs du formulaire après la soumission
          this.newAgendaEntry = {
              AgendaEntreprise: "",
              AgendaObject: "",
              AgendaAdresse:"",
              AgendaDate: "",
              AgendaHeureDebut: "",
              AgendaHeureFin: "",
              AgendaDatelimite: "",
              AgendaLien: "",
              AgendaCommentary: "",
          };
      },
      deleteAgendaEntry(index) {
          this.agendaEntries.splice(index, 1);
          localStorage.setItem("agendaEntries", JSON.stringify(this.agendaEntries));
      },

         // Méthode pour formater la date (sans les secondes)
    formatDate(date) {

      const days = {
        0: 'Dimanche',
        1: 'Lundi',
        2: 'Mardi',
        3: 'Mercredi',
        4: 'Jeudi',
        5: 'Vendredi',
        6: 'Samedi'
    };

    const months = {
      0: 'Janvier',
      1: 'Février',
      2: 'Mars',
      3: 'Avril',
      4: 'Mai',
      5: 'Juin',
      6: 'Juillet',
      7: 'Août',
      8: 'Septembre',
      9: 'Octobre',
      10: 'Novembre',
      11: 'Décembre'
  };
    

      const entryDate = new Date(date);
      const dayName = days[entryDate.getDay()];
      const monthName = months[entryDate.getMonth()];
      const formattedDate = `${dayName}, ${entryDate.getDate()} ${monthName} ${entryDate.getFullYear()}`;
      return formattedDate;
  },

  // Méthode pour formater l'heure (sans les secondes)
  formatTime(time) {
      const [hours, minutes] = time.split(':');
      const formattedTime = `${hours}h ${minutes}m`;
      return formattedTime;
  },


      
  },
  mounted() {
      // Récupérer les entrées d'agenda depuis le stockage local lors de la première exécution
      const storedAgendaEntries = localStorage.getItem("agendaEntries");
      if (storedAgendaEntries) {
          this.agendaEntries = JSON.parse(storedAgendaEntries);
      }

      // Afficher les entrées d'agenda déjà postées dans la console
      console.log("Entrées d'agenda déjà postées : ", this.agendaEntries);
  },
});

app.mount("#app");
