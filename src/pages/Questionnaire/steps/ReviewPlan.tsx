import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FileText, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';

export default function ReviewPlan() {
  const { watch } = useFormContext();
  const formData = watch();

  const generatePDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Plan d\'Intégration Personnalisé', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Entreprise: ${formData.companyName}`, 20, 40);
    doc.text(`Secteur: ${formData.industry}`, 20, 50);
    doc.text(`Type de Service: ${getServiceLabel(formData.currentSystems)}`, 20, 60);
    doc.text(`Nombre d'utilisateurs: ${formData.userCount}`, 20, 70);
    doc.text(`Budget: ${getBudgetLabel(formData.budget)}`, 20, 80);
    doc.text(`Délai: ${getTimelineLabel(formData.timeline)}`, 20, 90);
    doc.text('Priorités:', 20, 100);
    
    if (Array.isArray(formData.priorities)) {
      formData.priorities.forEach((priority: string, index: number) => {
        doc.text(`- ${priority}`, 30, 110 + (index * 10));
      });
    }
    
    doc.save('plan-integration.pdf');
  };

  const getServiceLabel = (service: string) => {
    const labels = {
      'saas': 'Application SaaS',
      'automation': 'Automatisation',
      'integration': 'Services d\'Intégration'
    };
    return labels[service as keyof typeof labels] || '-';
  };

  const getBudgetLabel = (budget: string) => {
    if (!formData.currentSystems || !budget) return '-';

    const budgetRanges = {
      'saas': {
        '10k-50k': '10,000€ - 50,000€',
        '50k-100k': '50,000€ - 100,000€',
        '100k-500k': '100,000€ - 500,000€',
        '500k+': '500,000€+'
      },
      'automation': {
        '5k-20k': '5,000€ - 20,000€',
        '20k-50k': '20,000€ - 50,000€',
        '50k-100k': '50,000€ - 100,000€',
        '100k+': '100,000€+'
      },
      'integration': {
        '2k-10k': '2,000€ - 10,000€',
        '10k-25k': '10,000€ - 25,000€',
        '25k-50k': '25,000€ - 50,000€',
        '50k+': '50,000€+'
      }
    };

    return budgetRanges[formData.currentSystems as keyof typeof budgetRanges]?.[budget as keyof typeof budgetRanges.saas] || '-';
  };

  const getTimelineLabel = (timeline: string) => {
    if (!formData.currentSystems || !timeline) return '-';

    const timelineRanges = {
      'saas': {
        '3-6': '3-6 mois',
        '6-12': '6-12 mois',
        '12-18': '12-18 mois',
        '18+': '18+ mois'
      },
      'automation': {
        '1-2': '1-2 mois',
        '2-4': '2-4 mois',
        '4-6': '4-6 mois',
        '6+': '6+ mois'
      },
      'integration': {
        '1-2w': '1-2 semaines',
        '2-4w': '2-4 semaines',
        '1-2m': '1-2 mois',
        '2m+': '2+ mois'
      }
    };

    return timelineRanges[formData.currentSystems as keyof typeof timelineRanges]?.[timeline as keyof typeof timelineRanges.saas] || '-';
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
        Votre Plan Personnalisé
      </h2>

      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Résumé du Projet
            </h3>
          </div>
          <button
            onClick={generatePDF}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Télécharger PDF</span>
          </button>
        </div>

        <div className="space-y-6">
          <Section title="Informations Entreprise">
            <InfoItem label="Nom" value={formData.companyName} />
            <InfoItem label="Secteur" value={formData.industry} />
            <InfoItem label="Taille" value={formData.size} />
            <InfoItem label="Localisation" value={formData.location} />
          </Section>

          <Section title="Aspects Techniques">
            <InfoItem
              label="Type de Service"
              value={getServiceLabel(formData.currentSystems)}
            />
            <InfoItem
              label="Nombre d'Utilisateurs"
              value={formData.userCount}
            />
          </Section>

          <Section title="Budget et Délais">
            <InfoItem label="Budget" value={getBudgetLabel(formData.budget)} />
            <InfoItem label="Délai" value={getTimelineLabel(formData.timeline)} />
            {Array.isArray(formData.priorities) && formData.priorities.length > 0 && (
              <div className="mt-2">
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Priorités
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  {formData.priorities.map((priority: string) => (
                    <li key={priority} className="text-sm text-slate-600 dark:text-slate-400">
                      {priority}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
      <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
        {title}
      </h4>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-sm text-slate-600 dark:text-slate-400">{label}</span>
      <span className="text-sm font-medium text-slate-900 dark:text-white">
        {value || '-'}
      </span>
    </div>
  );
}