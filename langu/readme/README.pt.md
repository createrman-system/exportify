[![Build Status](https://api.travis-ci.com/watsonbox/exportify.svg?branch=master)](https://travis-ci.com/github/watsonbox/exportify)

<a href="https://exportify.app/"><img src="../../assets/screenshot.png"/></a>

Exporte as suas playlists do Spotify para [CSV](https://pt.wikipedia.org/wiki/Comma-separated_values) clicando neste link: [https://exportify.app/](https://exportify.app/).

---

### Ler em outros idiomas:
[English](README.en.md) | [Deutsch](README.de.md) | [Ελληνικά](README.el.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Português](README.pt.md) | [Svenska](README.sv.md) | [العربية](README.ar.md) | [日本語](README.ja.md) | [Türkçe](README.tr.md)

---

## Funcionalidades

- ⚙️ Inclusão opcional de dados de álbum, artista e características de áudio
- 🎵 **Download de música** (via YouTube) diretamente das playlists exportadas
- 🔍 Pesquisa de playlists com [sintaxe avançada](#sintaxe-avançada)
- 🌓 Modo escuro
- 🗺 Disponível em 12 idiomas
- 📱 Amigável para dispositivos móveis
- 🚀 Gestão avançada de limites de velocidade

## Download de Música

O Exportify agora suporta o download de faixas de música diretamente das suas playlists. Esta funcionalidade utiliza o `yt-dlp` para encontrar a melhor qualidade de áudio no YouTube, converte para FLAC e incorpora metadados e a arte do álbum.

1. Certifique-se de que o servidor backend está a funcionar (ver [Desenvolvimento](#desenvolvimento))
2. Clique no botão 'Download Music' ao lado de qualquer playlist
3. Monitorize o progresso no canto inferior direito
4. Assim que terminar, um ficheiro zip contendo todas as faixas será descarregado automaticamente

**Nota:** Esta funcionalidade requer Python 3, `yt-dlp` e `FFmpeg`.

## Início Rápido (Windows)

Se estiver no Windows, pode usar os ficheiros batch fornecidos:

1. **`installers.bat`**: Instala o **Python 3** e o **Node.js**.
2. **`libinstall.bat`**: Instala as bibliotecas necessárias.
3. **`oneclickrun.bat`**: Inicia a aplicação e o servidor ao mesmo tempo.

## Desenvolvimento

**`yarn dev`**: Inicia o frontend e o backend simultaneamente.
**`yarn start`**: Inicia apenas o frontend.
**`yarn server`**: Inicia apenas o servidor backend.
