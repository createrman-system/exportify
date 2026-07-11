[![Build Status](https://api.travis-ci.com/watsonbox/exportify.svg?branch=master)](https://travis-ci.com/github/watsonbox/exportify)

<a href="https://exportify.app/"><img src="../../assets/screenshot.png"/></a>

Exportera dina Spotify-spellistor till [CSV](https://sv.wikipedia.org/wiki/Comma-separated_values) genom att klicka på denna länk: [https://exportify.app/](https://exportify.app/).

---

### Läs på andra språk:
[English](README.en.md) | [Deutsch](README.de.md) | [Ελληνικά](README.el.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Português](README.pt.md) | [Svenska](README.sv.md) | [العربية](README.ar.md) | [日本語](README.ja.md) | [Türkçe](README.tr.md)

---

## Funktioner

- ⚙️ Valfri inkludering av album-, artist- och ljudfunktionsdata
- 🎵 **Ladda ner musik** (via YouTube) direkt från exporterade spellistor
- 🔍 Sök spellistor med [avancerad söksyntax](#avancerad-söksyntax)
- 🌓 Mörkt läge
- 🗺 Tillgänglig på 12 språk
- 📱 Mobilvänlig
- 🚀 Avancerad hantering av hastighetsbegränsningar

## Ladda ner musik

Exportify stöder nu nedladdning av musikspår direkt från dina spellistor. Denna funktion använder `yt-dlp` för att hitta den bästa ljudkvaliteten på YouTube, konverterar den till FLAC och bäddar in metadata och omslagsbilder.

1. Se till att backend-servern körs (se [Utveckling](#utveckling))
2. Klicka på knappen 'Download Music' bredvid en spellista
3. Följ framstegen i det nedre högra hörnet
4. När det är klart laddas en zip-fil med alla spår ner automatiskt

**Obs:** Denna funktion kräver Python 3, `yt-dlp` och `FFmpeg`.

## Snabbstart (Windows)

Om du är på Windows kan du använda de medföljande batch-filerna:

1. **`installers.bat`**: Installera **Python 3** och **Node.js**.
2. **`libinstall.bat`**: Installera nödvändiga bibliotek.
3. **`oneclickrun.bat`**: Starta både appen och servern.

## Utveckling

**`yarn dev`**: Startar frontend och backend samtidigt.
**`yarn start`**: Startar endast frontend-appen.
**`yarn server`**: Startar endast backend-servern.
