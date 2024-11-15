import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CompanyInfo from './steps/CompanyInfo';
import TechnicalNeeds from './steps/TechnicalNeeds';
import BudgetTimeline from './steps/BudgetTimeline';
import DetailedPlan from './steps/DetailedPlan';
import StepIndicator from './components/StepIndicator';

const steps = [
  { id: 'company', title: 'Informations Entreprise' },
  { id: 'technical', title: 'Type de Service' },
  { id: 'budget', title: 'Dimensionnement' },
  { id: 'plan', title: 'Plan Détaillé' },
];

const questionnaireSchema = z.object({
  // Company Info
  companyName: z.string().min(2, 'Le nom est requis'),
  industry: z.string().min(2, 'Le secteur est requis'),
  size: z.enum(['1-10', '11-50', '51-200', '201-500', '500+']),
  location: z.string().min(2, 'La localisation est requise'),
  
  // Technical Needs
  currentSystems: z.enum(['saas', 'automation', 'integration']),
  
  // Budget & Timeline
  userCount: z.enum(['1-10', '11-50', '51-200', '201-1000', '1000+']),
  budget: z.string().min(1, 'Sélectionnez un budget'),
  timeline: z.string().min(1, 'Sélectionnez un délai'),
  priorities: z.array(z.string()).min(1, 'Sélectionnez au moins une priorité'),
});

type QuestionnaireData = z.infer<typeof questionnaireSchema>;

export default function Questionnaire() {
  const [currentStep, setCurrentStep] = useState(0);
  
  const methods = useForm<QuestionnaireData>({
    resolver: zodResolver(questionnaireSchema),
    mode: 'onChange',
  });

  const { trigger, getValues } = methods;

  const validateStep = async () => {
    let isValid = false;

    switch (currentStep) {
      case 0:
        isValid = await trigger(['companyName', 'industry', 'size', 'location']);
        break;
      case 1:
        isValid = await trigger(['currentSystems']);
        break;
      case 2:
        isValid = await trigger(['userCount', 'budget', 'timeline', 'priorities']);
        break;
      default:
        isValid = true;
    }

    return isValid;
  };

  const handleNext = async () => {
    const isValid = await validateStep();
    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <CompanyInfo />;
      case 1:
        return <TechnicalNeeds />;
      case 2:
        return <BudgetTimeline />;
      case 3:
        return <DetailedPlan />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <StepIndicator steps={steps} currentStep={currentStep} />
        </div>

        <FormProvider {...methods}>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 mb-6">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  currentStep === 0
                    ? 'invisible'
                    : 'border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500'
                }`}
              >
                Précédent
              </button>
              
              <button
                type="button"
                onClick={handleNext}
                className={`px-6 py-2 rounded-lg font-medium ${
                  currentStep === steps.length - 1
                    ? 'hidden'
                    : 'bg-blue-600 text-white hover:bg-blue-700 transition-colors'
                }`}
              >
                Suivant
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}