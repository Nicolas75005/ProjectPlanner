import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      navbar: {
        features: 'Features',
        solutions: 'Solutions',
        pricing: 'Pricing',
        login: 'Login',
      },
      hero: {
        title: 'Streamline Your Integration',
        highlight: 'Process',
        subtitle: 'Transform your business integration workflow with our intelligent SaaS platform. Automate requirements gathering, analysis, and implementation planning.',
        cta: 'Get Started',
        secondary: 'Learn More',
      },
      features: {
        title: 'Powerful Features',
        subtitle: 'Everything you need to streamline your integration process',
        security: {
          title: 'Enterprise Security',
          description: 'Bank-grade encryption and GDPR compliance for your data',
        },
        analytics: {
          title: 'Smart Analytics',
          description: 'AI-powered insights and recommendations',
        },
        automation: {
          title: 'Process Automation',
          description: 'Automated workflows and implementation planning',
        },
      },
      how: {
        title: 'How It Works',
        subtitle: 'Four simple steps to transform your integration process',
        step1: {
          title: 'Define Requirements',
          description: 'Complete our intelligent questionnaire',
        },
        step2: {
          title: 'Analysis',
          description: 'Get automated solution recommendations',
        },
        step3: {
          title: 'Planning',
          description: 'Receive detailed implementation plans',
        },
        step4: {
          title: 'Execute',
          description: 'Track progress and manage deployment',
        },
      },
      cta: {
        title: 'Ready to Transform Your Integration Process?',
        description: 'Join thousands of businesses that have streamlined their integration workflow',
        button: 'Start Free Trial',
      },
      footer: {
        description: 'Enterprise-grade integration solutions for modern businesses',
        solutions: 'Solutions',
        company: 'Company',
        contact: 'Contact',
        middleware: 'Middleware',
        saas: 'SaaS Integration',
        automation: 'Automation',
        consulting: 'Consulting',
        about: 'About Us',
        careers: 'Careers',
        blog: 'Blog',
        privacy: 'Privacy',
        rights: 'All rights reserved.',
      },
    },
  },
  fr: {
    translation: {
      navbar: {
        features: 'Fonctionnalités',
        solutions: 'Solutions',
        pricing: 'Tarifs',
        login: 'Connexion',
      },
      hero: {
        title: 'Simplifiez Votre Processus',
        highlight: "d'Intégration",
        subtitle: "Transformez votre flux d'intégration avec notre plateforme SaaS intelligente. Automatisez la collecte des besoins, l'analyse et la planification.",
        cta: 'Commencer',
        secondary: 'En Savoir Plus',
      },
      features: {
        title: 'Fonctionnalités Puissantes',
        subtitle: "Tout ce dont vous avez besoin pour simplifier votre processus d'intégration",
        security: {
          title: 'Sécurité Enterprise',
          description: 'Cryptage bancaire et conformité RGPD pour vos données',
        },
        analytics: {
          title: 'Analyses Intelligentes',
          description: 'Insights et recommandations alimentés par IA',
        },
        automation: {
          title: 'Automatisation',
          description: "Flux de travail et planification automatisés",
        },
      },
      how: {
        title: 'Comment Ça Marche',
        subtitle: 'Quatre étapes simples pour transformer votre processus',
        step1: {
          title: 'Définir les Besoins',
          description: 'Complétez notre questionnaire intelligent',
        },
        step2: {
          title: 'Analyse',
          description: 'Obtenez des recommandations automatisées',
        },
        step3: {
          title: 'Planification',
          description: "Plans détaillés de mise en œuvre",
        },
        step4: {
          title: 'Exécution',
          description: 'Suivez les progrès et gérez le déploiement',
        },
      },
      cta: {
        title: "Prêt à Transformer Votre Processus d'Intégration ?",
        description: 'Rejoignez des milliers d'entreprises qui ont optimisé leur flux de travail',
        button: 'Essai Gratuit',
      },
      footer: {
        description: "Solutions d'intégration de niveau entreprise pour les entreprises modernes",
        solutions: 'Solutions',
        company: 'Entreprise',
        contact: 'Contact',
        middleware: 'Middleware',
        saas: 'Intégration SaaS',
        automation: 'Automatisation',
        consulting: 'Conseil',
        about: 'À Propos',
        careers: 'Carrières',
        blog: 'Blog',
        privacy: 'Confidentialité',
        rights: 'Tous droits réservés.',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;