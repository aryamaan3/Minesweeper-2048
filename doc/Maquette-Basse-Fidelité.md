# Maquettes du site
[Voici le lien pour consulter les maquettes](https://drive.google.com/file/d/1ppDDIupRJkONF2KLHX18V28JphULbRpY/view?usp=sharing)

## Accueil
Cette page sommaire présente trois options : aller vers le Démineur, aller vers le 2048 ou aller vers le Profil de l'utilisateur.

Les boutons "Demineur" et "2048" permettent tous deux de se rendre sur l'interface de jeu (voir les maquette 2048 et Demineur).

Le profil est grisé (pour correspondre au critère ergonomique de guidage) au debut mais possibilité d'y acceder apres avoir complété une partie.

## 2048

Cette interface présente une barre de navigation qui permet à tout moment de revenir à l'acceuil, jouer au démineur ou d'acceder à son profil (si le joueur a déjà effectué une partie, sinon cet onglet sera grisé).

On retrouve :
- les règles du jeu
- le score
- le valeur de la tuile la plus importante, le but étant d'obtenir une tuile 2048 afin de s'assurer une victoire
- un bouton pour lancer une nouvelle partie qui effacera le canvas et les statistiques mais qui ne nous fait pas retourner à l'acceuil
- un indicateur de niveau

## Demineur

Présence de la barre de navigation

- règles du jeu
- le score
- un indicateur de niveau
- le bouton pour lancer une nouvelle partie (cf bouton nouvelle partie de 2048, même effet)
- un indicateur de temps


## Profil 

Présence de la barre de navigation.

Cette page est composée de deux parties : Score et Trophées.

### Score
La partie score est a son tour coupée en deux : une par jeu.
- 2048 => on trouve le temps minimum qu'à mit un utilisateur pour finir une partie de son niveau actuel (donc si il a fait 2 minutes en débutant et qu'il passe intermédiaire, ce compteur est reinitialisé). 
Il y a aussi la valeur de la plus grande tuile créée, le nombre totale de parties jouées ainsi que le niveau actuel du joueur.
- Démineur => temps minimum pour completer une grille au niveau actuel, nombre de partie jouées et niveau actuel.

### Trophées
Cette partie regroupera les trophés gagnés de façon non organisé. Cet élément sera multipage en fonction du nombre de trophé gagné afin de présenter un nombre limite de trophées par page.
