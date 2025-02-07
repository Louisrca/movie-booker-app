# Movie Booker 🎬🎟️

## Description du Projet

Movie Booker est une application web permettant de découvrir, rechercher et réserver des films en utilisant l'API TMDB (The Movie Database).

## Technologies Utilisées

- **Backend :** NestJS
- **Frontend :** Vite + React
- **API :** TMDB (The Movie Database)
- **Base de données :** PostgreSQL
- **Déploiement :** Render

## Prérequis

- Node.js (v18 ou supérieur)
- npm ou yarn

## Installation

### Clonage du Repository

```bash
git clone https://github.com/votre-username/movie-booker.git
cd movie-booker
```

### Configuration du Backend (Dossier `server`)

1. Accédez au dossier du serveur

```bash
cd server
```

2. Installez les dépendances

```bash
npm install
```

3. Créez un fichier `.env` avec les variables suivantes :

```
PORT=8000
NODE_ENV='development'
DATABASE_URL=postgresql://moviebooker_user:YOUR_PASSWORD@dpg-cugc9rtsvqrc738ejb80-a.oregon-postgres.render.com/moviebooker
JWT_TOKEN=votre_jwt_token
TMDB_API_KEY=votre_tmdb_api_key
```

4. Lancez le serveur en développement

```bash
npm run start:dev
```

### Configuration du Frontend (Dossier `client`)

1. Accédez au dossier du client

```bash
cd ../client
```

2. Installez les dépendances

```bash
npm install
```

3. Lancez l'application en mode développement

```bash
npm run dev
```

## Déploiement

- **Backend :** Déployé sur Render à l'adresse : https://movie-booker-server-app.onrender.com
- **Base de données :** PostgreSQL sur Render
- **Frontend :** en local

## API Utilisée

[Documentation TMDB](https://developer.themoviedb.org/docs/getting-started)

## Fonctionnalités

- 🔍 Recherche de films
- 📄 Pagination des résultats
- 🎫 Réservation de films
- 👀 Consultation de ses réservations personnelles

## Doc

Vous pourrez retrouver la doc swagger sur : https://movie-booker-server-app.onrender.com/api
