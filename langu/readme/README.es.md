[![Build Status](https://api.travis-ci.com/watsonbox/exportify.svg?branch=master)](https://travis-ci.com/github/watsonbox/exportify)

<a href="https://exportify.app/"><img src="../../assets/screenshot.png"/></a>

Exporta tus listas de reproducción de Spotify a [CSV](https://es.wikipedia.org/wiki/Valores_separados_por_comas) haciendo clic en este enlace: [https://exportify.app/](https://exportify.app/).

---

### Leer en otros idiomas:
[English](README.en.md) | [Deutsch](README.de.md) | [Ελληνικά](README.el.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Português](README.pt.md) | [Svenska](README.sv.md) | [العربية](README.ar.md) | [日本語](README.ja.md) | [Türkçe](README.tr.md)

---

## Características

- ⚙️ Inclusión opcional de datos de álbum, artista y características de audio
- 🎵 **Descarga de música** (vía YouTube) directamente desde las listas exportadas
- 🔍 Búsqueda de listas con [sintaxis avanzada](#sintaxis-avanzada)
- 🌓 Modo oscuro
- 🗺 Disponible en 12 idiomas
- 📱 Compatible con móviles
- 🚀 Manejo avanzado de límites de velocidad

## Descarga de Música

Exportify ahora permite descargar pistas de música directamente desde tus listas. Esta función utiliza `yt-dlp` para encontrar la mejor calidad de audio en YouTube, la convierte a FLAC e incluye metadados y arte del álbum.

1. Asegúrate de que el servidor backend esté funcionando (ver [Desarrollo](#desarrollo))
2. Haz clic en el botón 'Download Music' junto a cualquier lista
3. Monitorea el progreso en la esquina inferior derecha
4. Una vez completado, se descargará automáticamente un archivo zip con todas las pistas

**Nota:** Esta función requiere Python 3, `yt-dlp` y `FFmpeg`.

## Inicio Rápido (Windows)

Si estás en Windows, puedes usar los archivos batch proporcionados:

1. **`installers.bat`**: Instala **Python 3** y **Node.js**.
2. **`libinstall.bat`**: Instala las librerías necesarias.
3. **`oneclickrun.bat`**: Inicia el frontend y el backend simultáneamente.

## Desarrollo

**`yarn dev`**: Inicia el frontend y el backend simultáneamente.
**`yarn start`**: Inicia solo la aplicación frontend.
**`yarn server`**: Inicia solo el servidor backend.
