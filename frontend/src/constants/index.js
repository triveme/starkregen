import gewaesserengstelle from "../assets/images/categories/Gewaesserengstelle.JPG";
import ueberstauKanal from "../assets/images/categories/Kanal.jpg";
import verstopfterDurchlass from "../assets/images/categories/VerstopfterDurchlass.jpg";
import ueberschwemmung from "../assets/images/categories/Ueberschwemmung.jpg";
import ueberlasteteGraeben from "../assets/images/categories/UeberlasteteGraeben.JPG";

export const CATEGORY_NAMES = {
  CATAGLYSM: "Überschwemmung",
  CHANNEL_FLOODING: "Überstau Kanal",
  BLOCKED_PASSAGE: "Verstopfter Durchlass",
  BOTTLENECK: "Gewässerengstellen",
  OVERLOADED_DITCH: "Überlastete Gräben",
  MISCELLANEOUS: "Sonstiges",
};

const CATEGORY_ICONS = {
  CATAGLYSM: "flood",
  CHANNEL_FLOODING: "canal",
  BLOCKED_PASSAGE: "blocked",
  BOTTLENECK: "narrow",
  OVERLOADED_DITCH: "waterdamage",
  MISCELLANEOUS: "smallCircle",
};

const CATEGORY_IMAGES = {
  CATAGLYSM: ueberschwemmung,
  CHANNEL_FLOODING: ueberstauKanal,
  BLOCKED_PASSAGE: verstopfterDurchlass,
  BOTTLENECK: gewaesserengstelle,
  OVERLOADED_DITCH: ueberlasteteGraeben,
  MISCELLANEOUS: null,
};

const CATEGORY_DESCRIPTION = {
  CATAGLYSM:
    "Bezeichnet den Zustand, bei dem eine normalerweise trockenliegende Bodenfläche vollständig mit Wasser bedeckt ist.",
  CHANNEL_FLOODING:
    "Zustand, bei dem der Wasserstand die Geländeoberkante erreicht und das Wasser aus dem Kanalnetz auszutreten beginnt bzw. zufließendes Wasser nicht vom Kanalnetz aufgenommen werden kann.",
  BLOCKED_PASSAGE:
    "Bspw. durch Holz und Ablagerungen verstopfter Durchlass, sodass Wasser aufgestaut wird und nicht ordnungsgemäß abfließen kann.",
  BOTTLENECK:
    "Hierbei werden bspw. Querbauwerke wie Brückenpfeiler oder Unterführungen beschrieben, die bei einem Starkregenereignis Hindernisse für den schadlosen Abfluss des Wassers darstellen.",
  OVERLOADED_DITCH:
    "Ein Graben, dessen normales Profil vollständig mit Wasser gefüllt ist. Hierbei kann/ oder tritt bereits Wasser über das Ufer des Grabens.",
  MISCELLANEOUS: "Sonstiges",
};

export const CATEGORIES = [
  {
    name: CATEGORY_NAMES.CATAGLYSM,
    icon: CATEGORY_ICONS.CATAGLYSM,
    description: CATEGORY_DESCRIPTION.CATAGLYSM,
    img: CATEGORY_IMAGES.CATAGLYSM,
  },
  {
    name: CATEGORY_NAMES.CHANNEL_FLOODING,
    icon: CATEGORY_ICONS.CHANNEL_FLOODING,
    description: CATEGORY_DESCRIPTION.CHANNEL_FLOODING,
    img: CATEGORY_IMAGES.CHANNEL_FLOODING,
  },
  {
    name: CATEGORY_NAMES.BLOCKED_PASSAGE,
    icon: CATEGORY_ICONS.BLOCKED_PASSAGE,
    description: CATEGORY_DESCRIPTION.BLOCKED_PASSAGE,
    img: CATEGORY_IMAGES.BLOCKED_PASSAGE,
  },
  {
    name: CATEGORY_NAMES.BOTTLENECK,
    icon: CATEGORY_ICONS.BOTTLENECK,
    description: CATEGORY_DESCRIPTION.BOTTLENECK,
    img: CATEGORY_IMAGES.BOTTLENECK,
  },
  {
    name: CATEGORY_NAMES.OVERLOADED_DITCH,
    icon: CATEGORY_ICONS.OVERLOADED_DITCH,
    description: CATEGORY_DESCRIPTION.OVERLOADED_DITCH,
    img: CATEGORY_IMAGES.OVERLOADED_DITCH,
  },
  {
    name: CATEGORY_NAMES.MISCELLANEOUS,
    icon: CATEGORY_ICONS.MISCELLANEOUS,
    description: CATEGORY_DESCRIPTION.MISCELLANEOUS,
    img: CATEGORY_IMAGES.MISCELLANEOUS,
  },
];
