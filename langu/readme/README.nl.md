[![Build Status](https://api.travis-ci.com/watsonbox/exportify.svg?branch=master)](https://travis-ci.com/github/watsonbox/exportify)

<a href="https://exportify.app/"><img src="../../assets/screenshot.png"/></a>

Exporteer je Spotify-playlists naar [CSV](https://nl.wikipedia.org/wiki/Komma-gescheiden_waarden) door op deze link te klikken: [https://exportify.app/](https://exportify.app/).

---

### Lees in andere talen:
[English](README.en.md) | [Deutsch](README.de.md) | [Ελληνικά](README.el.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Português](README.pt.md) | [Svenska](README.sv.md) | [العربية](README.ar.md) | [日本語](README.ja.md) | [Türkçe](README.tr.md)

---

## Kenmerken

- ⚙️ Optionele opname van album-, artiest- en audiofunctiegegevens
- 🎵 **Muziek downloaden** (via YouTube) direct vanuit geëxporteerde playlists
- 🔍 Zoeken naar playlists met [geavanceerde zoeksyntaxis](#zoeksyntaxis)
- 🌓 Donkere modus
- 🗺 Beschikbaar in 12 talen
- 📱 Mobielvriendelijk
- 🚀 Geavanceerde afhandeling van limieten

## Muziek Downloaden

Exportify ondersteunt nu het downloaden van muzieknummers direct vanuit je playlists. Deze functie gebruikt `yt-dlp` om de beste audiokwaliteit op YouTube te vinden, converteert deze naar FLAC en voegt metadata en albumhoezen toe.

1. Zorg ervoor dat de backend-server draait (zie [Ontwikkeling](#ontwikkeling))
2. Klik op de knop 'Download Music' naast een playlist
3. Volg de voortgang in de rechterbenedenhoek
4. Na voltooiing wordt automatisch een zip-bestand met alle nummers gedownload

**Let op:** Deze functie vereist Python 3, `yt-dlp` en `FFmpeg`.

## Snelstart (Windows)

Als je op Windows zit, kun je de meegeleverde batchbestanden gebruiken:

1. **`installers.bat`**: Installeer **Python 3** en **Node.js**.
2. **`libinstall.bat`**: Installeer de benodigde bibliotheken.
3. **`oneclickrun.bat`**: Start de app en de server tegelijkertijd.

## Ontwikkeling

**`yarn dev`**: Start frontend en backend tegelijkertijd.
**`yarn start`**: Start alleen de frontend.
**`yarn server`**: Start alleen de backend-server.
