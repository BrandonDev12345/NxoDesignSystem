/**
 * NXO Design System - Sidebar Navigation
 * Handles sidebar scroll preservation when clicking links
 */

(function() {
  'use strict';

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    // Restore sidebar scroll position from localStorage on page load
    const savedScrollPos = localStorage.getItem('nxo-sidebar-scroll');
    if (savedScrollPos) {
      sidebar.scrollTop = parseInt(savedScrollPos, 10);
    }

    // Save sidebar scroll position before navigating to another page
    document.querySelectorAll('.doc-sidebar__link').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // Save sidebar scroll position to localStorage
        localStorage.setItem('nxo-sidebar-scroll', sidebar.scrollTop);

        // Handle internal anchor links (href="#...")
        if (href && href.startsWith('#')) {
          e.preventDefault();

          const sidebarScrollPos = sidebar.scrollTop;
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }

          // Restore sidebar scroll position
          setTimeout(() => {
            sidebar.scrollTop = sidebarScrollPos;
          }, 10);
        }
        // For page links (href="page.html"), let the default behavior happen
        // The scroll position is already saved to localStorage
      });
    });
  }

})();
