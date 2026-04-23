# Documentation développeur **Ecostat**

---

**Version** : 1.0
**Licence** : [MIT](https://github.com/Alem154/ecostat/blob/main/LICENSE)

---

## Description

**Ecostat** est une application web conçu pour calculer et suivre son empreinte carbone.
Le but de notre application est de permettre au utilisateur de :
- **Mesurer** leur empreinte cabrone.
- **Visualisé** l'évolution de leur empreinte carbone grace a leur profil.

L'application est développée en **HTML/CSS/JavaScript** pour le frontend et en **PHP** pour le backend. Les fichiers de code sont trier par langage. Ce site utilise plusieur page html dans les qu'elles nous ajoutons les autres langage pour effectuer les différentes tâches.

---

---

## Outils

**Base de données** : MySQL
**Hébergeur** : [AlwaysData](https://www.alwaysdata.com/fr/)
**Gestion de fichier** : Git

---

---

## Structure du projet

*css* -> Style du site + image
*html* -> page html + ressource graphique
*js* -> *footer_header* -> footer et header dinamique
   -> *pages* -> fonction des différentes pages
*php* -> *CRUD* -> CRUD utilisateur et CRUD des données
    -> *db* -> connection et déconnexion a la base de données
    -> *page* -> différentes fonction pour les pages
.env.exemple -> fichier exemple de .env
.gitignore -> fichier ignorés par Git
.htaccess -> Configuration web
index.html -> Page d'acceuil
LICENSE -> Licence MIT
README.md -> readme

## Installation

### Prérequis
- Serveur Web
- Base de données
- Git
- Editeur de code

### Installation

1. Cloner le dépôt

```bash
git clone https://github.com/Alem154/ecostat.git cd ecostat
```

2. Configurer l'environnement

```bash
cp .env.exemple .env
```

Ajouter vos variable d'environnement a votre *.env*.

3. Configurer le serveur web

Placer le dossier ecostat dans le répertoire racine de votre serveur.

4. Configurer la base de données

 - Créer une base de données MySQL :

 ```sql
 CREATE DATABASE ecostat;
 USE ecostat;
 ```

 - Créer les tables nécessaire :

 ```sql
 CREATE TABLE users (
        id INT AUTO_INCREMENT,
        pseudo VARCHAR(50),
        email VARCHAR(100),
        mdp VARCHAR(255)
    );

 CREATE TABLE carbon_footprints (
    id INT AUTO_INCREMENT,
    id_utilisateur INT,
    transport INT,
    alimentaire INT,
    logement INT,
    numerique INT,
    date_saisie date curdate()
 );
 ```

## Fonctionnalités principale

### Calcul de l'empreinte carbone
 - **Logement** : Calcul basé sur le type de logement, le type de chauffage...
 - **Transport** : Calcul basé sur les transports utilisés et sur la distance parcourus.
 - **Alimentaire** : Estimation des émitions en fonctions du régime alimentaire.
 - **Numérique** : Calcul en fonction du nombre d'appareil acheté récemment.

### Tableau de bord
 - Historique
 - Données du compte

### Gestion des utilisateurs
 - Connexion
 - Création de compte

En cas de problème merci de nous contacter via *github*