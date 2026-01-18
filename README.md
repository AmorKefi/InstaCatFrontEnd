# 🐱 InstaCatFrontEnd

Front-end Angular du projet **InstaCat**.  
Cette application permet à l’utilisateur de voter entre deux chats (style *FaceMash*), puis de consulter le **classement global** des chats basé sur leurs scores.

Back-end associé : [`InstaCatBackEnd`](https://github.com/AmorKefi/InstaCatBackEnd)

---

## 🚀 Fonctionnalités

- Page **Vote** :

  - Affichage de 2 chats aléatoires
  - Bouton **“J’aime”** pour voter pour l’un des deux
  - Récupération / enregistrement des scores via l’API Spring Boot

- Page **Classement** :

  - Classement trié par score décroissant
  - Podium **Top 3** avec mise en avant du 1er
  - Grille des autres chats (4e, 5e, 6e, …)
  - Bouton **“Revenir au vote”**

- Architecture Angular moderne :
  - Angular CLI **19.2.15**
  - Routing entre `/vote` et `/ranking`
  - Service `CatsService` pour centraliser les appels API
  - Tests unitaires sur les pages & service

---

## 🧱 Stack technique

- **Angular** 19.2.15 (avec `AppModule`, pas de standalone)
- **TypeScript**
- **SCSS** pour le style
- **RxJS** (`BehaviorSubject` pour le store local des chats)
- **HttpClient** pour consommer l’API Spring Boot
- **Karma + Jasmine** pour les tests unitaires

---

## 📦 Prérequis

- **Node.js** 18+
- **Angular CLI** 19.x :
  ```bash
  npm install -g @angular/cli@19
  ```
- Back-end Spring Boot en cours d’exécution (par défaut) sur :  
  `http://localhost:8080`

Back-end recommandé : [`InstaCatBackEnd`](https://github.com/AmorKefi/InstaCatBackEnd)

---

## 🔧 Installation

1. Cloner le repo :

   ```bash
   git clone https://github.com/AmorKefi/InstaCatFrontEnd.git
   cd InstaCatFrontEnd
   ```

2. Installer les dépendances :

   ```bash
   npm install
   ```

---

## ⚙️ Configuration de l’URL API

L’application consomme le backend sur une URL du type :

```text
http://localhost:8080/api
```


###  Via `environment.ts`

```ts
// src/environments/environment.ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080/api'
};
```

Puis dans le service :

```ts
import { environment } from '../environments/environment';

private readonly apiBase = environment.apiBaseUrl;
```


## ▶️ Démarrer le serveur de dev

### Option A (via npm)

```bash
npm start
```

### Option B (via Angular CLI)

```bash
ng serve
```

Puis ouvrir :

```text
http://localhost:4200/
```

L’application se rechargera automatiquement à chaque modification de code.

---

## 🧪 Tests

Lancer les tests unitaires (Karma + Jasmine) :

```bash
ng test
```

Les tests incluent notamment :

- `VotePageComponent` : création, appels au `CatsService`, clic sur le bouton “J’aime”
- `RankingPageComponent` : affichage du podium, classement trié, lien “Revenir au vote”
- `CatsService` : appels HTTP (`GET /cats`, `PUT /cats/{id}/vote`) via `provideHttpClientTesting`

---

## 🧭 Structure du projet (simplifiée)

```text
src/
├── app/
│   ├── app.module.ts
│   ├── app.component.ts / .html / .scss
│   ├── pages/
│   │   ├── vote-page/
│   │   │   ├── vote-page.component.ts / .html / .scss
│   │   └── ranking-page/
│   │       ├── ranking-page.component.ts / .html / .scss
│   ├── services/
│   │   └── cats.service.ts
│   └── models/
│       └── cat.model.ts
├── assets/
│   └── (éventuel config.json, images, …)
└── environments/
    └── environment.ts (+ éventuellement environment.prod.ts)
```

---

## 🌐 Intégration avec le back-end

Le front échange avec l’API Spring via les endpoints (à adapter selon ton back) :

| Méthode | Endpoint                       | Description                 |
|---------|-------------------------------|-----------------------------|
| GET     | `/api/cats`                   | Récupère tous les chats     |
| PUT     | `/api/cats/{id}/vote`         | Incrémente le score d’un chat |

Le service Angular `CatsService` encapsule ces appels et expose :

- `cats$` : `Observable<Cat[]>` des chats
- `getTwoRandomCats()` : renvoie 2 chats aléatoires
- `voteFor(catId: string)` : envoie la requête de vote et met à jour les scores en local

---

## 🚀 Build & déploiement

### Build de production

```bash
ng build --configuration production
```

Les fichiers de build seront générés dans le dossier `dist/`.  
Ces fichiers peuvent ensuite être servis par n’importe quel serveur HTTP (Nginx, Apache, Spring Boot static resources, etc.).

---

## 📄 À propos

Projet front-end développé pour l’application **InstaCat**.

- Front : https://github.com/AmorKefi/InstaCatFrontEnd
- Back : https://github.com/AmorKefi/InstaCatBackEnd