# Jeu de Mémoire - Projet Django
	Ce projet est un jeu de mémoire interactif développé avec Django.
## Prérequis
	- Python 3.8 ou supérieur
	- pip (gestionnaire de paquets Python)
## Installation
	1. Décompressez le fichier zip du projet dans un dossier de votre choix.
	2. Ouvrez un terminal et naviguez vers le dossier du projet :
		cd chemin/vers/le/dossier/memory_game_project
	3. Créez un environnement virtuel :
		python -m venv venv
	4. Activez l'environnement virtuel :
		- Windows : `venv\Scripts\activate`
		- macOS/Linux : `source venv/bin/activate`
	5. Installez les dépendances :
		pip install Django==4.2.7
	6. Appliquez les migrations :
		python manage.py migrate
## Lancement du jeu
	1. Dans le dossier du projet, avec l'environnement virtuel activé, lancez :
		python manage.py runserver
	2. Ouvrez votre navigateur et allez à : http://127.0.0.1:8000/
## Jouer au jeu
	- Choisissez un niveau de difficulté dans le menu déroulant.
	- Cliquez sur "Commencer" pour démarrer une partie.
	- Trouvez toutes les paires de cartes avant que le temps ne s'écoule.
	- Votre meilleur score sera sauvegardé localement dans votre navigateur.

Amusez-vous bien !
