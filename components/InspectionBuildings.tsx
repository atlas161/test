import React from 'react';
import { Reveal } from './Reveal';
import { Building2, ShieldCheck, Camera, FileText, Wrench, Ruler, BadgeCheck, CheckCircle2, Layers, Route, Factory } from 'lucide-react';

export const InspectionBuildings: React.FC = () => {
  return (
    <div className="relative bg-background overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[680px] h-[680px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[520px] h-[520px] rounded-full bg-white/5 blur-[120px]" />
      </div>

      <section className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 pt-28 pb-14">
          <Reveal>
            <div className="flex items-center gap-3 text-accent mb-4">
              <Building2 size={20} />
              <span className="tracking-[0.25em] text-xs font-bold uppercase">Inspection de bâtiments</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
              Inspection par drone
              <br />
              <span className="text-accent">toitures, façades, structures</span>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 max-w-2xl text-lg md:text-xl text-textSecondary leading-relaxed">
              Constatez l'état des toitures, façades et structures sans nacelle ni risque. Vues 4K, détails annotables,
              rapports concis et exploitables pour une maintenance préventive optimisée.
            </p>
            <p className="mt-4 max-w-2xl text-lg md:text-xl text-textSecondary leading-relaxed">
              Notre expertise en inspection par drone couvre l'ensemble du territoire charentais, d'Angoulême aux zones rurales. 
              Nous identifions les fissures, infiltrations, dégradations structurelles et zones de corrosion avec une précision centimétrique,
              vous permettant d'anticiper les interventions et d'optimiser votre budget maintenance.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Camera size={22} className="text-accent" />, title: 'Détails annotables', text: 'Photos 4K HDR précises avec repérage des fissures, zones d\'humidité, dégradations structurelles et points critiques nécessitant une attention immédiate.' },
              { icon: <ShieldCheck size={22} className="text-accent" />, title: 'Sécurité maximale', text: 'Opérations au sol sans personnel en hauteur, périmètres de sécurité définis, autorisations administratives préalables et assurance RC professionnelle couvrant toutes les interventions.' },
              { icon: <Wrench size={22} className="text-accent" />, title: 'Maintenance prédictive', text: 'Aide à la décision avec priorisation des interventions: urgences, planification à moyen terme, budget prévisionnel et suivi de l\'évolution des pathologies dans le temps.' },
            ].map((item, i) => (
              <div key={i} className="bg-surfaceHighlight/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-sm text-textSecondary leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12 bg-gradient-to-b from-transparent to-white/[0.02] rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-accent mb-2">
                <Layers size={18} />
                <span className="tracking-[0.2em] text-[11px] font-bold uppercase">Livrables</span>
              </div>
              <div className="space-y-3">
                {[
                  { icon: <Camera size={18} />, label: 'Photos 4K (globales + détails)' },
                  { icon: <BadgeCheck size={18} />, label: 'Comparatifs avant/après (si revisite)' },
                  { icon: <FileText size={18} />, label: 'Rapport PDF illustré (2–4 pages)' }
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                    <div className="p-1.5 bg-accent/10 rounded-md text-accent">{f.icon}</div>
                    <p className="text-sm text-white/85 leading-relaxed">{f.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-accent mb-2">
                <Ruler size={18} />
                <span className="tracking-[0.2em] text-[11px] font-bold uppercase">Cibles fréquentes</span>
              </div>
              <div className="space-y-3">
                {[
                  'Étanchéité (toitures, zinguerie)',
                  'Façades (fissures, joints, parements)',
                  'Structures (angles, points d’accès, zones contraintes)',
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                    <CheckCircle2 size={18} className="text-textPrimary shrink-0" />
                    <p className="text-sm text-white/85 leading-relaxed">{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 text-accent mb-4">
            <Route size={18} />
            <span className="tracking-[0.2em] text-[11px] font-bold uppercase">Déroulé type</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { n: '01', title: 'Brief & périmètre', text: 'Quoi inspecter, où, priorités & contraintes.' },
              { n: '02', title: 'Étude & autorisations', text: 'Vérif. règlementaires et balisage.' },
              { n: '03', title: 'Vol & captation', text: 'Vues globales + détails, sécurité.' },
              { n: '04', title: 'Traitement & rapport', text: 'Sélection visuels + rapport PDF.' },
            ].map((s, i) => (
              <div key={i} className="relative bg-surfaceHighlight/50 border border-white/10 rounded-2xl p-6">
                <div className="absolute -top-3 -left-3 bg-accent text-background text-xs font-bold rounded-md px-2 py-1 border border-accent/50">
                  {s.n}
                </div>
                <h4 className="text-white font-bold mb-2">{s.title}</h4>
                <p className="text-sm text-textSecondary leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="rounded-[2rem] border border-accent/30 bg-gradient-to-br from-accent/15 via-accent/5 to-transparent p-8 md:p-10 shadow-[0_0_40px_rgba(212,175,55,0.15)]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white">Parlons de votre inspection</h3>
                <p className="text-white/80 mt-1">Obtenez un devis et un exemple de rapport.</p>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center justify-center bg-accent text-background font-bold px-6 py-3 rounded-full hover:bg-white transition-colors border border-accent/40"
              >
                Demander un devis
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Types d'inspections spécialisées
              </h2>
              <p className="text-lg text-textSecondary max-w-3xl mx-auto">
                Chaque type de bâtiment nécessite une approche spécifique. Notre expertise couvre tous les secteurs avec des protocoles adaptés.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Building2 size={24} className="text-accent" />,
                title: "Bâtiments résidentiels",
                description: "Copropriétés, immeubles collectifs, résidences privées. Diagnostic complet des toitures-terrasses, façades, balcons et parties communes pour planifier les travaux de ravalement et rénovation."
              },
              {
                icon: <Factory size={24} className="text-accent" />,
                title: "Bâtiments industriels",
                description: "Usines, entrepôts, structures métalliques. Inspection des charpentes, couvertures, zones de stockage et installations techniques avec focus sur la sécurité et la conformité réglementaire."
              },
              {
                icon: <Layers size={24} className="text-accent" />,
                title: "Patrimoine historique",
                description: "Monuments, édifices classés, structures anciennes. Expertise douce avec documentation photographique détaillée pour les DRAC et architectes du patrimoine."
              },
              {
                icon: <Route size={24} className="text-accent" />,
                title: "Ouvrages d'art",
                description: "Ponts, tunnels, murs de soutènement. Surveillance des structures de génie civil, détection des pathologies et suivi de l'évolution dans le temps."
              },
              {
                icon: <ShieldCheck size={24} className="text-accent" />,
                title: "Établissements recevant du public",
                description: "Écoles, hôpitaux, commerces. Contrôle réglementaire des issues de secours, façades, toitures et accès handicapés conformément aux normes ERP."
              },
              {
                icon: <Ruler size={24} className="text-accent" />,
                title: "Zones sensibles",
                description: "Sites industriels classés SEVESO, zones à risque. Protocoles de sécurité renforcés avec double validation et accompagnement des services de secours."
              }
            ].map((service, i) => (
              <div key={i} className="bg-surfaceHighlight/20 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">{service.icon}</div>
                  <h3 className="text-lg font-bold text-white">{service.title}</h3>
                </div>
                <p className="text-sm text-textSecondary leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Inspection spécialisée des toitures
              </h2>
              <p className="text-lg text-textSecondary max-w-3xl mx-auto">
                L'inspection de toiture par drone est notre expertise principale. Détectez les infiltrations, fissures et dégradations sans aucun risque pour vos équipes.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <Reveal>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Pourquoi inspecter votre toiture au drone ?
                </h3>
              </Reveal>
              <Reveal delay={100}>
                <p className="text-lg text-textSecondary leading-relaxed mb-4">
                  L'inspection de toiture traditionnelle nécessite des échafaudages coûteux et présente des risques importants. 
                  Notre solution par drone vous permet d'obtenir des détails 4K HDR de chaque tuile, arête, et zone de jonction,
                  le tout en quelques heures seulement et sans interruption de votre activité.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-lg text-textSecondary leading-relaxed">
                  Nous couvrons tous les types de toitures : tuiles, ardoises, zinc, bac acier, toitures-terrasses, 
                  toitures végétalisées et structures complexes. Chaque matériau nécessite une expertise spécifique 
                  que nos télépilotes certifiés maîtrisent parfaitement sur tout le territoire de la Charente.
                </p>
              </Reveal>
            </div>

            <div className="space-y-6">
              <Reveal>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Pathologies détectées
                </h3>
              </Reveal>
              <div className="space-y-4">
                {[
                  { title: "Infiltrations et zones d'humidité", desc: "Détection des traces d'humidité, zones de saturation et points d'entrée d'eau avec analyse thermographique" },
                  { title: "Fissures et fissuration", desc: "Repérage précis des fissures structurelles, microfissures et zones de tension dans les matériaux de couverture" },
                  { title: "Dégradation des matériaux", desc: "Usure des tuiles, corrosion des éléments métalliques, décollement des revêtements et fragilisation" },
                  { title: "Problèmes d'étanchéité", desc: "Joints défectueux, soudures corrodées, zones de faiblesse autour des sorties de toit et noues" },
                  { title: "Obstructions et végétation", desc: "Mousses, lichens, végétation envahissante et débris accumulés sur les zones plates et chéneaux" },
                  { title: "Structure et charpente", desc: "Déformations visibles, affaissements, points de faiblesse de la charpente sous-jacente apparente" }
                ].map((item, i) => (
                  <Reveal key={i} delay={i * 50}>
                    <div className="bg-surfaceHighlight/20 border border-white/10 rounded-xl p-4">
                      <h4 className="text-lg font-bold text-accent mb-2">{item.title}</h4>
                      <p className="text-sm text-textSecondary leading-relaxed">{item.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          <Reveal>
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-white mb-4">
                Types de toitures que nous inspectons en Charente
              </h3>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🏠",
                title: "Toitures tuiles",
                description: "Tuiles canal, tuiles plates, tuiles mécaniques. Repérage des tuiles cassées, déplacées ou poreuses."
              },
              {
                icon: "🏢",
                title: "Ardoises et zinc",
                description: "Contrôle des fixations, état des ardoises fissurées, corrosion du zinc et joints d'étanchéité."
              },
              {
                icon: "🏭",
                title: "Bac acier et tôles",
                description: "Inspection des soudures, zones de corrosion, fixations et infiltrations aux joints et recouvrements."
              },
              {
                icon: "🌿",
                title: "Toitures terrasses",
                description: "Étanchéité, relevés d'étanchéité, système de drainage et points singuliers (sorties, regards)."
              },
              {
                icon: "⛪",
                title: "Patrimoine historique",
                description: "Expertise douce des matériaux anciens, ardoises historiques, couvertures en pierre et éléments décoratifs."
              },
              {
                icon: "🏗️",
                title: "Structures complexes",
                description: "Toitures multi-pans, lucarnes, chiens-assis, noues, arêtiers et points de jonction complexes."
              },
              {
                icon: "🌱",
                title: "Toitures végétalisées",
                description: "État du substrat, système d'irrigation, racines et points de surcharge sur la structure porteuse."
              },
              {
                icon: "🔧",
                title: "Équipements techniques",
                description: "Panneaux solaires, VMC, chemées, sorties de toit et leurs interfaces avec la couverture."
              }
            ].map((roof, i) => (
              <Reveal key={i} delay={i * 30}>
                <div className="bg-surfaceHighlight/10 border border-white/10 rounded-xl p-6 text-center">
                  <div className="text-3xl mb-3">{roof.icon}</div>
                  <h4 className="text-lg font-bold text-white mb-2">{roof.title}</h4>
                  <p className="text-sm text-textSecondary leading-relaxed">{roof.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

