/* ===================================================================
   LAZY LOADING FUNCTIONALITY
   =================================================================== */

// Lazy loading pour les images
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });

  lazyImages.forEach(img => imageObserver.observe(img));
}

// Lazy loading pour les sections
function initSectionLazyLoading() {
  const lazySections = document.querySelectorAll('.lazy-section');
  
  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target;
        section.classList.add('loaded');
        observer.unobserve(section);
      }
    });
  }, {
    rootMargin: '100px 0px',
    threshold: 0.1
  });

  lazySections.forEach(section => sectionObserver.observe(section));
}

// Progressive image loading
function initProgressiveImages() {
  const progressiveImages = document.querySelectorAll('.progressive-img');
  
  progressiveImages.forEach(img => {
    const highQualitySrc = img.dataset.highQuality;
    if (highQualitySrc) {
      const tempImg = new Image();
      tempImg.onload = function() {
        img.src = highQualitySrc;
        img.classList.add('loaded');
      };
      tempImg.src = highQualitySrc;
    }
  });
}

// Image optimization checker
function checkImageOptimization() {
  const images = document.querySelectorAll('img');
  let optimizedCount = 0;
  let totalCount = images.length;
  
  images.forEach(img => {
    // Vérifier si l'image est WebP
    if (img.src.includes('.webp')) {
      optimizedCount++;
      img.parentElement.classList.add('img-compressed');
    }
    
    // Vérifier la taille de l'image
    if (img.naturalWidth > 0 && img.naturalHeight > 0) {
      const size = img.naturalWidth * img.naturalHeight;
      if (size < 1000000) { // Moins de 1MP
        img.parentElement.classList.add('img-compressed');
      }
    }
  });
  
  console.log(`Images optimisées: ${optimizedCount}/${totalCount}`);
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
  initLazyLoading();
  initSectionLazyLoading();
  initProgressiveImages();
  checkImageOptimization();
});

// Export pour utilisation externe
window.VPRRLazyLoading = {
  init: initLazyLoading,
  sections: initSectionLazyLoading,
  progressive: initProgressiveImages,
  check: checkImageOptimization
};
