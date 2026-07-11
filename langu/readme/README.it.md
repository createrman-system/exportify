[![Build Status](https://api.travis-ci.com/watsonbox/exportify.svg?branch=master)](https://travis-ci.com/github/watsonbox/exportify)

<a href="https://exportify.app/"><img src="../../assets/screenshot.png"/></a>

Esporta le tue playlist Spotify in [CSV](https://it.wikipedia.org/wiki/Comma-separated_values) cliccando su questo link: [https://exportify.app/](https://exportify.app/).

---

### Leggi in altre lingue:
[English](README.en.md) | [Deutsch](README.de.md) | [Ελληνικά](README.el.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Português](README.pt.md) | [Svenska](README.sv.md) | [العربية](README.ar.md) | [日本語](README.ja.md) | [Türkçe](README.tr.md)

---

## Funzionalità

- ⚙️ Inclusione opzionale di dati su album, artisti e caratteristiche audio
- 🎵 **Download musica** (via YouTube) direttamente dalle playlist esportate
- 🔍 Ricerca playlist con [sintassi avanzata](#sintassi-avanzata)
- 🌓 Modalità scura
- 🗺 Disponibile in 12 lingue
- 📱 Ottimizzato per dispositivi mobili
- 🚀 Gestione avanzata dei limiti di velocità

## Download Musica

Exportify ora supporta il download dei brani musicali direttamente dalle tue playlist. Questa funzione utilizza `yt-dlp` per trovare la migliore qualità audio su YouTube, la converte in FLAC e inserisce metadati e copertina dell'album.

1. Assicurati che il server backend sia attivo (vedi [Sviluppo](#sviluppo))
2. Clicca sul pulsante 'Download Music' accanto a una playlist
3. Monitora l'avanzamento nell'angolo in basso a destra
4. Al termine, verrà scaricato automaticamente un file zip con tutti i brani

**Nota:** Questa funzione richiede Python 3, `yt-dlp` e `FFmpeg`.

## Avvio Rapido (Windows)

Se sei su Windows, puoi usare i file batch forniti:

1. **`installers.bat`**: Installa **Python 3** e **Node.js**.
2. **`libinstall.bat`**: Installa le librerie necessarie.
3. **`oneclickrun.bat`**: Avvia l'app e il server contemporaneamente.

## Sviluppo

**`yarn dev`**: Avvia frontend e backend insieme.
**`yarn start`**: Avvia solo il frontend.
**`yarn server`**: Avvia solo il server backend.
