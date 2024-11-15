import React from 'react';
import { useFormContext } from 'react-hook-form';
import { 
  ClipboardList, 
  Settings, 
  Code, 
  TestTube, 
  BookOpen,
  CheckCircle2,
  Calendar,
  Download,
  Layout,
  Server,
  Shield,
  Workflow,
  Database,
  Users
} from 'lucide-react';
import { jsPDF } from 'jspdf';

interface Task {
  title: string;
  description: string;
  deliverables: string[];
}

interface Phase {
  title: string;
  duration: string;
  icon: React.ElementType;
  tasks: Task[];
}

export default function DetailedPlan() {
  const { watch } = useFormContext();
  const formData = watch();

  const generatePlanByType = () => {
    const serviceType = formData.currentSystems;
    const { complexity } = getBudgetRange(formData.budget);
    const priorities = formData.priorities || [];
    const totalWeeks = getTimelineDuration(formData.timeline).weeks;

    // Common phases for all project types
    const commonPhases: Phase[] = [
      {
        title: "Lancement du Projet",
        duration: `${getPhaseWeeks(15)} semaines`,
        icon: ClipboardList,
        tasks: [
          {
            title: "Réunion de cadrage",
            description: "Clarification des besoins, priorités et contraintes",
            deliverables: ["Document de cadrage validé", "Liste des objectifs"]
          },
          {
            title: "Analyse initiale",
            description: "Évaluation de l'existant et identification des risques",
            deliverables: ["Rapport d'analyse", "Matrice des risques"]
          }
        ]
      },
      {
        title: "Conception et Planification",
        duration: `${getPhaseWeeks(20)} semaines`,
        icon: Settings,
        tasks: [
          {
            title: "Spécifications fonctionnelles",
            description: "Rédaction des spécifications détaillées",
            deliverables: ["Cahier des charges", "Schémas d'architecture"]
          },
          {
            title: "Planification détaillée",
            description: "Établissement des phases et jalons",
            deliverables: ["Planning détaillé", "Plan de ressources"]
          }
        ]
      }
    ];

    // Service-specific phases
    let specificPhases: Phase[] = [];

    switch (serviceType) {
      case 'saas':
        specificPhases = generateSaaSPhases(complexity, priorities);
        break;
      case 'automation':
        specificPhases = generateAutomationPhases(complexity, priorities);
        break;
      case 'integration':
        specificPhases = generateMiddlewarePhases(complexity, priorities);
        break;
    }

    // Common closing phases
    const closingPhases: Phase[] = [
      {
        title: "Déploiement",
        duration: `${getPhaseWeeks(15)} semaines`,
        icon: Server,
        tasks: [
          {
            title: "Mise en production",
            description: "Déploiement progressif et validation",
            deliverables: ["Rapport de déploiement", "Checklist de validation"]
          },
          {
            title: "Formation",
            description: "Formation des utilisateurs et administrateurs",
            deliverables: ["Support de formation", "Guides d'utilisation"]
          }
        ]
      }
    ];

    if (complexity !== 'low') {
      closingPhases.push({
        title: "Suivi et Maintenance",
        duration: `${getPhaseWeeks(10)} semaines`,
        icon: Settings,
        tasks: [
          {
            title: "Support initial",
            description: "Période de garantie et assistance technique",
            deliverables: ["Procédures de support", "Rapport de suivi"]
          },
          {
            title: "Évolutions",
            description: "Améliorations continues et maintenance",
            deliverables: ["Plan d'évolution", "Rapport de maintenance"]
          }
        ]
      });
    }

    return [...commonPhases, ...specificPhases, ...closingPhases];
  };

  const generateSaaSPhases = (complexity: string, priorities: string[]): Phase[] => {
    const phases: Phase[] = [
      {
        title: "Conception UX/UI",
        duration: `${getPhaseWeeks(20)} semaines`,
        icon: Layout,
        tasks: [
          {
            title: "Design d'interface",
            description: "Création des wireframes et prototypes",
            deliverables: ["Maquettes", "Prototypes interactifs"]
          },
          {
            title: "Validation UX",
            description: "Tests utilisateurs et optimisation",
            deliverables: ["Rapport d'utilisabilité", "Design system"]
          }
        ]
      },
      {
        title: "Développement",
        duration: `${getPhaseWeeks(30)} semaines`,
        icon: Code,
        tasks: [
          {
            title: "Backend & API",
            description: "Développement des services et API",
            deliverables: ["API documentée", "Tests d'intégration"]
          },
          {
            title: "Frontend",
            description: "Développement de l'interface utilisateur",
            deliverables: ["Application responsive", "Tests E2E"]
          }
        ]
      }
    ];

    if (priorities.includes('Sécurité')) {
      phases.push({
        title: "Sécurité & Conformité",
        duration: `${getPhaseWeeks(15)} semaines`,
        icon: Shield,
        tasks: [
          {
            title: "Sécurisation RGPD",
            description: "Mise en conformité et sécurisation des données",
            deliverables: ["Rapport de conformité", "Documentation RGPD"]
          },
          {
            title: "Tests de sécurité",
            description: "Audit et tests de pénétration",
            deliverables: ["Rapport d'audit", "Plan de remédiation"]
          }
        ]
      });
    }

    return phases;
  };

  const generateAutomationPhases = (complexity: string, priorities: string[]): Phase[] => {
    const phases: Phase[] = [
      {
        title: "Audit des Processus",
        duration: `${getPhaseWeeks(20)} semaines`,
        icon: Workflow,
        tasks: [
          {
            title: "Analyse des tâches",
            description: "Identification et analyse des processus à automatiser",
            deliverables: ["Cartographie des processus", "Rapport d'optimisation"]
          },
          {
            title: "Étude de faisabilité",
            description: "Évaluation technique et ROI",
            deliverables: ["Rapport de faisabilité", "Estimation des gains"]
          }
        ]
      }
    ];

    if (complexity !== 'low') {
      phases.push({
        title: "Développement Workflows",
        duration: `${getPhaseWeeks(25)} semaines`,
        icon: Code,
        tasks: [
          {
            title: "Scripts d'automatisation",
            description: "Développement des scripts et workflows",
            deliverables: ["Scripts documentés", "Tests unitaires"]
          },
          {
            title: "Intégration",
            description: "Configuration des outils et orchestration",
            deliverables: ["Documentation technique", "Plan de déploiement"]
          }
        ]
      });
    }

    return phases;
  };

  const generateMiddlewarePhases = (complexity: string, priorities: string[]): Phase[] => {
    const phases: Phase[] = [
      {
        title: "Analyse Technique",
        duration: `${getPhaseWeeks(20)} semaines`,
        icon: Database,
        tasks: [
          {
            title: "Audit de version",
            description: "Analyse des impacts et compatibilité",
            deliverables: ["Rapport de compatibilité", "Plan de migration"]
          },
          {
            title: "Planification technique",
            description: "Définition de la stratégie de mise à jour",
            deliverables: ["Plan d'intervention", "Plan de rollback"]
          }
        ]
      }
    ];

    if (complexity !== 'low') {
      phases.push({
        title: "Migration",
        duration: `${getPhaseWeeks(25)} semaines`,
        icon: Server,
        tasks: [
          {
            title: "Préparation",
            description: "Configuration et tests préliminaires",
            deliverables: ["Environnement de test", "Procédures de migration"]
          },
          {
            title: "Exécution",
            description: "Migration des données et mise à jour",
            deliverables: ["Rapport de migration", "Tests de validation"]
          }
        ]
      });
    }

    return phases;
  };

  const getTimelineDuration = (timeline: string) => {
    const durations = {
      'automation': {
        '1-2': { weeks: 4, label: '1-2 mois' },
        '2-4': { weeks: 12, label: '2-4 mois' },
        '4-6': { weeks: 20, label: '4-6 mois' },
        '6+': { weeks: 24, label: '6+ mois' }
      },
      'saas': {
        '3-6': { weeks: 16, label: '3-6 mois' },
        '6-12': { weeks: 32, label: '6-12 mois' },
        '12-18': { weeks: 56, label: '12-18 mois' },
        '18+': { weeks: 72, label: '18+ mois' }
      },
      'integration': {
        '1-2w': { weeks: 2, label: '1-2 semaines' },
        '2-4w': { weeks: 4, label: '2-4 semaines' },
        '1-2m': { weeks: 6, label: '1-2 mois' },
        '2m+': { weeks: 8, label: '2+ mois' }
      }
    };

    const serviceTimelines = durations[formData.currentSystems as keyof typeof durations];
    return serviceTimelines?.[timeline as keyof typeof serviceTimelines] || { weeks: 12, label: '3 mois' };
  };

  const getBudgetRange = (budget: string) => {
    const ranges = {
      'automation': {
        '5k-20k': { min: 5000, max: 20000, complexity: 'low' },
        '20k-50k': { min: 20000, max: 50000, complexity: 'medium' },
        '50k-100k': { min: 50000, max: 100000, complexity: 'high' },
        '100k+': { min: 100000, max: 200000, complexity: 'enterprise' }
      },
      'saas': {
        '10k-50k': { min: 10000, max: 50000, complexity: 'low' },
        '50k-100k': { min: 50000, max: 100000, complexity: 'medium' },
        '100k-500k': { min: 100000, max: 500000, complexity: 'high' },
        '500k+': { min: 500000, max: 1000000, complexity: 'enterprise' }
      },
      'integration': {
        '2k-10k': { min: 2000, max: 10000, complexity: 'low' },
        '10k-25k': { min: 10000, max: 25000, complexity: 'medium' },
        '25k-50k': { min: 25000, max: 50000, complexity: 'high' },
        '50k+': { min: 50000, max: 100000, complexity: 'enterprise' }
      }
    };

    const serviceBudgets = ranges[formData.currentSystems as keyof typeof ranges];
    return serviceBudgets?.[budget as keyof typeof serviceBudgets] || { min: 0, max: 0, complexity: 'medium' };
  };

  const getPhaseWeeks = (basePercentage: number) => {
    const { weeks: totalWeeks } = getTimelineDuration(formData.timeline);
    const priorities = formData.priorities || [];
    let adjustedPercentage = basePercentage;

    priorities.forEach(priority => {
      switch (priority) {
        case 'ROI':
        case 'Rapidité d\'exécution':
          adjustedPercentage *= 0.9;
          break;
        case 'Tests':
        case 'Sécurité':
          adjustedPercentage *= 1.2;
          break;
        case 'Formation':
        case 'Documentation':
          adjustedPercentage *= 1.1;
          break;
      }
    });

    return Math.max(1, Math.round((totalWeeks * adjustedPercentage) / 100));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const phases = generatePlanByType();
    
    // Add header
    doc.setFontSize(20);
    doc.text('Plan d\'Implémentation Détaillé', 20, 20);
    
    let yPosition = 40;
    
    phases.forEach((phase, index) => {
      // Add phase title
      doc.setFontSize(16);
      doc.text(`${index + 1}. ${phase.title}`, 20, yPosition);
      yPosition += 10;
      
      // Add duration
      doc.setFontSize(12);
      doc.text(`Durée: ${phase.duration}`, 25, yPosition);
      yPosition += 10;
      
      // Add tasks
      phase.tasks.forEach((task, taskIndex) => {
        doc.text(`${index + 1}.${taskIndex + 1}. ${task.title}`, 25, yPosition);
        yPosition += 7;
        doc.setFontSize(10);
        doc.text(task.description, 30, yPosition);
        yPosition += 7;
        
        // Add deliverables
        doc.text('Livrables:', 30, yPosition);
        yPosition += 7;
        task.deliverables.forEach(deliverable => {
          doc.text(`- ${deliverable}`, 35, yPosition);
          yPosition += 7;
        });
        
        doc.setFontSize(12);
        yPosition += 5;
      });
      
      // Add spacing between phases
      yPosition += 10;
      
      // Check if we need a new page
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
    });
    
    doc.save('plan-implementation.pdf');
  };

  const phases = generatePlanByType();
  const totalWeeks = phases.reduce((total, phase) => {
    const weeks = parseInt(phase.duration);
    return total + (isNaN(weeks) ? 0 : weeks);
  }, 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Plan d'Implémentation Détaillé
        </h2>
        <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
          <Calendar className="w-5 h-5" />
          <span>Durée totale: {totalWeeks} semaines</span>
        </div>
      </div>

      <div className="space-y-6">
        {phases.map((phase, index) => {
          const Icon = phase.icon;
          return (
            <div
              key={phase.title}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {phase.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Durée: {phase.duration}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {phase.tasks.map((task, taskIndex) => (
                  <div
                    key={task.title}
                    className="pl-4 border-l-2 border-slate-200 dark:border-slate-700"
                  >
                    <h4 className="text-md font-medium text-slate-800 dark:text-slate-200">
                      {task.title}
                    </h4>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      {task.description}
                    </p>
                    <div className="mt-2">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Livrables:
                      </p>
                      <ul className="mt-1 space-y-1">
                        {task.deliverables.map((deliverable, i) => (
                          <li
                            key={i}
                            className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400"
                          >
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span>{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <button
          onClick={generatePDF}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-5 h-5" />
          <span>Télécharger le Plan Détaillé (PDF)</span>
        </button>
      </div>
    </div>
  );
}