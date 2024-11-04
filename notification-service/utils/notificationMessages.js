const messages = {
    reminder: {
      daily: "N'oubliez pas de faire un peu d'exercice aujourd'hui ! Chaque pas compte !",
      weekly: "Il est temps de faire le point sur votre activité cette semaine. Restez motivé !",
      monthly: "Ce mois-ci, vous avez bien progressé. Continuez sur cette lancée !"
    },
    motivation: {
      daily: "Gardez la forme ! Une nouvelle journée pour avancer vers vos objectifs.",
      weekly: "Cette semaine, repoussez vos limites. Vous êtes capable de grandes choses !",
      monthly: "Ce mois-ci, votre détermination est impressionnante. Continuez à vous surpasser !"
    },
    challenge: {
      daily: "Défi du jour : essayez de marcher 10 000 pas. Prêt à relever le défi ?",
      weekly: "Défi de la semaine : faites trois séances de sport. À vos marques, prêts, partez !",
      monthly: "Défi du mois : améliorez votre record personnel. Chaque effort compte !"
    }
  };
  
  function getMessage(type, frequency) {
    return messages[type]?.[frequency] || "Continuez votre progression !";
  }
  
  module.exports = getMessage;
  