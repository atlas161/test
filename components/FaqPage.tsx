import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CookieBanner } from './CookieBanner';
import { Breadcrumbs } from './Breadcrumbs';
import '../index.css';
import { Section } from '../types';
import { loadAllFaqItems, CmsFaqItem } from './CmsContent';
import { ChevronDown, HelpCircle, Search, X, ArrowRight, MessageCircle, Film, Globe, ShieldCheck } from 'lucide-react';

const DroneIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="2" />
    <line x1="12" y1="10" x2="12" y2="6" />
    <line x1="12" y1="14" x2="12" y2="18" />
    <line x1="10" y1="12" x2="6" y2="12" />
    <line x1="14" y1="12" x2="18" y2="12" />
    <circle cx="5" cy="5" r="2.2" />
    <circle cx="19" cy="5" r="2.2" />
    <circle cx="5" cy="19" r="2.2" />
    <circle cx="19" cy="19" r="2.2" />
    <line x1="6.5" y1="6.5" x2="10.5" y2="10.5" />
    <line x1="17.5" y1="6.5" x2="13.5" y2="10.5" />
    <line x1="6.5" y1="17.5" x2="10.5" y2="13.5" />
    <line x1="17.5" y1="17.5" x2="13.5" y2="13.5" />
  </svg>
);

const CATEGORY_META: Record<string, { icon: React.ReactNode; color: string }> = {
  'Drone':                      { icon: <DroneIcon size={14} />,  color: 'text-sky-400' },
  'Montage vidéo':              { icon: <Film size={14} />,       color: 'text-violet-400' },
  'Digital & présence en ligne':{ icon: <Globe size={14} />,      color: 'text-emerald-400' },
  'Administratif & sécurité':   { icon: <ShieldCheck size={14} />,color: 'text-amber-400' },
};

const FaqItem: React.FC<{
  f: CmsFaqItem;
  idx: number;
  isOpen: boolean;
  onToggle: (slug: string) => void;
}> = ({ f, idx, isOpen, onToggle }) => (
  <div
    className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${
      isOpen
        ? 'bg-gradient-to-br from-surfaceHighlight to-surfaceHighlight/80 border-accent/40 shadow-xl shadow-black/30'
        : 'bg-surfaceHighlight/10 border-white/5 hover:bg-surfaceHighlight/25 hover:border-white/10'
    }`}
  >
    <button
      onClick={() => onToggle(f.slug)}
      className="w-full flex items-center gap-4 p-5 md:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-2xl"
    >
      <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
        isOpen ? 'bg-accent text-background' : 'bg-white/5 text-white/40 group-hover:bg-white/10'
      }`}>
        {String(idx + 1).padStart(2, '0')}
      </span>
      <div className="flex-1 min-w-0 pr-2">
        <div className={`font-semibold text-base leading-snug transition-colors duration-200 [text-wrap:balance] ${isOpen ? 'text-accent' : 'text-white/90 group-hover:text-white'}`}>
          {f.question}
        </div>
      </div>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
        isOpen ? 'bg-accent/20 text-accent rotate-180' : 'bg-white/5 text-white/40 group-hover:bg-white/10'
      }`}>
        <ChevronDown size={16} />
      </div>
    </button>
    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}>
      <div className="px-5 md:px-6 pb-6 pl-[4.25rem]">
        <div className="h-px bg-gradient-to-r from-accent/20 via-white/5 to-transparent mb-5" />
        <div
          className="text-textSecondary text-sm leading-[1.85] blog-content [&_p]:mb-3 [&_p:last-child]:mb-0 [&_strong]:text-white/90 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1"
          dangerouslySetInnerHTML={{ __html: f.answer }}
        />
      </div>
    </div>
  </div>
);

export const FaqPage: React.FC = () => {
  const goToHomeSection = (section: Section) => {
    window.location.href = `/#${section}`;
  };

  const items = loadAllFaqItems();
  const categories = useMemo(() => ['Toutes', ...Array.from(new Set(items.map((i) => i.category)))], [items]);
  const [category, setCategory] = useState<string>('Toutes');
  const [search, setSearch] = useState('');
  const [expandAll, setExpandAll] = useState(false);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    let list = category === 'Toutes' ? items : items.filter((i) => i.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((i) =>
        i.question.toLowerCase().includes(q) ||
        i.answer.replace(/<[^>]+>/g, '').toLowerCase().includes(q)
      );
    }
    return list;
  }, [items, category, search]);

  const grouped = useMemo((): Record<string, import('./CmsContent').CmsFaqItem[]> | null => {
    if (category !== 'Toutes' || search.trim()) return null;
    const map: Record<string, import('./CmsContent').CmsFaqItem[]> = {};
    items.forEach((i) => {
      if (!map[i.category]) map[i.category] = [];
      map[i.category].push(i);
    });
    return map;
  }, [items, category, search]);

  const countFor = (cat: string) =>
    cat === 'Toutes' ? items.length : items.filter((i) => i.category === cat).length;

  useEffect(() => {
    const title = 'FAQ Drone & Vidéo Angoulême | Questions Fréquentes | Eagle Production';
    const desc = "Toutes les réponses sur nos prestations drone, vidéo et digital à Angoulême : réglementation DGAC, qualité 4K, tarifs, délais, livrables. Télépilote certifié en Charente et Nouvelle-Aquitaine.";
    document.title = title;
    const setMeta = (attr: 'name' | 'property', key: string, value: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute('content', value);
    };
    setMeta('name', 'description', desc);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', 'https://www.eagle-prod.com/faq');
    setMeta('property', 'og:image', 'https://www.eagle-prod.com/Photo_de_paul_bardin.webp');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', desc);
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement('link'); canonical.setAttribute('rel', 'canonical'); document.head.appendChild(canonical); }
    canonical.setAttribute('href', 'https://www.eagle-prod.com/faq');
  }, []);

  const faqLd = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.slice(0, 50).map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer.replace(/<[^>]+>/g, '') },
    })),
  }), [items]);

  const toggleOne = (slug: string) => setOpen((prev) => ({ ...prev, [slug]: !prev[slug] }));

  useEffect(() => {
    if (!expandAll) return;
    const next: Record<string, boolean> = {};
    filtered.forEach((f) => { next[f.slug] = true; });
    setOpen(next);
  }, [expandAll, filtered]);

  useEffect(() => { if (expandAll) return; setOpen({}); }, [expandAll, category]);

  return (
    <div className="min-h-screen bg-background text-textPrimary font-sans">
      <Navbar activeSection={null} scrollToSection={goToHomeSection} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <main className="pt-20">

        {/* ── HERO ── */}
        <section className="relative overflow-hidden pb-2">
          {/* Fond : grille + blobs */}
          <div className="pointer-events-none absolute inset-0">
            {/* Grille */}
            <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            {/* Blobs */}
            <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-accent/8 blur-[130px]" />
            <div className="absolute top-10 right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/6 blur-[120px]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-violet-500/4 blur-[100px]" />
            {/* Ligne accent horizontale */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
          </div>
          <div className="max-w-5xl mx-auto px-6 pt-10 pb-10 relative z-10">
            <Breadcrumbs items={[{ label: 'FAQ' }]} className="mb-6" />
            <div className="flex items-center gap-3 text-accent mb-5">
              <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                <HelpCircle size={15} />
              </div>
              <span className="tracking-[0.25em] text-xs font-bold uppercase">Questions fréquentes</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-4">
              Toutes vos questions<br />
              <span className="text-accent">ont une réponse</span>
            </h1>
            <p className="text-textSecondary max-w-xl text-base mb-8">
              {items.length} réponses détaillées sur le drone, le montage vidéo, le digital et l'administratif — classées et recherchables.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-3 mb-8">
              {categories.filter(c => c !== 'Toutes').map((cat) => {
                const meta = CATEGORY_META[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/4 border border-white/8 hover:bg-white/8 hover:border-white/15 transition-all group"
                  >
                    <span className={`${meta?.color ?? 'text-white/50'}`}>{meta?.icon}</span>
                    <div className="text-left">
                      <div className="text-white font-bold text-sm leading-none">{countFor(cat)}</div>
                      <div className="text-white/40 text-[10px] leading-tight mt-0.5 max-w-[90px] truncate">{cat}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Barre de recherche */}
            <div className="relative max-w-xl">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Rechercher une question..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-accent/40 focus:bg-white/8 transition-all"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors">
                  <X size={15} />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ── FILTRES + CONTENU ── */}
        <section className="max-w-5xl mx-auto px-6 pb-20 pt-8">

          {/* Onglets catégories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => {
              const active = category === cat;
              const meta = CATEGORY_META[cat];
              return (
                <button
                  key={cat}
                  onClick={() => { setCategory(cat); setSearch(''); setExpandAll(false); }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                    active
                      ? 'bg-accent text-background border-accent shadow-lg shadow-accent/20'
                      : 'bg-white/5 text-white/70 border-white/8 hover:bg-white/10 hover:text-white hover:border-white/15'
                  }`}
                >
                  {meta && <span className={active ? 'text-background' : meta.color}>{meta.icon}</span>}
                  <span>{cat}</span>
                  <span className={`text-xs rounded-full px-1.5 py-0.5 font-bold ${active ? 'bg-background/20 text-background' : 'bg-white/10 text-white/50'}`}>
                    {countFor(cat)}
                  </span>
                </button>
              );
            })}
            <div className="flex-1" />
            <button
              onClick={() => setExpandAll((v) => !v)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                expandAll ? 'bg-accent/10 text-accent border-accent/30' : 'bg-white/5 text-white/50 border-white/8 hover:bg-white/10 hover:text-white'
              }`}
            >
              {expandAll ? 'Tout replier' : 'Tout déplier'}
            </button>
          </div>

          {/* Résultats de recherche */}
          {search.trim() && (
            <div className="mb-6 flex items-center gap-2 text-sm text-white/50">
              <Search size={13} />
              <span><span className="text-accent font-semibold">{filtered.length}</span> résultat{filtered.length !== 1 ? 's' : ''} pour « {search} »</span>
            </div>
          )}

          {/* Mode : recherche ou filtre → liste plate */}
          {(search.trim() || category !== 'Toutes') && (
            filtered.length > 0 ? (
              <div className="space-y-3">
                {filtered.map((f, idx) => <FaqItem key={f.slug} f={f} idx={idx} isOpen={expandAll || !!open[f.slug]} onToggle={toggleOne} />)}

              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 py-20 text-center">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-2xl">🔍</div>
                <p className="text-white/50 text-sm">Aucune question trouvée pour « {search} »</p>
                <button onClick={() => setSearch('')} className="text-accent text-sm underline underline-offset-2">Effacer la recherche</button>
              </div>
            )
          )}

          {/* Mode : toutes catégories → groupé */}
          {!search.trim() && category === 'Toutes' && grouped && (
            <div className="space-y-12">
              {(Object.entries(grouped) as [string, CmsFaqItem[]][]).map(([cat, catItems]) => (
                <div key={cat}>
                  {/* Header de catégorie */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/8 ${CATEGORY_META[cat]?.color ?? 'text-white/40'}`}>{CATEGORY_META[cat]?.icon}</span>
                    <div>
                      <h2 className="text-white font-bold text-lg leading-tight">{cat}</h2>
                      <p className="text-white/40 text-xs">{catItems.length} question{catItems.length !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-2" />
                    <button
                      onClick={() => setCategory(cat)}
                      className="text-accent text-xs flex items-center gap-1 hover:underline"
                    >
                      Voir uniquement <ArrowRight size={11} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {catItems.map((f, idx) => <FaqItem key={f.slug} f={f} idx={idx} isOpen={expandAll || !!open[f.slug]} onToggle={toggleOne} />)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA contact */}
          <div className="mt-16 rounded-[2rem] border border-accent/25 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent p-8 md:p-10 shadow-[0_0_60px_rgba(212,175,55,0.08)]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={20} className="text-accent" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-extrabold text-white">Vous ne trouvez pas la réponse ?</h2>
                  <p className="text-white/60 mt-1 text-sm">Notre équipe répond sous 24h. Devis gratuit sans engagement.</p>
                </div>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-accent text-background font-bold px-7 py-3.5 rounded-full hover:bg-white transition-colors border border-accent/40 text-sm flex-shrink-0"
              >
                Nous contacter <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
};
