const app = Vue.createApp({
    data() {
      return {
        messageVisible: false,
        errorEntreprise: false,
        newAgendaEntry: {
          AgendaEntreprise: "",
          AgendaObject: "",
          AgendaAdresse: "",
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
      nextAppointmentDate() {
        if (this.agendaEntries.length === 0) {
          return "Aucun rendez-vous prévu";
        }
  
        const currentDate = new Date();
        const sortedEntries = this.agendaEntries
          .filter(entry => {
            const entryDateTime = new Date(
              entry.AgendaDate + " " + entry.AgendaHeureDebut
            );
            return entryDateTime > currentDate;
          })
          .sort((a, b) =>
            new Date(a.AgendaDate + " " + a.AgendaHeureDebut) -
            new Date(b.AgendaDate + " " + b.AgendaHeureDebut)
          );
  
        if (sortedEntries.length === 0) {
          return "Aucun rendez-vous futur prévu";
        }
  
        const nextAppointment = sortedEntries[0];
  
        const formattedDate = this.formatDate(nextAppointment.AgendaDate);
        const formattedStartTime = this.formatTime(nextAppointment.AgendaHeureDebut);
  
        const formattedDateTime = `${formattedDate} à ${formattedStartTime}`;
  
        return formattedDateTime;
      },
    },
    methods: {
      toggleMessage() {
        this.messageVisible = !this.messageVisible;
      },
      submitAgendaEntry() {
        const startDate = new Date(`${this.newAgendaEntry.AgendaDate}T${this.newAgendaEntry.AgendaHeureDebut}`);
        const endDate = new Date(`${this.newAgendaEntry.AgendaDatelimite}T${this.newAgendaEntry.AgendaHeureFin}`)
        const startTime = this.newAgendaEntry.AgendaHeureDebut;
        const endTime = this.newAgendaEntry.AgendaHeureFin;

        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
      
  
        const formattedStartDate = this.formatDate(startDate);
        const formattedEndDate = this.formatDate(endDate);
        const formattedStartTime = this.formatTime(startTime);
        const formattedEndTime = this.formatTime(endTime);
  
        if (
          !startDate ||
          !endDate ||
          !startTime ||
          !endTime ||
          !this.newAgendaEntry.AgendaAdresse ||
          !this.newAgendaEntry.AgendaEntreprise
        ) {
          alert("Veuillez remplir tous les champs obligatoires !");
          return;
        }
  
        if (isNaN(endDate.getTime())) {
          alert("Veuillez entrer une date valide pour AgendaDatelimite !");
          return;
        }
  
        if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(endTime)) {
          alert("Veuillez entrer une heure valide pour AgendaHeureFin (format HH:mm) !");
          return;
        }
  
        if (endDate < startDate) {
          console.log(startDate);
          console.log(endDate);
          alert("La date de fin (AgendaDatelimite) doit être ultérieure à la date de début (AgendaDate) !");
          return;
        }

        console.log(startDate);
        console.log(endDate);
        
  
        if (
          (formattedStartDate > formattedEndDate && formattedStartTime >= formattedEndTime) ||
          (formattedStartTime >= formattedEndTime && formattedStartDate.toString() === endDate.toString()) ||
          !this.newAgendaEntry.AgendaAdresse
        ) {
          alert("Veuillez vérifier les dates, heures, et l'adresse !");
          return;
        }
  
        if (
          this.newAgendaEntry.AgendaEntreprise !== "" &&
          this.newAgendaEntry.AgendaEntreprise !== null
        ) {
          this.agendaEntries.push({ ...this.newAgendaEntry });
          this.errorEntreprise = false;
  
          this.resetForm();
  
          localStorage.setItem("agendaEntries", JSON.stringify(this.agendaEntries));
        } else {
          this.errorEntreprise = true;
        }


      },
      resetForm() {
        this.newAgendaEntry = {
          AgendaEntreprise: "",
          AgendaObject: "",
          AgendaAdresse: "",
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
      formatDate(date) {
        const options = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };
  
        return new Date(date).toLocaleDateString('fr-FR', options);
      },
      formatTime(time) {
        const [hours, minutes] = time.split(':');
        return `${hours}h${minutes}`;
      },

  isCurrentAppointment(agendaEntry) {
    const currentDate = new Date();
    const startDate = new Date(agendaEntry.AgendaDate + " " + agendaEntry.AgendaHeureDebut);
    const endDate = new Date(agendaEntry.AgendaDatelimite + " " + agendaEntry.AgendaHeureFin);


    return startDate <= currentDate && endDate >= currentDate;
  },


  // Fonction pour déterminer si un rendez-vous est passé
  isPastDate(agendaEntry) {
    const currentDate = new Date();
    const endDate = new Date(agendaEntry.AgendaDatelimite + " " + agendaEntry.AgendaHeureFin);

    return endDate < currentDate;
  },



  // Fonction pour obtenir la classe CSS en fonction de l'état du rendez-vous
  getRowClass(agendaEntry) {
    if (this.isCurrentAppointment(agendaEntry)) {
      return "currentAppointment";
    } 
      else if (this.isPastDate(agendaEntry)) {
      return "pastDate";
    } else {
      return ""; // Aucune classe par défaut
    }
  }
    },
    mounted() {
      const storedAgendaEntries = localStorage.getItem("agendaEntries");
      if (storedAgendaEntries) {
        this.agendaEntries = JSON.parse(storedAgendaEntries);
    
        // Triez les entrées par date
        this.agendaEntries.sort((a, b) => {
          const dateA = new Date(a.AgendaDate + " " + a.AgendaHeureDebut);
          const dateB = new Date(b.AgendaDate + " " + b.AgendaHeureDebut);
          return dateA - dateB;
        });
      }
    },
  });
  
  app.mount("#app");
  