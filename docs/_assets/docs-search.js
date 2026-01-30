/**
 * NXO Design System - Command Palette / Search
 * Provides Ctrl+K searchable navigation for documentation
 */

(function() {
  'use strict';

  // Search items from sidebar navigation
  const searchItems = [
    // Introduction
    { title: "Vue d'ensemble", href: "index.html", section: "Introduction", icon: "fa-home", keywords: "accueil home overview" },
    { title: "Demarrage", href: "getting-started.html", section: "Introduction", icon: "fa-rocket", keywords: "start installation setup" },

    // Fondations
    { title: "Couleurs", href: "colors.html", section: "Fondations", icon: "fa-palette", keywords: "colors palette theme" },
    { title: "Typographie", href: "typography.html", section: "Fondations", icon: "fa-font", keywords: "fonts text heading" },
    { title: "Espacements", href: "spacing.html", section: "Fondations", icon: "fa-arrows-alt", keywords: "spacing margin padding gap" },
    { title: "Tous les tokens", href: "tokens.html", section: "Fondations", icon: "fa-code", keywords: "tokens variables css" },

    // Composants
    { title: "Boutons", href: "buttons.html", section: "Composants", icon: "fa-square", keywords: "button btn click action" },
    { title: "Formulaires", href: "forms.html", section: "Composants", icon: "fa-rectangle-list", keywords: "form input select checkbox radio" },
    { title: "Cards", href: "cards.html", section: "Composants", icon: "fa-id-card", keywords: "card box container" },
    { title: "Tableaux", href: "tables.html", section: "Composants", icon: "fa-table", keywords: "table data grid rows" },
    { title: "Badges", href: "badges.html", section: "Composants", icon: "fa-tag", keywords: "badge label tag status" },
    { title: "Alertes", href: "alerts.html", section: "Composants", icon: "fa-bell", keywords: "alert notification warning error success" },
    { title: "Modales", href: "modals.html", section: "Composants", icon: "fa-window-restore", keywords: "modal dialog popup overlay" },
    { title: "Breadcrumb", href: "breadcrumb.html", section: "Composants", icon: "fa-ellipsis", keywords: "breadcrumb navigation path" },
    { title: "Pagination", href: "pagination.html", section: "Composants", icon: "fa-list-ol", keywords: "pagination pages numbers" },
    { title: "Tabs", href: "tabs.html", section: "Composants", icon: "fa-folder", keywords: "tabs onglets navigation" },
    { title: "Navigation", href: "nav.html", section: "Composants", icon: "fa-compass", keywords: "nav navigation menu" },
    { title: "Avatars", href: "avatars.html", section: "Composants", icon: "fa-user-circle", keywords: "avatar user profile picture" },
    { title: "Spinners", href: "spinners.html", section: "Composants", icon: "fa-spinner", keywords: "spinner loading loader" },
    { title: "Progress", href: "progress.html", section: "Composants", icon: "fa-tasks", keywords: "progress bar loading percentage" },
    { title: "Stepper", href: "stepper.html", section: "Composants", icon: "fa-shoe-prints", keywords: "stepper steps wizard" },
    { title: "Accordion", href: "accordion.html", section: "Composants", icon: "fa-chevron-down", keywords: "accordion collapse expand" },
    { title: "Skeleton", href: "skeleton.html", section: "Composants", icon: "fa-bone", keywords: "skeleton loading placeholder" },
    { title: "Empty State", href: "empty.html", section: "Composants", icon: "fa-inbox", keywords: "empty state no data placeholder" },
    { title: "List", href: "list.html", section: "Composants", icon: "fa-list", keywords: "list items" },
    { title: "Timeline", href: "timeline.html", section: "Composants", icon: "fa-clock", keywords: "timeline history events" },
    { title: "Search", href: "search.html", section: "Composants", icon: "fa-search", keywords: "search input filter" },
    { title: "File Upload", href: "fileupload.html", section: "Composants", icon: "fa-upload", keywords: "file upload dropzone" },
    { title: "Divider", href: "divider.html", section: "Composants", icon: "fa-minus", keywords: "divider separator line" },
    { title: "Toasts", href: "toasts.html", section: "Composants", icon: "fa-comment", keywords: "toast notification snackbar" },
    { title: "Dropdown", href: "dropdown.html", section: "Composants", icon: "fa-caret-down", keywords: "dropdown menu select" },
    { title: "Sidebar", href: "sidebar-comp.html", section: "Composants", icon: "fa-bars", keywords: "sidebar navigation menu" },
    { title: "Footer", href: "footer-comp.html", section: "Composants", icon: "fa-shoe-prints", keywords: "footer bottom" },

    // Patterns
    { title: "Headers", href: "headers.html", section: "Patterns", icon: "fa-window-maximize", keywords: "header navbar top" },
    { title: "Page Patterns", href: "page-patterns.html", section: "Patterns", icon: "fa-layer-group", keywords: "page layout template" },

    // Ressources
    { title: "Assets", href: "assets.html", section: "Ressources", icon: "fa-image", keywords: "assets logos icons images" }
  ];

  let modal = null;
  let input = null;
  let itemsContainer = null;
  let selectedIndex = 0;
  let filteredItems = [];

  // Initialize command palette
  function init() {
    createModal();
    bindEvents();
  }

  // Create the modal HTML
  function createModal() {
    modal = document.createElement('div');
    modal.className = 'cmd-palette';
    modal.id = 'cmdPalette';
    modal.innerHTML = `
      <div class="cmd-palette__backdrop"></div>
      <div class="cmd-palette__dialog">
        <div class="cmd-palette__header">
          <i class="fa-solid fa-search cmd-palette__search-icon"></i>
          <input type="text" class="cmd-palette__input" placeholder="Rechercher une page..." autocomplete="off">
          <kbd class="cmd-palette__esc">Esc</kbd>
        </div>
        <div class="cmd-palette__body">
          <div class="cmd-palette__items"></div>
        </div>
        <div class="cmd-palette__footer">
          <span><kbd>&uarr;</kbd><kbd>&darr;</kbd> pour naviguer</span>
          <span><kbd>Enter</kbd> pour ouvrir</span>
          <span><kbd>Esc</kbd> pour fermer</span>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    input = modal.querySelector('.cmd-palette__input');
    itemsContainer = modal.querySelector('.cmd-palette__items');
  }

  // Bind all events
  function bindEvents() {
    // Trigger button
    const trigger = document.getElementById('cmdTrigger');
    if (trigger) {
      trigger.addEventListener('click', openModal);
    }

    // Keyboard shortcut Ctrl+K
    document.addEventListener('keydown', function(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openModal();
      }

      // Close on Escape
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });

    // Backdrop click
    modal.querySelector('.cmd-palette__backdrop').addEventListener('click', closeModal);

    // Input events
    input.addEventListener('input', handleSearch);
    input.addEventListener('keydown', handleKeydown);
  }

  // Open modal
  function openModal() {
    modal.classList.add('open');
    input.value = '';
    selectedIndex = 0;
    renderItems(searchItems);
    input.focus();
  }

  // Close modal
  function closeModal() {
    modal.classList.remove('open');
    input.value = '';
  }

  // Handle search input
  function handleSearch() {
    const query = input.value.toLowerCase().trim();

    if (!query) {
      filteredItems = searchItems;
    } else {
      filteredItems = searchItems.filter(item => {
        return item.title.toLowerCase().includes(query) ||
               item.section.toLowerCase().includes(query) ||
               item.keywords.toLowerCase().includes(query);
      });
    }

    selectedIndex = 0;
    renderItems(filteredItems);
  }

  // Handle keyboard navigation
  function handleKeydown(e) {
    const items = itemsContainer.querySelectorAll('.cmd-palette__item');

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
        updateSelection(items);
        break;

      case 'ArrowUp':
        e.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, 0);
        updateSelection(items);
        break;

      case 'Enter':
        e.preventDefault();
        if (items[selectedIndex]) {
          const href = items[selectedIndex].getAttribute('data-href');
          if (href) {
            window.location.href = href;
          }
        }
        break;
    }
  }

  // Update visual selection
  function updateSelection(items) {
    items.forEach((item, i) => {
      item.classList.toggle('selected', i === selectedIndex);
    });

    // Scroll into view
    if (items[selectedIndex]) {
      items[selectedIndex].scrollIntoView({ block: 'nearest' });
    }
  }

  // Render items in the list
  function renderItems(items) {
    if (items.length === 0) {
      itemsContainer.innerHTML = `
        <div class="cmd-palette__empty">
          <i class="fa-solid fa-search"></i>
          <p>Aucun resultat trouve</p>
        </div>
      `;
      return;
    }

    // Group by section
    const grouped = {};
    items.forEach(item => {
      if (!grouped[item.section]) {
        grouped[item.section] = [];
      }
      grouped[item.section].push(item);
    });

    let html = '';
    let globalIndex = 0;

    for (const section in grouped) {
      html += `<div class="cmd-palette__section">${section}</div>`;

      grouped[section].forEach(item => {
        const isSelected = globalIndex === selectedIndex ? 'selected' : '';
        html += `
          <div class="cmd-palette__item ${isSelected}" data-href="${item.href}" data-index="${globalIndex}">
            <i class="fa-solid ${item.icon} cmd-palette__item-icon"></i>
            <span class="cmd-palette__item-title">${item.title}</span>
            <i class="fa-solid fa-arrow-right cmd-palette__item-arrow"></i>
          </div>
        `;
        globalIndex++;
      });
    }

    itemsContainer.innerHTML = html;
    filteredItems = items;

    // Add click handlers to items
    itemsContainer.querySelectorAll('.cmd-palette__item').forEach(item => {
      item.addEventListener('click', function() {
        const href = this.getAttribute('data-href');
        if (href) {
          window.location.href = href;
        }
      });

      item.addEventListener('mouseenter', function() {
        const index = parseInt(this.getAttribute('data-index'));
        selectedIndex = index;
        updateSelection(itemsContainer.querySelectorAll('.cmd-palette__item'));
      });
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
