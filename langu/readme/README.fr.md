[![Build Status](https://api.travis-ci.com/watsonbox/exportify.svg?branch=master)](https://travis-ci.com/github/watsonbox/exportify)

<a href="https://exportify.app/"><img src="../../assets/screenshot.png"/></a>

Exportez vos playlists Spotify en [CSV](https://fr.wikipedia.org/wiki/Comma-separated_values) en cliquant sur ce lien : [https://exportify.app/](https://exportify.app/).

---

### Lire dans d'autres langues :
[English](README.en.md) | [Deutsch](README.de.md) | [Ελληνικά](README.el.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Português](README.pt.md) | [Svenska](README.sv.md) | [العربية](README.ar.md) | [日本語](README.ja.md) | [Türkçe](README.tr.md)

---

## Fonctionnalités

- ⚙️ Inclusion optionnelle des données d'album, d'artiste et des caractéristiques audio
- 🎵 **Téléchargement de musique** (via YouTube) directement depuis les playlists exportées
- 🔍 Recherche de playlists avec [syntaxe avancée](#syntaxe-avancée)
- 🌓 Mode sombre
- 🗺 Disponible en 12 langues
- 📱 Compatible mobile
- 🚀 Gestion avancée du débit (Rate limiting)

## Téléchargement de Musique

Exportify prend désormais en charge le téléchargement de pistes musicales directement depuis vos playlists. Cette fonctionnalité utilise `yt-dlp` pour trouver la meilleure qualité audio sur YouTube, la convertit en FLAC et intègre les métadonnées et la pochette d'album.

1. Assurez-vous que le serveur backend est en cours d'exécution (voir [Développement](#développement))
2. Cliquez sur le bouton 'Download Music' à côté d'une playlist
3. Suivez la progression en bas à droite
4. Une fois terminé, un fichier zip contenant toutes les pistes sera automatiquement téléchargé

**Note :** Cette fonctionnalité nécessite Python 3, `yt-dlp` et `FFmpeg`.

## Démarrage Rapide (Windows)

Si vous êtes sous Windows, vous pouvez utiliser les fichiers batch fournis :

1. **`installers.bat`** : Installe **Python 3** et **Node.js**.
2. **`libinstall.bat`** : Installe les bibliothèques nécessaires.
3. **`oneclickrun.bat`** : Lance le frontend et le backend simultanément.

## Développement

**`yarn dev`** : Lance le frontend et le backend simultanément.
**`yarn start`** : Lance uniquement l'application frontend.
**`yarn server`** : Lance uniquement le serveur backend.
