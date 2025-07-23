# CineSpark

Une application web moderne de découverte de films construite avec React et l'API The Movie Database (TMDB). CineSpark permet aux utilisateurs de rechercher, découvrir et sauvegarder leurs films préférés avec une interface élégante et responsive.

## Fonctionnalités

### Recherche et Découverte
- **Recherche en temps réel** : Recherche de films avec debouncing pour optimiser les performances
- **Catégories multiples** : Populaires, Mieux Notés, À Venir, En Salle, et Découvrir
- **Filtres avancés** : Filtrage par genre, année, note minimale/maximale, et tri personnalisé
- **Pagination** : Navigation fluide à travers les résultats

### Interface Utilisateur
- **Design responsive** : Interface adaptée à tous les écrans (mobile, tablette, desktop)

### Détails des Films
- **Informations complètes** : Synopsis, genres, durée, date de sortie, notes
- **Casting** : Photos et noms des acteurs principaux
- **Bandes-annonces** : Visionnage des trailers via modal YouTube

### Favoris
- **Système de favoris** : Ajout/suppression de films favoris
- **Persistance locale** : Sauvegarde dans localStorage

## Technologies Utilisées

### Frontend
- **React** - Framework JavaScript moderne
- **React Router DOM** - Routage côté client

### Styling
- **Tailwind CSS 4.1.11** - Framework CSS

### API
- **The Movie Database (TMDB) API** - Base de données de films

### Développement
- **Vercel** - Déploiement et hébergement

## Structure du Projet

```
cinespark/
├── public/                 # Assets statiques
├── src/
│   ├── components/        # Composants réutilisables
│   │   ├── ui/           # Composants UI spécialisés
│   │   │   ├── FavoriteButton.jsx
│   │   │   ├── MovieCardSkeleton.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── ThemeToggle.jsx
│   │   │   ├── TrailerButton.jsx
│   │   │   └── TrailerModal.jsx
│   │   ├── FiltersPanel.jsx
│   │   ├── Footer.jsx
│   │   ├── MovieCard.jsx
│   │   ├── MovieCategories.jsx
│   │   ├── Navigation.jsx
│   │   └── Search.jsx
│   ├── contexts/         # Contexts React
│   │   ├── FavoritesContext.jsx
│   │   └── ThemeContext.jsx
│   ├── pages/           # Pages principales
│   │   ├── Favorites.jsx
│   │   ├── Home.jsx
│   │   └── MovieDetails.jsx
│   ├── App.jsx          # Composant racine
│   ├── App.css          # Styles globaux
│   ├── index.css        # Styles de base
│   └── main.jsx         # Point d'entrée
├── index.html           # Template HTML
├── package.json         # Dépendances et scripts
├── vite.config.js       # Configuration Vite
├── vercel.json          # Configuration Vercel
└── eslint.config.js     # Configuration ESLint
```

## Déploiement

L'application est déjà déployée sur [ce site](https://cinespark-sakab.vercel.app) pour que vous puissiez la tester par vous mêmes.
N'hésitez pas à me rapporter des bugs !

## Installation et Démarrage

Si tout de même vous voulez le lancer en local, alors suivez ces étapes : 

### Prérequis
- Node.js (version 16+)
- npm ou yarn
- Clé API TMDB

### Installation

1. **Cloner le repository**
   ```bash
   git clone [URL_DU_REPO]
   cd cinespark
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration de l'API TMDB**
   - Créer un compte sur [The Movie Database](https://www.themoviedb.org/)
   - Obtenir une clé API
   - Créer un fichier `.env.local` à la racine :
   ```.env.local
   VITE_TMDB_API_KEY='la clé API'
   ```

4. **Démarrer le serveur de développement**
   ```bash
   npm run dev
   ```

5. **Ouvrir l'application**
   - Aller vers `http://localhost:5173`

## Pages et Fonctionnalités

### Page d'Accueil (`/`)
- Hero section avec recherche
- Affichage des résultats de recherche en temps réel
- Catégories de films avec pagination
- Filtres avancés pour la section "Découvrir"

### Page Détails (`/movie/:id`)
- Informations complètes du film
- Synopsis et catégorie
- Casting des acteurs
- Boutons favoris et bande annonce (avec gestion d'absence de bande annonce)

### Page Favoris (`/favorites`)
- Liste de tous les films favoris de l'utilisateur
- Gestion des favoris vides

### Context API
- **FavoritesContext** : Gestion des films favoris avec persistance localStorage
- **ThemeContext** : Gestion du thème sombre/clair

## 🤝 Contribution

Je remercie JS Mastery sur Youtube pour son tutoriel extrêmement enrichissant !

---

**Développé avec ❤️ en utilisant React et l'API TMDB**