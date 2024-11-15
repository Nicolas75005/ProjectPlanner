import React from 'react';
import { useFormContext } from 'react-hook-form';
import FormField from '../components/FormField';

const industries = [
  'Technologies',
  'Finance',
  'Santé',
  'Commerce',
  'Industrie',
  'Services',
  'Autre',
];

const companySizes = [
  { value: '1-10', label: '1-10 employés' },
  { value: '11-50', label: '11-50 employés' },
  { value: '51-200', label: '51-200 employés' },
  { value: '201-500', label: '201-500 employés' },
  { value: '500+', label: '500+ employés' },
];

export default function CompanyInfo() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
        Informations sur votre entreprise
      </h2>
      
      <FormField
        label="Nom de l'entreprise"
        error={errors.companyName?.message as string}
      >
        <input
          {...register('companyName')}
          type="text"
          className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
          placeholder="Votre entreprise"
        />
      </FormField>

      <FormField
        label="Secteur d'activité"
        error={errors.industry?.message as string}
      >
        <select
          {...register('industry')}
          className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
        >
          <option value="">Sélectionnez un secteur</option>
          {industries.map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </select>
      </FormField>

      <FormField
        label="Taille de l'entreprise"
        error={errors.size?.message as string}
      >
        <select
          {...register('size')}
          className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
        >
          <option value="">Sélectionnez la taille</option>
          {companySizes.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </FormField>

      <FormField
        label="Localisation"
        error={errors.location?.message as string}
      >
        <input
          {...register('location')}
          type="text"
          className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
          placeholder="Ville, Pays"
        />
      </FormField>
    </div>
  );
}