# Fasochain - Plateforme de Dons Lightning

![Fasochain](https://img.shields.io/badge/Fasochain-Lightning%20Donations-green?style=for-the-badge&logo=bitcoin)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18-green?style=for-the-badge&logo=node.js)
![Lightning](https://img.shields.io/badge/Lightning%20Network-orange?style=for-the-badge&logo=bitcoin)

**Fasochain** est une plateforme de dons Lightning Network construite pour soutenir les causes patriotiques et communautaires au Burkina Faso. Elle permet des transactions instantanées, sécurisées et transparentes grâce à la technologie Bitcoin.

## Table des Matières

- [Fonctionnalités](#fonctionnalités)
- [Architecture](#architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [API](#api)
- [Déploiement](#déploiement)
- [Contributions](#contributions)
- [License](#license)

## Fonctionnalités

### Frontend
- **Interface moderne** avec React et Framer Motion
- **Design responsive** adapté à tous les écrans
- **Animations fluides** pour une expérience utilisateur optimale
- **Génération de factures** Lightning en temps réel
- **Interface de don** intuitive et accessible

### Backend
- **API RESTful** pour la gestion des factures Lightning
- **Intégration LND** pour le Lightning Network
- **Sécurité avancée** avec macaroons et TLS
- **Logging complet** pour le monitoring
- **Support CORS** pour les applications web

### Causes Supportées
- **Soutien Patriotique** : Aide directe aux forces engagées
- **Faso Meebo** : Projets d'infrastructures communautaires
- **Mémorial Thomas Sankara** : Préservation de l'héritage révolutionnaire

## Architecture

```
fasochain/
|
+-- frontend/                 # Application React
|   +-- src/
|   |   +-- components/     # Composants React
|   |   +-- public/         # Assets statiques
|   +-- package.json
|
+-- connect-lnd/             # Backend Node.js
|   +-- index.js           # Serveur API
|   +-- .env.example       # Configuration d'exemple
|   +-- package.json
|
+-- README.md               # Documentation
+-- .env                    # Configuration locale
```

## Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Un node LND fonctionnel
- Git

### Installation du Frontend

```bash
cd frontend
npm install
```

### Installation du Backend

```bash
cd connect-lnd
npm install
```

## Configuration

### Configuration LND

1. Copiez le fichier d'exemple :
```bash
cp connect-lnd/.env.example connect-lnd/.env
```

2. Configurez vos variables d'environnement :
```env
# Configuration LND
LND_GRPC_HOST=localhost:10009
LND_MACAROON_BASE64=votre_macaroon_base64
LND_TLS_CERT_BASE64=votre_cert_base64

# Port du serveur
PORT=5003
```

3. Pour obtenir vos identifiants LND :
```bash
# Macaroon (base64)
cat ~/.lnd/data/chain/bitcoin/mainnet/invoice.macaroon | base64 -w0

# Certificat (base64)
cat ~/.lnd/tls.cert | base64 -w0
```

### Configuration Frontend

Le frontend est configuré pour communiquer avec le backend sur `http://localhost:5003`.

## Utilisation

### Démarrage

1. **Démarrez le backend** :
```bash
cd connect-lnd
npm start
```

2. **Démarrez le frontend** :
```bash
cd frontend
npm start
```

3. **Accédez à l'application** :
   - Frontend : http://localhost:3000
   - Backend API : http://localhost:5003

### Processus de Don

1. **Sélectionnez une cause** parmi les options disponibles
2. **Choisissez un montant** (minimum 10 sats)
3. **Générez la facture** Lightning
4. **Scannez ou copiez** le code de paiement
5. **Effectuez le paiement** avec votre wallet Lightning
6. **Recevez la confirmation** et le certificat de don

## API

### Endpoints Disponibles

#### Génération de Facture
```http
POST /api/invoice
Content-Type: application/json

{
  "sats": 1000,
  "description": "Don Fasochain - Soutien Patriotique"
}
```

**Réponse :**
```json
{
  "created_at": "2024-01-01T00:00:00.000Z",
  "description": "Don Fasochain - Soutien Patriotique",
  "id": "payment_hash",
  "payment": "lnbc1...",
  "mtokens": "1000000"
}
```

#### Informations du Node
```http
GET /api/getinfo
```

#### Solde du Wallet
```http
GET /api/balance
```

#### Liste des Factures
```http
GET /api/invoices
```

#### Paiement de Facture
```http
POST /api/pay
Content-Type: application/json

{
  "request": "lnbc1..."
}
```

## Déploiement

### Déploiement Local

Pour un déploiement en production :

1. **Configurez les variables d'environnement**
2. **Build le frontend** :
```bash
cd frontend
npm run build
```

3. **Utilisez PM2 pour le backend** :
```bash
cd connect-lnd
npm install -g pm2
pm2 start index.js --name "fasochain-backend"
```

### Déploiement Cloud

Le projet peut être déployé sur :
- **Vercel** (Frontend)
- **Heroku** (Backend)
- **DigitalOcean** (Docker)
- **AWS** (EC2 + S3)

## Sécurité

- **Macaroons LND** pour l'authentification
- **TLS** pour le chiffrement des communications
- **CORS** configuré pour les origines autorisées
- **Variables d'environnement** pour les secrets

## Monitoring

### Logs Backend
Les logs sont disponibles dans la console et incluent :
- Requêtes API entrantes
- Erreurs de connexion
- Génération de factures
- État du node LND

### Métriques
- Temps de réponse des API
- Taux de succès des transactions
- Volume de dons traités

## Contributions

Les contributions sont les bienvenues ! 

### Comment Contribuer

1. **Fork** le repository
2. **Créez une branche** (`git checkout -b feature/nouvelle-fonctionnalite`)
3. **Commitez** vos changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. **Pushez** vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. **Ouvrez une Pull Request**

### Directives de Contribution

- Suivez le style de code existant
- Ajoutez des tests pour les nouvelles fonctionnalités
- Documentez les changements dans le README
- Respectez les conventions de commit

## Support

### Communauté

- **GitHub Issues** : Pour les bugs et demandes de fonctionnalités
- **Discussions** : Pour les questions générales
- **Documentation** : Pour les guides et tutoriels

### Contact

Pour le support technique :
- **Email** : support@fasochain.bf
- **Twitter** : @fasochain_bf

## License

Ce projet est sous license **MIT** - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Remerciements

- **LND Team** : Pour l'implémentation Lightning Network
- **Bitcoin Community** : Pour le soutien continu
- **Burkina Faso** : Notre inspiration et motivation

---

**Fasochain** - *La patrie ou la mort, nous vaincrons.*

![Bitcoin](https://img.shields.io/badge/Built%20with-Bitcoin-orange?style=for-the-badge&logo=bitcoin)
![Lightning](https://img.shields.io/badge/Powered%20by-Lightning%20Network-yellow?style=for-the-badge&logo=bitcoin)
