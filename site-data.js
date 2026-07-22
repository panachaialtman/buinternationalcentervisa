/**
 * Bangkok University International Center — shared website data
 *
 * Keep labels, contact details, page descriptions, and official links here.
 * Every HTML page loads this file before app.js.
 */
(function () {
  "use strict";

  var site = {
    version: "1.0.0",
    lastReviewed: "22 July 2026",
    locale: "en",

    brand: {
      shortName: "BU International Center",
      universityName: "Bangkok University",
      serviceName: "Visa & Immigration Services",
      description: "Visa and immigration guidance for Bangkok University international students.",
      logoPath: "logo.svg",
      faviconPath: "favicon.svg"
    },

    contact: {
      officeName: "International Center",
      location: "C6 Building, 3rd Floor, Bangkok University (Rangsit Campus)",
      officeHours: "Monday–Saturday, 08:45–16:45",
      lineLabel: "@buintercenter",
      lineUrl: "https://line.me/R/ti/p/%40882hjrcn",
      mapUrl: "https://maps.app.goo.gl/BFbVZ7oW8ib4g9gt6",
      emergencyNote: "If your permission to stay has expired or will expire within 7 days, contact the International Center immediately."
    },

    officialLinks: {
      thaiEVisa: {
        label: "Thai E-Visa",
        url: "https://www.thaievisa.go.th/"
      },
      immigrationBureau: {
        label: "Thai Immigration Bureau",
        url: "https://www.immigration.go.th/"
      },
      online90Day: {
        label: "Online 90-Day Report",
        url: "https://tm47.immigration.go.th/"
      }
    },

    pages: {
      home: {
        file: "index.html",
        title: "Visa & Immigration Services",
        navLabel: "Home",
        eyebrow: "International Center",
        description: "Find the correct visa service, reporting requirement, or urgent guidance for your situation.",
        icon: "home",
        keywords: ["home", "international center", "visa help", "student support"]
      },
      extensionOverview: {
        file: "student-visa-extension.html",
        title: "Student Visa Extension",
        navLabel: "Extension Overview",
        eyebrow: "Visa Services",
        description: "Choose the correct extension process based on your academic and graduation status.",
        icon: "route",
        keywords: ["extension", "renew visa", "permission to stay", "current student"]
      },
      nonEd: {
        file: "non-ed.html",
        title: "NON-ED Extension",
        navLabel: "Current Students — NON-ED",
        eyebrow: "Visa Services",
        description: "Eligibility, documents, deadlines, and procedure for currently enrolled students.",
        icon: "passport",
        keywords: ["non-ed", "current student", "extension", "credits", "registration"]
      },
      nonEdPlus: {
        file: "non-ed-plus.html",
        title: "NON-ED Plus After Graduation",
        navLabel: "Graduation — NON-ED Plus",
        eyebrow: "Visa Services",
        description: "Guidance for final-semester students, graduating students, and graduates.",
        icon: "graduation",
        keywords: ["non-ed plus", "graduate", "graduation", "one year", "re-entry"]
      },
      newStudent: {
        file: "new-student.html",
        title: "New Student Visa",
        navLabel: "New Student Visa",
        eyebrow: "Visa Services",
        description: "Request BU documents, apply for a student visa, and check your entry stamps.",
        icon: "plane",
        keywords: ["new student", "thai e-visa", "embassy", "apply visa", "entry stamp"]
      },
      ninetyDay: {
        file: "90-days.html",
        title: "90-Day Report",
        navLabel: "90-Day Report",
        eyebrow: "Immigration Reporting",
        description: "Understand the reporting window, available methods, documents, and re-entry reset rule.",
        icon: "calendar",
        keywords: ["90 day", "tm47", "report", "online report", "residential address"]
      },
      passport: {
        file: "passport.html",
        legacyFiles: ["update-renew-passport.html"],
        title: "Passport Update or Renewal",
        navLabel: "Passport Update",
        eyebrow: "Immigration Reporting",
        description: "Update BU records and transfer immigration stamps after passport renewal or replacement.",
        icon: "id-card",
        keywords: ["passport", "renew passport", "new passport", "transfer stamp", "lost passport"]
      },
      penalty: {
        file: "penalty.html",
        title: "Missed Deadline or Overstay",
        navLabel: "Urgent: Missed Deadline",
        eyebrow: "Urgent Guidance",
        description: "Understand immediate steps, possible fines, and when to contact the International Center.",
        icon: "warning",
        keywords: ["overstay", "penalty", "fine", "expired", "late", "missed deadline"]
      },
      faq: {
        file: "faq.html",
        title: "Frequently Asked Questions",
        navLabel: "FAQ",
        eyebrow: "Help",
        description: "Answers to common visa, reporting, passport, payment, and office-routing questions.",
        icon: "help",
        keywords: ["faq", "question", "documents", "office", "immigration"]
      },
      contact: {
        file: "contact.html",
        title: "Contact the International Center",
        navLabel: "Contact Us",
        eyebrow: "Help",
        description: "Office location, hours, Line account, urgent-contact guidance, and feedback form.",
        icon: "message",
        keywords: ["contact", "line", "office", "map", "opening hours", "international center"]
      }
    },

    navigation: [
      {
        label: "Start Here",
        items: ["home"]
      },
      {
        label: "Visa Services",
        icon: "passport",
        items: ["extensionOverview", "nonEd", "nonEdPlus", "newStudent"]
      },
      {
        label: "Immigration Reporting",
        icon: "calendar",
        items: ["ninetyDay", "passport"]
      },
      {
        label: "Urgent Guidance",
        icon: "warning",
        tone: "danger",
        items: ["penalty"]
      },
      {
        label: "Help",
        icon: "help",
        items: ["faq", "contact"]
      }
    ],

    quickActions: [
      {
        label: "Visa expiring soon",
        description: "Check the correct extension route and required preparation time.",
        page: "extensionOverview",
        icon: "clock"
      },
      {
        label: "New student application",
        description: "Request BU supporting documents and prepare your visa application.",
        page: "newStudent",
        icon: "plane"
      },
      {
        label: "Complete a 90-day report",
        description: "Check your reporting window and available submission methods.",
        page: "ninetyDay",
        icon: "calendar"
      },
      {
        label: "Urgent visa problem",
        description: "Your stay has expired, a deadline was missed, or you need immediate guidance.",
        page: "penalty",
        icon: "warning",
        tone: "danger"
      }
    ]
  };

  function deepFreeze(object) {
    Object.keys(object).forEach(function (key) {
      var value = object[key];
      if (value && typeof value === "object" && !Object.isFrozen(value)) {
        deepFreeze(value);
      }
    });
    return Object.freeze(object);
  }

  window.BU_VISA_SITE = deepFreeze(site);
}());
