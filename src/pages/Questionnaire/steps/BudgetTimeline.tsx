import React from 'react';
import { useFormContext } from 'react-hook-form';
import FormField from '../components/FormField';

const userCountOptions = [
  { value: '1-10', label: '1-10 utilisateurs' },
  { value: '11-50', label: '11-50 utilisateurs' },
  { value: '51-200', label: '51-200 utilisateurs' },
  { value: '201-1000', label: '201-1000 utilisateurs' },
  { value: '1000+', label: '1000+ utilisateurs' },
];

const budgetRanges = {
  saas: [
    { value: '10k-50k', label: '10,000€ - 50,000€' },
    { value: '50k-100k', label: '50,000€ - 100,000€' },
    { value: '100k-500k', label: '100,000€ - 500,000€' },
    { value: '500k+', label: '500,000€+' },
  ],
  automation: [
    { value: '5k-20k', label: '5,000€ - 20,000€' },
    { value: '20k-50k', label: '20,000€ - 50,000€' },
    { value: '50k-100k', label: '50,000€ - 100,000€' },
    { value: '100k+', label: '100,000€+' },
  ],
  integration: [
    { value: '2k-10k', label: '2,000€ - 10,000€' },
    { value: '10k-25k', label: '10,000€ - 25,000€' },
    { value: '25k-50k', label: '25,000€ - 50,000€' },
    { value: '50k+', label: '50,000€+' },
  ],
};

const timelineRanges = {
  saas: [
    { value: '3-6', label: '3-6 mois' },
    { value: '6-12', label: '6-12 mois' },
    { value: '12-18', label: '12-18 mois' },
    { value: '18+', label: '18+ mois' },
  ],
  automation: [
    { value: '1-2', label: '1-2 mois' },
    { value: '2-4', label: '2-4 mois' },
    { value: '4-6', label: '4-6 mois' },
    { value: '6+', label: '6+ mois' },
  ],
  integration: [
    { value: '1-2w', label: '1-2 semaines' },
    { value: '2-4w', label: '2-4 semaines' },
    { value: '1-2m', label: '1-2 mois' },
    { value: '2m+', label: '2+ mois' },
  ],
};

const priorityOptions = {
  saas: [
    'Évolutivité',
    'Performance',
    'Sécurité',
    'Facilité d\'utilisation',
    'Personnalisation',
    'Support',
  ],
  automation: [
    'ROI',
    'Rapidité d\'exécution',
    'Fiabilité',
    'Maintenance',
    'Formation',
    'Intégration',
  ],
  integration: [
    'Temps d\'arrêt minimal',
    'Compatibilité',
    'Migration des données',
    'Tests',
    'Documentation',
    'Support post-déploiement',
  ],
};

export default function BudgetTimeline() {
  const { register, formState: { errors }, watch } = useFormContext();
  const serviceType = watch('currentSystems') || 'saas';

  const currentBudgetRanges = budgetRanges[serviceType as keyof typeof budgetRanges];
  const currentTimelineRanges = timelineRanges[serviceType as keyof typeof timelineRanges];
  const currentPriorities = priorityOptions[serviceType as keyof typeof priorityOptions];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Dimensionnement du Projet
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          {serviceType === 'saas' && 'Estimation pour le développement et le déploiement de votre application SaaS'}
          {serviceType === 'automation' && 'Estimation pour la mise en place de votre solution d\'automatisation'}
          {serviceType === 'integration' && 'Estimation pour votre projet d\'intégration'}
        </p>
      </div>

      <FormField
        label="Nombre d'utilisateurs"
        error={errors.userCount?.message as string}
      >
        <select
          {...register('userCount')}
          className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
        >
          <option value="">Sélectionnez le nombre d'utilisateurs</option>
          {userCountOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </FormField>

      <FormField
        label="Budget prévu"
        error={errors.budget?.message as string}
      >
        <select
          {...register('budget', { required: 'Sélectionnez un budget' })}
          className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
        >
          <option value="">Sélectionnez une fourchette</option>
          {currentBudgetRanges.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </FormField>

      <FormField
        label="Délai souhaité"
        error={errors.timeline?.message as string}
      >
        <select
          {...register('timeline', { required: 'Sélectionnez un délai' })}
          className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
        >
          <option value="">Sélectionnez un délai</option>
          {currentTimelineRanges.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </FormField>

      <FormField
        label="Priorités du projet"
        error={errors.priorities?.message as string}
      >
        <div className="grid grid-cols-2 gap-4">
          {currentPriorities.map((priority) => (
            <label key={priority} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={priority}
                {...register('priorities', {
                  required: 'Sélectionnez au moins une priorité',
                })}
                className="rounded border-slate-300 dark:border-slate-600"
              />
              <span className="text-slate-700 dark:text-slate-300">{priority}</span>
            </label>
          ))}
        </div>
      </FormField>
    </div>
  );
}