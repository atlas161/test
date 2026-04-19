import React, { useEffect } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CookieBanner } from './CookieBanner';
import { InspectionBuildings } from './InspectionBuildings';
import '../index.css';
import { Section } from '../types';

export const InspectionBuildingsPage: React.FC = () => {
  const goToHomeSection = (section: Section) => {
    window.location.href = `/#${section}`;
  };

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Inspection de bâtiments par drone',
    serviceType: 'Inspection technique par drone',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Eagle Production',
      url: 'https://www.eagle-prod.com'
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Charente (16), Nouvelle-Aquitaine'
    },
    description: 'Inspection de toitures, façades, charpentes et structures par drone à Angoulême. Vues 4K haute définition, rapport illustré PDF. Télépilote certifié DGAC, intervention sans échafaudage.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Inspection par drone',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Inspection de toiture par drone', description: 'Détection de défauts, infiltrations et dégâts sans échafaudage' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Inspection de façade par drone', description: 'Vues 4K des façades, cartographie des désordres et fissures' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Rapport illustré PDF', description: 'Synthèse des observations avec photos annotées et recommandations' } },
      ]
    }
  };

  useEffect(() => {
    const title = 'Inspection de Bâtiments par Drone Angoulême | Eagle Production';
    const desc = "Eagle Production inspecte vos toitures, façades et structures par drone à Angoulême et en Charente. Vues 4K, rapport illustré PDF, télépilote certifié DGAC. Devis gratuit.";
    document.title = title;
    const setMeta = (attr: 'name' | 'property', key: string, value: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };
    setMeta('name', 'description', desc);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', 'https://www.eagle-prod.com/inspection');
    setMeta('property', 'og:image', 'https://www.eagle-prod.com/Photo_de_paul_bardin.webp');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', desc);
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://www.eagle-prod.com/inspection');
  }, []);

  return (
    <div className="min-h-screen bg-background text-textPrimary font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <Navbar activeSection={null} scrollToSection={goToHomeSection} />
      <main>
        <InspectionBuildings />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
};
