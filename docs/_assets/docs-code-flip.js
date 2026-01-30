/**
 * NXO Design System - Code Flip / Multi-language Code Viewer
 * Handles preview/code toggle and framework tabs (HTML, React, Angular, PHP/Symfony)
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
    initCodeFlipButtons();
    initFrameworkTabs();
    initCopyButtons();
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // CODE FLIP - Toggle between Preview and Code view
  // ═══════════════════════════════════════════════════════════════════════════

  function initCodeFlipButtons() {
    document.querySelectorAll('.doc-demo__flip-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const demo = this.closest('.doc-demo');
        const preview = demo.querySelector('.doc-demo__preview');
        const codePanel = demo.querySelector('.doc-demo__code-panel');

        if (!preview || !codePanel) return;

        const isShowingCode = codePanel.classList.contains('active');

        if (isShowingCode) {
          // Show preview
          preview.classList.remove('hidden');
          codePanel.classList.remove('active');
          this.innerHTML = '<i class="fa-solid fa-code"></i>';
          this.title = 'Voir le code';
        } else {
          // Show code
          preview.classList.add('hidden');
          codePanel.classList.add('active');
          this.innerHTML = '<i class="fa-solid fa-eye"></i>';
          this.title = 'Voir le preview';
        }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // FRAMEWORK TABS - Switch between HTML, React, Angular, PHP/Symfony
  // ═══════════════════════════════════════════════════════════════════════════

  function initFrameworkTabs() {
    document.querySelectorAll('.doc-code-tab').forEach(tab => {
      tab.addEventListener('click', function() {
        const tabsContainer = this.closest('.doc-code-tabs');
        const codePanel = this.closest('.doc-demo__code-panel');
        const targetLang = this.dataset.lang;

        if (!codePanel || !targetLang) return;

        // Deactivate all tabs in this group
        tabsContainer.querySelectorAll('.doc-code-tab').forEach(t => {
          t.classList.remove('active');
        });

        // Activate clicked tab
        this.classList.add('active');

        // Hide all code panels and show selected
        codePanel.querySelectorAll('.doc-code-content').forEach(content => {
          content.classList.remove('active');
        });

        const targetContent = codePanel.querySelector(`.doc-code-content[data-lang="${targetLang}"]`);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // COPY BUTTON - Copy code to clipboard
  // ═══════════════════════════════════════════════════════════════════════════

  function initCopyButtons() {
    document.querySelectorAll('.doc-code-copy').forEach(btn => {
      btn.addEventListener('click', async function() {
        const codePanel = this.closest('.doc-demo__code-panel');
        const activeContent = codePanel.querySelector('.doc-code-content.active');

        if (!activeContent) return;

        const code = activeContent.querySelector('pre').textContent;

        try {
          await navigator.clipboard.writeText(code);

          // Visual feedback
          const originalHTML = this.innerHTML;
          this.innerHTML = '<i class="fa-solid fa-check"></i>';
          this.classList.add('copied');

          setTimeout(() => {
            this.innerHTML = originalHTML;
            this.classList.remove('copied');
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      });
    });
  }

})();
