# Exportify (Русский)

[![Build Status](https://api.travis-ci.com/watsonbox/exportify.svg?branch=master)](https://travis-ci.com/github/watsonbox/exportify)

<a href="https://exportify.app/"><img src="../../assets/screenshot.png"/></a>

Экспортируйте свои плейлисты Spotify в [CSV](https://ru.wikipedia.org/wiki/CSV), нажав на эту ссылку: [https://exportify.app/](https://exportify.app/).

---

### Читать на других языках:
[English](README.en.md) | [Deutsch](README.de.md) | [Ελληνικά](README.el.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Português](README.pt.md) | [Svenska](README.sv.md) | [العربية](README.ar.md) | [日本語](README.ja.md) | [Türkçe](README.tr.md) | [Русский](README.ru.md) | [Українська](README.uk.md)

---

Как заметили многие пользователи, в клиенте Spotify нет возможности экспортировать/архивировать плейлисты для сохранности. Это приложение предоставляет простой интерфейс для этого с использованием [Spotify Web API](https://developer.spotify.com/documentation/web-api/).

**Данные не сохраняются — все приложение работает в браузере.**

## Функции

- ⚙️ Дополнительное включение данных об альбомах, исполнителях и аудиохарактеристиках
- 🎵 **Скачивание музыки** (через YouTube) напрямую из экспортированных плейлистов
- 🔍 Поиск по плейлистам с [расширенным синтаксисом поиска](#расширенный-синтаксис-поиска) и экспорт результатов
- 🌓 Темная тема
- 🗺 Доступно на 14 языках
- 📱 Адаптация для мобильных устройств
- ℹ Краткая справка
- 🚀 [Улучшенная обработка ограничений (Rate Limiting)](https://github.com/watsonbox/exportify/pull/75) для быстрого экспорта
- 👩‍💻 Современный [React-стек](#стек) + тесты

## Использование

1. Запустите [приложение](https://exportify.app/)
2. Нажмите 'Get Started'
3. Предоставьте Exportify доступ на чтение ваших плейлистов
4. Нажмите кнопку 'Export', чтобы экспортировать плейлист

### Скачивание музыки

Exportify теперь поддерживает скачивание музыкальных треков напрямую из ваших плейлистов. Эта функция использует `yt-dlp` для поиска наилучшего качества звука на YouTube, конвертирует его в FLAC и встраивает метаданные и обложку альбома.

1. Убедитесь, что сервер запущен (см. [Разработка](#разработка))
2. Нажмите кнопку 'Download Music' рядом с плейлистом
3. Следите за прогрессом в правом нижнем углу
4. По завершении автоматически скачается zip-архив со всеми треками

**Примечание:** Для этой функции требуются Python 3, `yt-dlp` и `FFmpeg`.

## Быстрый старт (Windows)

Если вы используете Windows, вы можете воспользоваться готовыми пакетными файлами:

1. **`installers.bat`**: Запустите первым, чтобы установить **Python 3** и **Node.js**.
2. **`libinstall.bat`**: Запустите для установки необходимых библиотек.
3. **`oneclickrun.bat`**: Запустите для одновременного запуска интерфейса и сервера.

## Разработка

В директории проекта сначала выполните `yarn install`.

Для функции скачивания музыки вам также понадобятся:
- [Python 3](https://www.python.org/downloads/)
- [yt-dlp](https://github.com/yt-dlp/yt-dlp)
- [FFmpeg](https://ffmpeg.org/download.html) (Входит в состав `lib/ffmpegWin64` для Windows)
- [Mutagen](https://mutagen.readthedocs.io/en/latest/)

Затем вы можете запустить:

**`yarn dev`**: Запускает фронтенд и бэкенд одновременно.
**`yarn start`**: Запускает только фронтенд.
**`yarn server`**: Запускает только сервер (необходим для скачивания).
