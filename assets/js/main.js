/**
 * @file Script principal pour l'interactivité du site VPRR.
 * Gère la navigation mobile, le scroll-spy, les animations et la carte.
 */

// Attend que le DOM soit entièrement chargé avant d'exécuter le script.
document.addEventListener("DOMContentLoaded", () => {
  // --- GESTION DE LA NAVIGATION ---

  // Sélection des éléments du DOM nécessaires pour la navigation
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".primary-nav");
  const navLinks = Array.from(document.querySelectorAll('.primary-nav .menu a.nav-link'));
  const navButtons = Array.from(document.querySelectorAll('.primary-nav .menu a.btn'));
  
  // S'assure que les boutons CTA ne sont pas considérés comme des liens de navigation actifs.
  navButtons.forEach((b) => { 
    b.classList.remove('active'); 
    b.removeAttribute('aria-current'); 
  });
  
  /**
   * Met à jour l'état visuel du lien de navigation actif.
   * @param {HTMLElement} link - Le lien à marquer comme actif.
   */
  const setActive = (link) => {
    navLinks.forEach(a => {
      a.classList.remove('active');
      a.removeAttribute('aria-current');
    });
    if (link) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  };

  // --- GESTION DU MENU MOBILE ---
  if (burger && nav) {
    console.log('Burger menu trouvé:', burger);
    console.log('Navigation trouvée:', nav);
    
    // Variable pour éviter les doubles clics
    let isProcessing = false;
    
    // Variables pour gérer la position du scroll
    let scrollPosition = 0;
    let bodyTop = 0;
    
    // Supprimer tous les écouteurs existants pour éviter les doublons
    burger.removeEventListener('click', burgerClickHandler);
    
    // Fonction du gestionnaire de clic
    function burgerClickHandler(e) {
      if (isProcessing) return;
      isProcessing = true;
      
      console.log('Burger cliqué!');
      e.preventDefault();
      e.stopPropagation();
      
      const isOpen = nav.classList.contains("open");
      console.log('Menu ouvert actuel:', isOpen);
      
      if (isOpen) {
        // Fermer le menu
        nav.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
        document.body.classList.remove('nav-open');
        burger.style.background = ''; // Reset
        nav.style.display = 'none';
        
        // Restaurer la position du scroll
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.height = '';
        window.scrollTo(0, scrollPosition);
        
        console.log('Menu fermé - Scroll restauré à:', scrollPosition);
      } else {
        // Sauvegarder la position du scroll avant d'ouvrir le menu
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        bodyTop = document.body.style.top;
        
        // Ouvrir le menu - DESIGN CORRIGÉ
        nav.classList.add("open");
        burger.setAttribute("aria-expanded", "true");
        document.body.classList.add('nav-open');
        
        // Appliquer le position fixed avec la position sauvegardée
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.width = '100%';
        document.body.style.height = '100vh';
        
        // Forcer l'affichage avec le design agrandi
        nav.style.display = 'flex !important';
        nav.style.position = 'fixed !important';
        nav.style.top = '0 !important';
        nav.style.right = '0 !important';
        nav.style.bottom = '0 !important';
        nav.style.width = '320px !important';
        nav.style.maxWidth = '90vw !important';
        nav.style.background = 'rgba(255, 255, 255, 0.95) !important';
        nav.style.backdropFilter = 'blur(20px) !important';
        nav.style.webkitBackdropFilter = 'blur(20px) !important';
        nav.style.borderLeft = '1px solid rgba(255, 255, 255, 0.3) !important';
        nav.style.transform = 'translateX(0) !important';
        nav.style.zIndex = '999 !important';
        nav.style.boxShadow = '-6px 0 24px rgba(0, 0, 0, 0.1) !important';
        nav.style.padding = 'var(--space-md) !important';
        nav.style.paddingTop = 'calc(60px + var(--space-md)) !important';
        nav.style.paddingBottom = 'var(--space-lg) !important';
        
        console.log('Menu ouvert - Design corrigé et compact');
      }
      
      // Réinitialiser après un délai plus long pour éviter les doubles clics
      setTimeout(() => {
        isProcessing = false;
        console.log('isProcessing réinitialisé - clic autorisé');
      }, 1000);
    }
    
    // Attacher l'écouteur une seule fois
    burger.addEventListener("click", burgerClickHandler);

    // FERMETURE MANUELLE SEULEMENT - PAS DE FERMETURE AUTOMATIQUE
    // document.addEventListener('click', function closeMenu(e) {
    //   if (nav.classList.contains('open') && 
    //       !nav.contains(e.target) && 
    //       !burger.contains(e.target)) {
    //     console.log('Fermeture par clic sur overlay');
    //     nav.classList.remove('open');
    //     burger.setAttribute('aria-expanded', 'false');
    //     document.body.classList.remove('nav-open');
    //     burger.style.background = ''; // Reset
    //   }
    // });

    // Debug : écouter tous les clics sur les liens services
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a');
      if (target && target.classList.contains('service-cta-card')) {
        console.log('CLIC SUR CARTE SERVICE DÉTECTÉ:', target.href);
        console.log('Target:', target);
        console.log('Event:', e);
        console.log('URL actuelle avant clic:', window.location.href);
      }
    }, true);

    // Debug : monitorer tous les changements d'URL
    let currentUrl = window.location.href;
    console.log('URL initiale:', currentUrl);
    
    // Surveiller les changements d'URL
    setInterval(() => {
      if (window.location.href !== currentUrl) {
        console.log('URL CHANGÉE de:', currentUrl);
        console.log('URL CHANGÉE vers:', window.location.href);
        
        // Afficher la stack trace pour voir qui a causé le changement
        console.trace('Stack trace du changement d\'URL');
        
        currentUrl = window.location.href;
      }
    }, 100);
    
    // Debug : intercepter TOUS les appels à window.location
    const originalReplace = window.location.replace;
    const originalAssign = window.location.assign;
    const originalHash = window.location.hash;
    
    // Intercepter window.location.href
    let hrefValue = window.location.href;
    Object.defineProperty(window.location, 'href', {
      get: function() {
        return hrefValue;
      },
      set: function(value) {
        console.log('window.location.href MODIFIÉ vers:', value);
        console.trace('Stack trace de href modification');
        hrefValue = value;
        return value;
      }
    });
    
    // Intercepter window.location.hash
    Object.defineProperty(window.location, 'hash', {
      get: function() {
        return originalHash;
      },
      set: function(value) {
        console.log('window.location.hash MODIFIÉ vers:', value);
        console.trace('Stack trace de hash modification');
        return originalHash = value;
      }
    });
    
    window.location.replace = function(...args) {
      console.log('window.location.replace appelé avec:', args);
      console.trace('Stack trace de replace');
      return originalReplace.apply(this, args);
    };
    
    window.location.assign = function(...args) {
      console.log('window.location.assign appelé avec:', args);
      console.trace('Stack trace de assign');
      return originalAssign.apply(this, args);
    };

    // Amélioration de l'accessibilité : ferme le menu avec la touche 'Échap'.
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
        
        // Restaurer la position du scroll
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.height = '';
        window.scrollTo(0, scrollPosition);
        
        burger.focus();
        console.log('Menu fermé par Échap - Scroll restauré à:', scrollPosition);
      }
    }, { passive: true });

    // Ferme automatiquement le menu mobile après avoir cliqué sur un lien.
    nav.querySelectorAll("a[href^='#']").forEach((link) => {
      link.addEventListener("click", (e) => {
        setActive(link);
        // Fermeture du menu mobile
        nav.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
        document.body.classList.remove('nav-open');
        burger.style.background = ''; // Reset
        
        // Restaurer la position du scroll
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.height = '';
        window.scrollTo(0, scrollPosition);
        
        console.log('Menu fermé par lien - Scroll restauré à:', scrollPosition);
        
        // Gère le défilement pour le lien '#top'
        const href = link.getAttribute('href') || '';
        if (href === '#top') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });

    // Amélioration de l'accessibilité : permet la navigation au clavier dans le menu.
    navLinks.forEach((a, idx) => {
      a.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          const next = navLinks[(idx + 1) % navLinks.length];
          next.focus();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          const prev = navLinks[(idx - 1 + navLinks.length) % navLinks.length];
          prev.focus();
        }
      });
    });
  }

  // --- SMOOTH SCROLL AMÉLIORÉ ---
  // Gère le défilement fluide pour les liens d'ancrage internes uniquement
  document.querySelectorAll('a[href^="#"], a[href*=".html#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      console.log('Smooth scroll intercepté:', href);
      
      // Ignorer les liens qui pointent vers d'autres pages
      if (href.includes('.html#') || href.startsWith('index.html#') || href.startsWith('../index.html#')) {
        console.log('Lien inter-page ignoré:', href);
        return; // Laisser le comportement par défaut pour les liens inter-pages
      }
      if (href === '#top') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 72;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- SCROLL SPY AMÉLIORÉ ---
  // Met en surbrillance le lien de navigation correspondant à la section visible à l'écran.
  const sectionLinks = Array.from(document.querySelectorAll('.primary-nav .menu a.nav-link[href*="#"]'));
  const idFromHref = (href) => {
  const hashIndex = href.indexOf('#');
  return hashIndex !== -1 ? href.substring(hashIndex + 1) : '';
};
  const targets = sectionLinks
    .map(a => ({ a, el: document.getElementById(idFromHref(a.getAttribute('href'))) }));
  
  // Garder une référence de tous les liens pour la navigation
  const allLinks = sectionLinks;

  const observeSections = () => {
    // Cache des positions des sections (évite le layout thrashing)
    let sectionPositions = [];
    let lastActiveHref = null;
    let cachedViewportHeight = window.innerHeight; // Cache la hauteur viewport
    
    // Calculer les positions une seule fois, puis recalculer au resize
    const updatePositions = () => {
      // Lire toutes les dimensions en une seule passe (batch read)
      const positions = [];
      const scrollY = window.scrollY;
      cachedViewportHeight = window.innerHeight; // Mettre à jour au resize
      
      for (const { a, el } of targets.filter(x => !!x.el)) {
        const rect = el.getBoundingClientRect();
        positions.push({
          a,
          top: rect.top + scrollY,
          bottom: rect.top + scrollY + rect.height
        });
      }
      
      sectionPositions = positions;
    };
    
    // Différer le calcul initial après le premier rendu
    requestAnimationFrame(() => {
      requestAnimationFrame(updatePositions);
    });
    
    const onScroll = () => {
      // Utiliser la hauteur viewport cachée (pas de lecture DOM)
      const scrollPosition = window.scrollY + cachedViewportHeight / 3;
      let currentSection = null;
      
      // Utiliser les positions cachées (pas de getBoundingClientRect)
      for (const section of sectionPositions) {
        if (scrollPosition >= section.top && scrollPosition < section.bottom) {
          currentSection = section.a;
          break;
        }
      }
      
      // Si aucune section trouvée, prendre la plus proche
      if (!currentSection && sectionPositions.length > 0) {
        let bestDistance = Infinity;
        for (const section of sectionPositions) {
          const distance = Math.abs(scrollPosition - section.top);
          if (distance < bestDistance) {
            bestDistance = distance;
            currentSection = section.a;
          }
        }
      }
      
      if (currentSection) {
        const href = currentSection.getAttribute('href');
        // Éviter les mises à jour inutiles
        if (href !== lastActiveHref) {
          lastActiveHref = href;
          setActive(currentSection);
          if (history.replaceState && href) {
            history.replaceState(null, null, href);
          }
        }
      }
    };
    
    // Throttle pour les performances
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          onScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Recalculer les positions au resize (debounced)
    let resizeTimeout;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updatePositions, 150);
    };
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    
    // Différer l'appel initial pour ne pas bloquer le rendu
    requestAnimationFrame(() => {
      requestAnimationFrame(onScroll);
    });
  };

  // Différer l'initialisation du scroll spy
  requestAnimationFrame(observeSections);

  // --- SCROLL REVEAL ANIMATIONS ---
  const initScrollReveal = () => {
    const revealElements = document.querySelectorAll(
      '.service-card, .faq-item, .contact-panel, .zone-map-container, .zone-address, .zone-cities, .zone-note'
    );
    
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Ajouter la classe initiale
      revealElements.forEach(el => {
        el.classList.add('reveal-hidden');
      });
      
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Délai progressif pour effet cascade
            setTimeout(() => {
              entry.target.classList.add('reveal-visible');
              entry.target.classList.remove('reveal-hidden');
            }, index * 100);
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
      
      revealElements.forEach(el => revealObserver.observe(el));
    }
  };
  
  initScrollReveal();

  // --- GESTION FAQ ACCORDION (Exclusif) ---
  const details = document.querySelectorAll("details");

  details.forEach((detail) => {
    detail.addEventListener("toggle", (e) => {
      if (detail.open) {
        details.forEach((otherDetail) => {
          if (otherDetail !== detail && otherDetail.open) {
            otherDetail.removeAttribute("open");
          }
        });
      }
    });
  });

  // --- CARTE ZONE D'INTERVENTION CHARENTE ---
  const initZoneMap = () => {
    const mapContainer = document.getElementById('zone-map');
    if (!mapContainer || typeof L === 'undefined') return;

    // S'assurer que le conteneur est visible et prêt
    if (mapContainer.offsetWidth === 0 || mapContainer.offsetHeight === 0) {
      console.log('Carte: conteneur pas encore visible, retry...');
      setTimeout(() => initZoneMap(), 500);
      return;
    }

    // Lazy loading de la carte avec IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadMapWhenVisible();
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '100px', // Commencer à charger 100px avant que ce soit visible
      threshold: 0.1
    });

    observer.observe(mapContainer);

    const loadMapWhenVisible = () => {
      // Ajouter un état de chargement
      mapContainer.classList.add('map-loading');
      console.log('Carte: début du chargement');
    
    // Coordonnées précises de L'Isle-d'Espagnac (siège)
    const headquarters = [45.6580, 0.1920];

    // Initialisation de la carte (statique et centrée sur la Charente)
    const map = L.map('zone-map', {
      center: [45.65, 0.15],
      zoom: 9,
      zoomControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      dragging: false,
      touchZoom: false,
      attributionControl: false,
      preferCanvas: true, // Optimisation performance
      updateWhenZooming: false, // Optimisation performance
      updateWhenIdle: true, // Optimisation performance
      bounceAtZoomLimits: false // Optimisation performance
    });

    // Fond de carte optimisé avec cache
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '',
      subdomains: 'abcd',
      maxZoom: 19,
      opacity: 0.6,
      updateWhenIdle: true, // Optimisation performance
      updateWhenZooming: false, // Optimisation performance
      keepBuffer: 2, // Réduire le buffer pour économiser la mémoire
      className: 'map-tiles' // Pour le style CSS
    }).on('tileload', function() {
      // Retirer l'état de chargement quand les tuiles commencent à charger
      mapContainer.classList.remove('map-loading');
      mapContainer.classList.add('map-loaded');
    }).addTo(map);

    // Précharger le GeoJSON avec cache
    const loadCharenteGeoJSON = async () => {
      try {
        // Utiliser le cache si disponible
        const cacheKey = 'charente-geojson';
        const cachedData = localStorage.getItem(cacheKey);
        let data;
        
        if (cachedData) {
          data = JSON.parse(cachedData);
        } else {
          const response = await fetch('data/charente.geojson');
          if (!response.ok) throw new Error('Erreur réseau');
          data = await response.json();
          // Mettre en cache pour 24h
          localStorage.setItem(cacheKey, JSON.stringify(data));
        }
        
        // Ajouter les contours de la Charente avec style optimisé
        L.geoJSON(data, {
          style: {
            color: '#673A12',
            weight: 2, // Réduit pour performance
            opacity: 0.9,
            fillColor: '#A88B5E',
            fillOpacity: 0.15,
            lineCap: 'round',
            lineJoin: 'round'
          },
          smoothFactor: 0.5, // Optimisation performance
          simplifyTolerance: 0.02 // Simplifier les géométries
        }).addTo(map);
        
        // Ajuster la vue sur la Charente
        const charenteLayer = L.geoJSON(data);
        map.fitBounds(charenteLayer.getBounds(), { 
          padding: [20, 20],
          maxZoom: 10 // Limiter le zoom pour performance
        });
        
      } catch (error) {
        console.warn('Impossible de charger les contours de la Charente:', error);
        // Fallback avec contours simplifiés pour performance
        const charenteBounds = [
          [46.1500, 0.1833], [46.1333, 0.3667], [46.0167, 0.4500], [45.9833, 0.6333],
          [45.9500, 0.6500], [45.8667, 0.6500], [45.7833, 0.6333], [45.7000, 0.6167],
          [45.6167, 0.5833], [45.5333, 0.5167], [45.4500, 0.4333], [45.3833, 0.3167],
          [45.3333, 0.2000], [45.3000, 0.0833], [45.2833, -0.0333], [45.3000, -0.1500],
          [45.3500, -0.2667], [45.4167, -0.3500], [45.5000, -0.4333], [45.5833, -0.4667],
          [45.6667, -0.4500], [45.7500, -0.3333], [45.8333, -0.2000], [45.9167, -0.1167],
          [46.0000, -0.0500], [46.0833, 0.0500], [46.1500, 0.1833]
        ];
        
        L.polygon(charenteBounds, {
          color: '#673A12',
          weight: 2,
          opacity: 0.8,
          fillColor: '#A88B5E',
          fillOpacity: 0.12,
          lineCap: 'round',
          lineJoin: 'round'
        }).addTo(map);
        
        // Retirer l'état de chargement même avec fallback
        mapContainer.classList.remove('map-loading');
        mapContainer.classList.add('map-loaded');
      }
    };
    
    // Charger le GeoJSON de manière asynchrone
    loadCharenteGeoJSON();
    };

    // Marqueur siège avec animation pulse corrigée
    const hqIcon = L.divIcon({
      className: 'hq-marker-centered',
      html: `
        <div class="hq-pulse-ring"></div>
        <div class="hq-marker-dot"></div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });
    
    const hqMarker = L.marker(headquarters, { 
      icon: hqIcon, 
      zIndexOffset: 1000,
      alt: 'Siège VPRR - 136 Avenue de la République, L\'Isle-d\'Espagnac',
      title: 'Siège VPRR - L\'Isle-d\'Espagnac'
    }).addTo(map);
    
    // Ajouter aria-label au marqueur pour l'accessibilité
    setTimeout(() => {
      const markerElement = document.querySelector('.hq-marker-centered');
      if (markerElement) {
        markerElement.setAttribute('aria-label', 'Siège VPRR - 136 Avenue de la République, L\'Isle-d\'Espagnac');
      }
    }, 100);

    // Popup avec adresse et itinéraire
    hqMarker.bindPopup(`
      <div class="zone-popup-hq-new">
        <div class="popup-address">
          <strong>136 Avenue de la République</strong><br>
          16340 L'Isle-d'Espagnac
        </div>
        <a href="https://www.google.com/maps/dir/?api=1&destination=136+Avenue+de+la+R%C3%A9publique,+16340+L'Isle-d'Espagnac" 
           target="_blank" 
           class="popup-directions-btn">
          Lancer l'itinéraire
        </a>
      </div>
    `, {
      className: 'zone-popup-new',
      closeButton: false,
      offset: [0, -15],
      autoPan: false
    });

    // Ouvrir le popup automatiquement après un délai
    setTimeout(() => {
      hqMarker.openPopup();
    }, 1500);
  };

  // Initialiser la carte quand Leaflet est chargé (lazy-loaded)
  // Système unifié pour éviter les conflits
  const waitForLeaflet = () => {
    console.log('Carte: attente de Leaflet...');
    
    // Réessayer toutes les 300ms jusqu'à ce que Leaflet soit chargé
    const checkLeaflet = setInterval(() => {
      if (typeof L !== 'undefined') {
        clearInterval(checkLeaflet);
        console.log('Carte: Leaflet détecté, initialisation...');
        initZoneMap();
      }
    }, 300);
    
    // Arrêter après 15 secondes si Leaflet n'est jamais chargé
    setTimeout(() => {
      clearInterval(checkLeaflet);
      console.log('Carte: timeout - Leaflet non chargé après 15s');
    }, 15000);
  };
  
  // Démarrer la vérification après le chargement de la page
  if (document.readyState === 'complete') {
    waitForLeaflet();
  } else {
    window.addEventListener('load', waitForLeaflet, { once: true });
  }
  

  // --- ANNÉE DYNAMIQUE DANS LE FOOTER ---
  const updateCurrentYear = () => {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  };

  // --- INITIALISATION AU CHARGEMENT ---
  window.addEventListener('load', () => {
    
    // Mettre à jour l'année
    updateCurrentYear();
  }, { once: true });
});