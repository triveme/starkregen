const drawer = {
  default: "/melder",
  content: [
    {
      title: "Karte",
      url: "/melder",
      icon: "map",
      authRequired: false,
    },

    {
      title: "Meldungen",
      url: "/meldungen",
      icon: "list",
      authRequired: true,
    },
    {
      title: "Informationen",
      url: "/info",
      icon: "info",
      authRequired: false,
    },
    {
      title: "Messnetz",
      url: "/messnetz",
      icon: "sensors",
      authRequired: false,
    },
    {
      title: "Administration",
      url: "/admin",
      icon: "build",
      authRequired: true,
    },
  ],
  width: 250,
};

export default drawer;
