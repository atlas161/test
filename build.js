import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Build Eagle Production...');

// Build Vite
console.log('🔨 Build Vite...');
execSync('vite build', { stdio: 'inherit' });

// Lire les articles de blog avec toutes les métadonnées SEO
const readBlogPosts = () => {
  const postsDir = path.join(__dirname, 'content', 'posts');
  const posts = [];
  
  if (!fs.existsSync(postsDir)) return posts;
  
  const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));
  
  for (const file of files) {
    const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
    const frontMatter = content.match(/^---\s*\n([\s\S]*?)\n---/);
    
    if (frontMatter) {
      const metadata = {};
      frontMatter[1].split('\n').forEach(line => {
        const match = line.match(/^(\w+):\s*(.+)$/);
        if (match) {
          const [, key, value] = match;
          // Retirer les guillemets entourants
          metadata[key.trim()] = value.trim().replace(/^["']|["']$/g, '');
        }
      });
      
      if (metadata.published !== 'false') {
        const slug = metadata.slug || file.replace('.md', '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
        posts.push({
          slug,
          title: metadata.title || '',
          seoTitle: metadata.seoTitle || metadata.title || '',
          seoDescription: metadata.seoDescription || metadata.excerpt || '',
          excerpt: metadata.excerpt || '',
          coverImage: metadata.coverImage || '',
          date: metadata.date || new Date().toISOString().split('T')[0],
          category: metadata.category || 'Blog',
          tags: metadata.tags ? metadata.tags.replace(/^\[|\]$/g, '').split(',').map(t => t.trim().replace(/^["']|["']$/g, '')) : [],
          url: `/blog/${slug}`
        });
      }
    }
  }
  
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};

const postsDir = path.join(__dirname, 'content', 'posts');
const faqsDir = path.join(__dirname, 'content', 'faqs');

const postsCount = fs.existsSync(postsDir) 
  ? fs.readdirSync(postsDir).filter(f => f.endsWith('.md')).length 
  : 0;

const faqsCount = fs.existsSync(faqsDir) 
  ? fs.readdirSync(faqsDir).filter(f => f.endsWith('.json')).length 
  : 0;

// Lire les articles de blog pour le sitemap
const posts = readBlogPosts();

// Copier les fichiers publics (sauf index.html)
console.log('📁 Copie fichiers publics...');
const publicDir = path.join(__dirname, 'public');
const distDir = path.join(__dirname, 'dist');

if (fs.existsSync(publicDir)) {
  const files = fs.readdirSync(publicDir);
  files.forEach(file => {
    if (file !== 'index.html' && !file.startsWith('schema-')) { // Ne pas copier les schemas JSON
      const srcPath = path.join(publicDir, file);
      const destPath = path.join(distDir, file);
      
      if (fs.statSync(srcPath).isFile()) {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  });
}

// Générer sitemap complet avec pages blog individuelles
console.log('🗺️ Génération sitemap avec articles de blog...');
const currentDate = new Date().toISOString().split('T')[0];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.eagle-prod.com/</loc>
    <lastmod>${currentDate}</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.eagle-prod.com/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.eagle-prod.com/faq</loc>
    <lastmod>${currentDate}</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.eagle-prod.com/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.eagle-prod.com/chantier</loc>
    <lastmod>${currentDate}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.eagle-prod.com/inspection</loc>
    <lastmod>${currentDate}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.eagle-prod.com/zone</loc>
    <lastmod>${currentDate}</lastmod>
    <priority>0.8</priority>
  </url>`;

// Ajouter chaque article de blog individuellement
posts.forEach(post => {
  sitemap += `
  <url>
    <loc>https://www.eagle-prod.com${post.url}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
});

sitemap += '\n</urlset>';

fs.writeFileSync(path.join(__dirname, 'dist', 'sitemap.xml'), sitemap);
console.log(`  ✅ Sitemap généré avec ${posts.length} articles de blog individuels`);

// ─── Helpers pour échapper les valeurs HTML ──────────────────────────────────
const escHtml = (str) => (str || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ─── Injecte les metas SEO dans un HTML de base ───────────────────────────────
const injectMetas = (baseHtml, { title, description, canonical, ogImage, ogType = 'website', articleSchema = null, pageSchema = null }) => {
  let html = baseHtml;

  // title
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escHtml(title)}</title>`);

  // meta description
  html = html.replace(/(<meta name="description" content=")[^"]*(")/,  `$1${escHtml(description)}$2`);

  // og:title
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/,  `$1${escHtml(title)}$2`);

  // og:description
  html = html.replace(/(<meta property="og:description" content=")[^"]*(")/,  `$1${escHtml(description)}$2`);

  // og:type
  html = html.replace(/(<meta property="og:type" content=")[^"]*(")/,  `$1${escHtml(ogType)}$2`);

  // og:url
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/,  `$1${escHtml(canonical)}$2`);

  // og:image
  if (ogImage) {
    html = html.replace(/(<meta property="og:image" content=")[^"]*(")/,  `$1${escHtml(ogImage)}$2`);
  }

  // twitter:title
  html = html.replace(/(<meta name="twitter:title" content=")[^"]*(")/,  `$1${escHtml(title)}$2`);

  // twitter:description
  html = html.replace(/(<meta name="twitter:description" content=")[^"]*(")/,  `$1${escHtml(description)}$2`);

  // twitter:url
  html = html.replace(/(<meta name="twitter:url" content=")[^"]*(")/,  `$1${escHtml(canonical)}$2`);

  // canonical
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/,  `$1${escHtml(canonical)}$2`);

  // Injecter schema JSON-LD avant </head>
  const schemas = [];
  if (articleSchema) schemas.push(`<script type="application/ld+json">${JSON.stringify(articleSchema)}</script>`);
  if (pageSchema)    schemas.push(`<script type="application/ld+json">${JSON.stringify(pageSchema)}</script>`);
  if (schemas.length) {
    html = html.replace('</head>', schemas.join('\n') + '\n</head>');
  }

  return html;
};

// ─── Génère les pages HTML statiques pour le pré-rendu ───────────────────────
const generateStaticPages = (posts, baseHtml) => {
  console.log('🏗️  Génération pages HTML statiques (pré-rendu SEO)...');
  const BASE = 'https://www.eagle-prod.com';

  // --- Pages statiques connues ---
  const staticPages = [
    {
      path: 'blog',
      title: 'Blog Drone, Vidéo & Digital | Eagle Production Angoulême',
      description: 'Articles sur la captation drone, le montage vidéo professionnel et la présence digitale locale à Angoulême et en Nouvelle-Aquitaine.',
      canonical: `${BASE}/blog`,
    },
    {
      path: 'faq',
      title: 'FAQ Drone & Vidéo Angoulême | Questions Fréquentes | Eagle Production',
      description: 'Toutes les réponses sur nos prestations drone, vidéo et digital à Angoulême : réglementation DGAC, qualité 4K, tarifs, délais, livrables. Télépilote certifié en Charente et Nouvelle-Aquitaine.',
      canonical: `${BASE}/faq`,
    },
    {
      path: 'contact',
      title: 'Contact & Devis Gratuit | Eagle Production Angoulême — Drone & Vidéo',
      description: 'Contactez Eagle Production pour un devis gratuit : captation drone, montage vidéo, suivi de chantier ou inspection à Angoulême et en Nouvelle-Aquitaine. Réponse sous 24h.',
      canonical: `${BASE}/contact`,
    },
    {
      path: 'chantier',
      title: 'Suivi de Chantier par Drone Angoulême | Eagle Production',
      description: 'Suivi de chantier BTP par drone à Angoulême et en Charente. Photos 4K, orthophoto, comparatifs, rapport PDF. Télépilote certifié DGAC.',
      canonical: `${BASE}/chantier`,
    },
    {
      path: 'inspection',
      title: 'Inspection de Bâtiments par Drone Angoulême | Eagle Production',
      description: 'Eagle Production inspecte vos toitures, façades et structures par drone à Angoulême et en Charente. Vues 4K, rapport illustré PDF, télépilote certifié DGAC. Devis gratuit.',
      canonical: `${BASE}/inspection`,
    },
    {
      path: 'zone',
      title: 'Zone d\'Intervention Drone Nouvelle-Aquitaine | Eagle Production Angoulême',
      description: 'Eagle Production intervient dans toute la Nouvelle-Aquitaine : Angoulême, Cognac, Bordeaux, La Rochelle, Poitiers, Périgueux, Niort, Saintes, Royan. Télépilote drone certifié DGAC.',
      canonical: `${BASE}/zone`,
    },
  ];

  staticPages.forEach(({ path: pagePath, title, description, canonical }) => {
    const dir = path.join(__dirname, 'dist', pagePath);
    fs.mkdirSync(dir, { recursive: true });
    const html = injectMetas(baseHtml, { title, description, canonical });
    fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
  });
  console.log(`  ✅ ${staticPages.length} pages statiques générées`);

  // --- Pages d'articles de blog ---
  let count = 0;
  posts.forEach(post => {
    const canonical = `${BASE}/blog/${post.slug}`;
    const ogImage = post.coverImage
      ? (post.coverImage.startsWith('http') ? post.coverImage : `${BASE}${post.coverImage}`)
      : `${BASE}/Photo_de_paul_bardin.webp`;

    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      image: ogImage,
      datePublished: post.date,
      dateModified: post.date,
      author: { '@type': 'Person', name: 'Paul Bardin', url: BASE },
      publisher: {
        '@type': 'Organization',
        name: 'Eagle Production',
        logo: { '@type': 'ImageObject', url: `${BASE}/media/logo_beige.png` }
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
      articleSection: post.category,
      keywords: post.tags.join(', '),
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${BASE}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/blog` },
        { '@type': 'ListItem', position: 3, name: post.title, item: canonical },
      ],
    };

    const html = injectMetas(baseHtml, {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      canonical,
      ogImage,
      ogType: 'article',
      articleSchema,
      pageSchema: breadcrumbSchema,
    });

    const dir = path.join(__dirname, 'dist', 'blog', post.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
    count++;
  });
  console.log(`  ✅ ${count} pages d'articles générées avec metas SEO statiques`);
};

// ─── Générer schemas microdata dans index.html ────────────────────────────────
const injectMicrodataSchemas = (posts) => {
  console.log('📋 Injection schemas microdata dans index.html...');

  const businessSchema = `
  <div itemscope itemtype="https://schema.org/LocalBusiness" style="display:none">
    <meta itemprop="name" content="Eagle Production">
    <meta itemprop="description" content="Télépilote professionnel de drone certifié DGAC à Angoulême. Vidéo aérienne 4K, photographie immobilière, photogrammétrie, suivi de chantier.">
    <meta itemprop="url" content="https://www.eagle-prod.com">
    <meta itemprop="telephone" content="+33699361715">
    <div itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
      <meta itemprop="addressLocality" content="Angoulême">
      <meta itemprop="addressRegion" content="Charente">
      <meta itemprop="postalCode" content="16000">
      <meta itemprop="addressCountry" content="FR">
    </div>
    <div itemprop="geo" itemscope itemtype="https://schema.org/GeoCoordinates">
      <meta itemprop="latitude" content="45.6484">
      <meta itemprop="longitude" content="0.1562">
    </div>
    <meta itemprop="openingHours" content="Mo-Fr 09:00-18:00">
    <meta itemprop="priceRange" content="€€">
    <meta itemprop="image" content="https://www.eagle-prod.com/Photo_de_paul_bardin.webp">
    <meta itemprop="logo" content="https://www.eagle-prod.com/media/logo_beige.png">
    <div itemprop="founder" itemscope itemtype="https://schema.org/Person">
      <meta itemprop="name" content="Paul Bardin">
      <meta itemprop="jobTitle" content="Télépilote de drone certifié DGAC">
    </div>
  </div>`;

  const indexPath = path.join(__dirname, 'dist', 'index.html');
  let html = fs.readFileSync(indexPath, 'utf-8');
  html = html.replace('</body>', businessSchema + '\n</body>');
  fs.writeFileSync(indexPath, html, 'utf-8');
  console.log(`  ✅ Microdata injectées dans index.html`);
};

// ─── Lecture du index.html buildé AVANT de générer les pages statiques ────────
const distIndexPath = path.join(__dirname, 'dist', 'index.html');
const baseHtml = fs.readFileSync(distIndexPath, 'utf-8');

// ─── Lancer les générations ───────────────────────────────────────────────────
generateStaticPages(posts, baseHtml);
injectMicrodataSchemas(posts);

console.log('✅ Build terminé !');
console.log(`📊 SEO : ${posts.length} articles pré-rendus, sitemap à jour, metas statiques injectées`);
