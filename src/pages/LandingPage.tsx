import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Shield, 
  Zap,
  Globe2,
  Clock,
  FileText,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white">
              {t('hero.title')}
              <span className="text-blue-600 dark:text-blue-400"> {t('hero.highlight')}</span>
            </h1>
            <p className="mt-6 text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                {t('hero.cta')}
              </button>
              <button className="px-8 py-3 border border-slate-300 dark:border-slate-600 rounded-lg font-medium text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 transition-colors">
                {t('hero.secondary')}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              {t('features.title')}
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-blue-600" />}
              title={t('features.security.title')}
              description={t('features.security.description')}
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8 text-blue-600" />}
              title={t('features.analytics.title')}
              description={t('features.analytics.description')}
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8 text-blue-600" />}
              title={t('features.automation.title')}
              description={t('features.automation.description')}
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              {t('how.title')}
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              {t('how.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StepCard
              number="1"
              icon={<Globe2 className="h-6 w-6 text-blue-600" />}
              title={t('how.step1.title')}
              description={t('how.step1.description')}
            />
            <StepCard
              number="2"
              icon={<Clock className="h-6 w-6 text-blue-600" />}
              title={t('how.step2.title')}
              description={t('how.step2.description')}
            />
            <StepCard
              number="3"
              icon={<FileText className="h-6 w-6 text-blue-600" />}
              title={t('how.step3.title')}
              description={t('how.step3.description')}
            />
            <StepCard
              number="4"
              icon={<CheckCircle2 className="h-6 w-6 text-blue-600" />}
              title={t('how.step4.title')}
              description={t('how.step4.description')}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors inline-flex items-center gap-2">
            {t('cta.button')}
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 bg-slate-50 dark:bg-slate-700 rounded-xl"
    >
      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-slate-300">{description}</p>
    </motion.div>
  );
}

function StepCard({ number, icon, title, description }: { number: string; icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="relative">
      <div className="absolute -left-4 top-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 font-bold">
        {number}
      </div>
      <div className="pl-8">
        <div className="mb-4">{icon}</div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
        <p className="text-slate-600 dark:text-slate-300">{description}</p>
      </div>
    </div>
  );
}