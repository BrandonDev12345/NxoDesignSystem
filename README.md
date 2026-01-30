# NXO Design System - Espace Client

Design System officiel pour l'harmonisation des interfaces des portails clients NXO.

**Version 2.0 - Validé par le Marketing (Décembre 2025)**

---

## Qu'est-ce que c'est ?

Le NXO Design System est une **bibliothèque de composants CSS** prête à l'emploi pour construire des interfaces cohérentes sur tous les portails clients NXO (LINKER, Portail Support, Magento, DV).

### Pourquoi l'utiliser ?

- **Cohérence visuelle** : Tous les portails NXO ont le même look & feel
- **Gain de temps** : Composants prêts à copier-coller, pas besoin de réinventer la roue
- **Validé Marketing** : Design approuvé officiellement, pas de retours à craindre
- **Multi-framework** : Fonctionne avec Angular, React, PHP, ou du HTML simple
- **Dark mode inclus** : Support natif du thème sombre

### Comment ça marche ?

1. **Importez 2 fichiers CSS** dans votre projet (`tokens.css` + `components.css`)
2. **Utilisez les classes CSS** sur vos éléments HTML (ex: `class="nxo-btn nxo-btn-primary"`)
3. **C'est tout !** Les styles s'appliquent automatiquement

> **Note** : Ce Design System fournit uniquement du CSS. Le JavaScript pour l'interactivité (modales, dropdowns, etc.) doit être géré par votre framework (Angular Material, Material UI, etc.) ou écrit manuellement.

---

## Décisions validées - Résumé

| Élément | Décision |
|---------|----------|
| **Police** | Montserrat |
| **Couleur texte** | #212b36 |
| **Fond de page** | Blanc ou gris clair (#f5f5f5) selon contexte |
| **Boutons** | Forme capsule, hauteur 40px (standard), bordure 1px |
| **Badges** | Carré (radius 4px), pas capsule |
| **Bordures** | 1px fine, couleur #e0e0e0 |
| **Arrondis** | 8px standard (cards, modales, inputs) |
| **Ombres** | Pas d'ombre |
| **Liens** | Bleu Fayat (#0055a0) souligné |
| **Tableaux** | Header fond gris + texte bleu (pas fond bleu) |
| **Footer** | Fond bleu Fayat, texte blanc, pas d'arrondi |
| **Avatars** | 32px small, forme ronde |
| **Spinners** | Bleu Fayat |
| **Tooltips** | Sombre et clair (pas bleu) |
| **Breadcrumb** | Avec chevron (›) |

---

## Structure du projet

```
nxo-design-system/
│
├── README.md                    # Ce fichier
├── index.html                   # Page d'accueil / documentation principale
│
├── tokens/
│   └── tokens.css               # Variables CSS (couleurs, espacements, typographie)
│
├── components/
│   └── components.css           # Styles des 31 composants
│
├── assets/
│   ├── logos/                   # Logos NXO et Fayat
│   └── icons/                   # Icônes SVG
│
└── docs/                        # Documentation détaillée
    ├── index.html               # Page d'accueil documentation
    ├── getting-started.html     # Guide de démarrage
    │
    ├── _assets/                 # Ressources CSS/JS de la documentation
    │   ├── docs.css
    │   ├── docs-code-flip.js
    │   ├── docs-search.js
    │   └── docs-sidebar.js
    │
    ├── fondations/              # Design tokens
    │   ├── colors.html
    │   ├── typography.html
    │   ├── spacing.html
    │   └── tokens.html
    │
    ├── composants/              # 27 composants documentés
    │   ├── buttons.html
    │   ├── forms.html
    │   ├── cards.html
    │   ├── tables.html
    │   ├── badges.html
    │   ├── alerts.html
    │   ├── modals.html
    │   ├── breadcrumb.html
    │   ├── pagination.html
    │   ├── tabs.html
    │   ├── nav.html
    │   ├── avatars.html
    │   ├── spinners.html
    │   ├── progress.html
    │   ├── stepper.html
    │   ├── accordion.html
    │   ├── skeleton.html
    │   ├── empty.html
    │   ├── list.html
    │   ├── timeline.html
    │   ├── search.html
    │   ├── fileupload.html
    │   ├── divider.html
    │   ├── toasts.html
    │   ├── dropdown.html
    │   ├── sidebar-comp.html
    │   └── footer-comp.html
    │
    ├── patterns/                # Patterns de pages
    │   ├── headers.html
    │   └── page-patterns.html
    │
    └── ressources/              # Assets et ressources
        └── assets.html
```

---

## Services concernés

| Service | Techno | Framework |
|---------|--------|-----------|
| LINKER | Angular | Angular Material, ABP |
| PORTAIL SUPPORT | React/Next.js | Material UI |
| MAGENTO | PHP + JS | Adobe/Zend |
| DV | PHP 8 / Symfony 6 | JS |

---

## Utilisation

### 1. Importer les fichiers CSS

```html
<!-- Police Montserrat -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- Font Awesome pour les icônes -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

<!-- Design System CSS -->
<link rel="stylesheet" href="tokens/tokens.css">
<link rel="stylesheet" href="components/components.css">
```

### 2. Utiliser les composants

```html
<!-- Bouton primaire -->
<button class="nxo-btn nxo-btn-primary">Mon bouton</button>

<!-- Card -->
<div class="nxo-card">
  <div class="nxo-card-body">
    <h3 class="nxo-card-title">Titre</h3>
    <p>Contenu de la card</p>
  </div>
</div>

<!-- Badge -->
<span class="nxo-badge nxo-badge-success">Actif</span>

<!-- Alert -->
<div class="nxo-alert nxo-alert-info">
  <i class="fa-solid fa-info-circle"></i>
  Message d'information
</div>
```

---

## Tokens principaux

### Couleurs

| Variable | Valeur | Usage |
|----------|--------|-------|
| `--fayat-blue` | #0055a0 | Bleu Fayat principal |
| `--nxo-blue-dark` | #002f60 | Bleu foncé NXO |
| `--nxo-blue-light` | #5692ce | Hover, accents |
| `--nxo-text-body` | #212b36 | Corps de texte |
| `--nxo-border-color` | #e0e0e0 | Bordures |

### Boutons

| Variable | Valeur | Note |
|----------|--------|------|
| `--nxo-btn-height` | 40px | Standard (privilégié) |
| `--nxo-btn-radius` | 9999px | Capsule |
| `--nxo-btn-border-width` | 1px | Fine |
| `--nxo-btn-font-size` | 14px | Standard |
| `--nxo-btn-padding-x` | 24px | Standard |

### Espacements

| Variable | Valeur | Usage |
|----------|--------|-------|
| `--nxo-spacing-xs` | 4px | Entre icône et texte |
| `--nxo-spacing-sm` | 8px | Éléments proches |
| `--nxo-spacing-md` | 16px | Padding standard |
| `--nxo-spacing-lg` | 24px | Entre sections |
| `--nxo-spacing-xl` | 32px | Grands espaces |
| `--nxo-spacing-2xl` | 48px | Blocs majeurs |

### Typographie

| Variable | Valeur |
|----------|--------|
| `--nxo-font-family` | Montserrat |
| `--nxo-font-size-base` | 16px |
| `--nxo-font-weight-regular` | 400 |
| `--nxo-font-weight-semibold` | 600 |
| `--nxo-font-weight-bold` | 700 |
| `--nxo-line-height-tight` | 1.2 |
| `--nxo-line-height-normal` | 1.5 |

---

## Composants disponibles (31)

| Composant | Classe CSS | Description |
|-----------|------------|-------------|
| Boutons | `.nxo-btn` | Primary, Secondary, Ghost, Icon |
| Cards | `.nxo-card` | Container avec bordure |
| Formulaires | `.nxo-input`, `.nxo-select` | Inputs, selects, checkboxes |
| Tableaux | `.nxo-table` | Avec tri et pagination |
| Badges | `.nxo-badge` | Status, labels |
| Alertes | `.nxo-alert` | Info, Success, Warning, Error |
| Modales | `.nxo-modal` | Dialogues |
| Breadcrumb | `.nxo-breadcrumb` | Navigation fil d'Ariane |
| Pagination | `.nxo-pagination` | Navigation pages |
| Tabs | `.nxo-tabs` | Onglets |
| Navigation | `.nxo-nav` | Menus |
| Avatars | `.nxo-avatar` | Images profil |
| Spinners | `.nxo-spinner` | Chargement |
| Progress | `.nxo-progress` | Barres de progression |
| Stepper | `.nxo-stepper` | Étapes |
| Accordion | `.nxo-accordion` | Sections dépliables |
| Skeleton | `.nxo-skeleton` | Placeholders |
| Empty State | `.nxo-empty` | États vides |
| List | `.nxo-list` | Listes |
| Timeline | `.nxo-timeline` | Chronologie |
| Search | `.nxo-search` | Recherche |
| File Upload | `.nxo-dropzone` | Upload fichiers |
| Divider | `.nxo-divider` | Séparateurs |
| Toasts | `.nxo-toast` | Notifications |
| Dropdown | `.nxo-dropdown` | Menus déroulants |
| Sidebar | `.nxo-sidebar` | Navigation latérale |
| Footer | `.nxo-footer` | Pied de page |

---

## Documentation

- **[Documentation complète](docs/index.html)** - Guide complet avec exemples
- **[Guide de démarrage](docs/getting-started.html)** - Installation et premiers pas
- **[Tokens CSS](tokens/tokens.css)** - Toutes les variables CSS

---

*Version 2.0 - Validé Marketing Décembre 2025*
