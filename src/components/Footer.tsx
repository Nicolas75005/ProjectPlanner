import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe2, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Globe2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="font-bold text-xl text-slate-900 dark:text-white">IntegrationPro</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              {t('footer.solutions')}
            </h3>
            <ul className="mt-4 space-y-2">
              <FooterLink>{t('footer.middleware')}</FooterLink>
              <FooterLink>{t('footer.saas')}</FooterLink>
              <FooterLink>{t('footer.automation')}</FooterLink>
              <FooterLink>{t('footer.consulting')}</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              {t('footer.company')}
            </h3>
            <ul className="mt-4 space-y-2">
              <FooterLink>{t('footer.about')}</FooterLink>
              <FooterLink>{t('footer.careers')}</FooterLink>
              <FooterLink>{t('footer.blog')}</FooterLink>
              <FooterLink>{t('footer.privacy')}</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              {t('footer.contact')}
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                <Mail className="h-5 w-5" />
                <span>contact@integrationpro.com</span>
              </li>
              <li className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                <Phone className="h-5 w-5" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                <MapPin className="h-5 w-5" />
                <span>123 Integration St, Tech City</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-8">
          <p className="text-center text-sm text-slate-600 dark:text-slate-300">
            © {new Date().getFullYear()} IntegrationPro. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ children }: { children: React.ReactNode }) {
  return (
    <li>
      <a href="#" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
        {children}
      </a>
    </li>
  );
}