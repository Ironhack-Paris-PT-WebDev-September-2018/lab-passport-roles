# Plus de précisions sur la solution du lab
## Ajouter un fichier .env
## Déclarer le port et l'environnement
> PORT=3000
> ENV=development
## Mettre en place l'authentification avec facebook
* Suivre les étapes décrites sur la page [suivante]( http://www.passportjs.org/docs/facebook/)
* Déclarer les informations facebook dans le document .env
> FACEBOOK_CLIENT_ID=API_ID
> FACEBOOK_CLIENT_SECRET=CLIENT_SECRET
> FACEBOOK_CALLBACK_URL=http://localhost:3000/auth/facebook/callback