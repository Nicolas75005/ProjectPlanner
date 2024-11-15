import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Cloud, Workflow, Network } from 'lucide-react';
import FormField from '../components/FormField';

const serviceOptions = [
  {
    id: 'saas',
    icon: Cloud,
    title: 'Applications SaaS',
    description: 'Intégration de solutions logicielles en tant que service',
  },
  {
    id: 'automation',
    icon: Workflow,
    title: 'Automatisation',
    description: 'Automatisation des processus et des flux de travail',
  },
  {
    id: 'integration',
    icon: Network,
    title: "Services d'Intégration",
    description: 'Solutions d\'intégration sur mesure et middleware',
  },
];

export default function TechnicalNeeds() {
  const { register, formState: { errors }, watch } = useFormContext();
  const selectedService = watch('currentSystems');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Type de Service
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Sélectionnez le type de service qui correspond le mieux à vos besoins
        </p>
      </div>

      <FormField
        label="Type de Service"
        error={errors.currentSystems?.message as string}
      >
        <div className="grid grid-cols-1 gap-4">
          {serviceOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedService === option.id;

            return (
              <label
                key={option.id}
                className={`relative flex items-start p-4 cursor-pointer rounded-lg border-2 transition-colors ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <input
                  type="radio"
                  {...register('currentSystems')}
                  value={option.id}
                  className="sr-only"
                />
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <p className={`text-sm font-medium ${
                      isSelected
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-slate-900 dark:text-white'
                    }`}>
                      {option.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {option.description}
                    </p>
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </FormField>
    </div>
  );
}