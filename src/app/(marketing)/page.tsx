/*  */import type { Metadata } from 'next';
import { MarketingNav } from '@/components/marketing/Nav';
import { ScrollObserver } from '@/components/marketing/ScrollObserver';
import { Hero, ProblemSolution, HowItWorks, Features, ProductShowcase, Monetization, Testimonials, AudienceSection, FAQSection, SiteFooter } from '@/components/marketing/sections';
import { ContactSection } from '@/components/marketing/ContactSection';
import { siteConfig } from '@/marketing/config';
import styles from '@/components/marketing/marketing.module.css';

const title = 'ZIQX Skills | Create and Manage Online Courses';
const description = siteConfig.description;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  metadataBase: siteConfig.siteUrl ? new URL(siteConfig.siteUrl) : undefined,
  alternates: siteConfig.siteUrl ? { canonical: '/' } : undefined,
  openGraph: {
    title,
    description,
    type: 'website',
    siteName: siteConfig.name,
    url: siteConfig.siteUrl || undefined,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  robots: { index: true, follow: true },
  keywords: ['online courses', 'course creator', 'LMS', 'sell courses', 'YouTube unlisted videos', 'learner portal', 'live sessions', 'certificates'],
};

// Structured data describes only what the product does. It contains no ratings, prices or claims.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: siteConfig.name,
      applicationCategory: 'EducationalApplication',
      description,
    },
  ],
};

export default function MarketingHome() {
  return (
    <div className={styles.page}>
      <a href="#main" className={styles.skipLink}>
        Skip to content
      </a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarketingNav />
      <ScrollObserver />
      <main id="main" className={styles.main}>
        <Hero />
        <ProblemSolution />
        <Features />
        <HowItWorks />
        <ProductShowcase />
        <Monetization />
        <AudienceSection />
        <Testimonials />
        <FAQSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
